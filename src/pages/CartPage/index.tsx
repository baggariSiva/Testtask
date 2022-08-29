import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Item } from "types/itemType";
import { Orders } from "types/ordersType";
import "./index.scss";
import ImageCard from "components/common/ImageCard";

import { CartSlice, setCart } from "redux/cart";
import { setOrder } from "redux/orders";

function Cart() {
  const cartData = useSelector((state: CartSlice) => state.cart.items);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleSetTotalAmount();
  }, [cartData]);

  const placeOrder = () => {
    let date = new Date();
    let order: Orders = {
      date:
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        date.getFullYear(),
      totalAmount: totalAmount,
      items: cartData,
    };
    dispatch(setOrder(order));
    dispatch(setCart([]));
    navigate("/orders");
  };

  const handleSetTotalAmount = () => {
    let amount: number = 0;
    cartData.forEach((item) => {
      amount = amount + item.quantity * item.price;
    });
    setTotalAmount(Number(amount.toFixed(2)));
  };

  const handleChangeQuantity = (index: number, action: string) => {
    let tempCart = [...cartData];
    let tempItem = { ...tempCart[index] };
    if (tempItem) {
      action === "add"
        ? (tempItem.quantity += 1)
        : action === "delete"
        ? (tempItem.quantity = 0)
        : (tempItem.quantity -= 1);
      if (tempItem.quantity < 1) {
        tempCart.splice(index, 1);
      } else {
        tempCart.splice(index, 1, tempItem);
      }
      dispatch(setCart(tempCart));
    }
  };

  return (
    <div className="cart_container ">
      {cartData.length ? <h2>Cart Items</h2> : ""}
      <div className={"cart_items"}>
        {cartData?.map((item: Item, index: number) => {
          return (
            <div key={index} className={"cartItem product-card"}>
              <ImageCard src={item.image} />
              <div className="item_info">
                <div>
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                  <div className={"item_price"}>₹{item.price}</div>
                </div>
                <div>
                  <div className={"item_quantity"}>
                    <span onClick={() => handleChangeQuantity(index, "remove")}>
                      -
                    </span>
                    <p>{item.quantity}</p>
                    <span onClick={() => handleChangeQuantity(index, "add")}>
                      +
                    </span>
                  </div>
                  <button
                    className="delete_button"
                    onClick={() => handleChangeQuantity(index, "delete")}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {!cartData.length ? (
          <div className="empty_cart">
            <p>Your Cart is Empty</p>
            <p>
              You can add Items to your cart from <Link to="/home">Home</Link>{" "}
              page{" "}
            </p>
          </div>
        ) : (
          <div className="total_Amount">
            <div>Total Amount: ₹{totalAmount}</div>
            <div>
              <button className={"button"} onClick={placeOrder}>
                Place order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Cart;
