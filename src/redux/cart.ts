import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "types/itemType";

export type CartSliceState = {
  items:Item[]
};
export type CartSlice = {
  cart: CartSliceState;
};
const initialState: CartSliceState = {
  items:[]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state:CartSliceState,action: PayloadAction<Item[]>) => {
      state.items = action.payload
    }
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
