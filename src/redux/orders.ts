import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Orders } from "types/ordersType";

export type OrderSliceState = {
  items:Orders[]
};
export type OrderSlice = {
  orders: OrderSliceState;
};
const initialState: OrderSliceState = {
  items:[]
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrder: (state:OrderSliceState,action: PayloadAction<Orders>) => {
      state.items = [...state.items,action.payload]
    }
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
