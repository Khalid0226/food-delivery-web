import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || []
  },
  reducers: {
    // Add to Cart (Increment)
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Decrement item quantity
    decrementFromCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Agar quantity 1 hai toh list se remove kar dein
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Remove item completely
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }
});

export const { addToCart, decrementFromCart, removeFromCart } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });