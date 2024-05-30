// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   token: null,
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;
