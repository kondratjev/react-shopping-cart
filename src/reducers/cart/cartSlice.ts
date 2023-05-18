import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItemType {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CartState {
  items: CartItemType[];
  isLoading: boolean;
  error: string;
}

export interface ChangeQuantityPayload {
  id: string;
  quantity: number;
}

export const initialState: CartState = {
  items: [],
  isLoading: false,
  error: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart: (state) => {
      state.items = [];
      state.isLoading = true;
      state.error = '';
    },
    fetchCartSuccess: (state, action: PayloadAction<CartItemType[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchCartError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addToCart: (state, _: PayloadAction<CartItemType>) => {
      state.isLoading = true;
    },
    addToCartSuccess: (state, action: PayloadAction<CartItemType[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    addToCartError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addQuantity: (state, action: PayloadAction<string>) => {
      const foundItem = state.items.find((item) => item.id === action.payload);
      if (foundItem) foundItem.quantity += 1;
    },
    subtractQuantity: (state, action: PayloadAction<string>) => {
      const foundItem = state.items.find((item) => item.id === action.payload);
      if (foundItem) foundItem.quantity -= +(foundItem.quantity > 1);
    },
    changeQuantity: (state, action: PayloadAction<ChangeQuantityPayload>) => {
      const { id, quantity } = action.payload;
      const foundItem = state.items.find((item) => item.id === id);
      if (foundItem) foundItem.quantity = quantity > 1 ? quantity : 1;
    },
  },
});

export const {
  fetchCart,
  fetchCartSuccess,
  fetchCartError,
  addToCart,
  addToCartSuccess,
  addToCartError,
  removeFromCart,
  addQuantity,
  subtractQuantity,
  changeQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
