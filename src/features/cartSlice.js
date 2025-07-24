// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
    },
    removeFromCart: (state, action) => {
      state.cartItems.splice(action.payload, 1)
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
