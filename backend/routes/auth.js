// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_KEY
);

const jwtSecret = process.env.JWT_KEY;

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const { data: existingUser, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword }])
    .select()
    .single();
  console.log(data);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const token = jwt.sign({ id: data.id, email: data.email }, jwtSecret, {
    expiresIn: '1h',
  });

  res.status(201).json({ token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;
