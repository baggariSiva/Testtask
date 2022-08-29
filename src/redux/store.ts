import { configureStore } from "@reduxjs/toolkit";
import setItems from "./setItems";
import setCart from "./cart"
import  setOrder  from "./orders";

const store = configureStore({
  reducer: {
    items: setItems,
    cart:setCart,
    orders:setOrder
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
