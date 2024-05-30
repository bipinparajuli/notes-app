const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const router = express.Router();

const supabase = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_KEY
);

const jwtSecret = process.env.JWT_KEY;

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(token, jwtSecret);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create a note
router.post('/', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, content, user_id }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// Get all notes for logged-in user
router.get('/', authenticateToken, async (req, res) => {
  console.log(req.user);
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});
// Get a note
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .eq('user_id', user_id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Update a note
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('notes')
    .update({ title, content, updated_at: new Date() })
    .eq('id', id)
    .eq('user_id', user_id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Delete a note
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', user_id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;
