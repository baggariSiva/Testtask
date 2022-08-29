import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "types/itemType";

export type ItemsSliceState = {
  items:Item[]
};
export type ItemsSlice = {
  items: ItemsSliceState;
};
const initialState: ItemsSliceState = {
  items:[]
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state:ItemsSliceState,action: PayloadAction<Item[]>) => {
      state.items = action.payload
    }
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
