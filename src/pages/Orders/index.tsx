import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { OrderSlice } from "redux/orders";
import "./index.scss";

function Orders() {
  const OrdersData = useSelector((state: OrderSlice) => state.orders.items);
  return OrdersData.length ? (
    <div className="orderWrapper">
      <h1>Orders</h1>
      {OrdersData?.map((item, index) => {
        return (
          <div className="orderWrapper" key={index}>
            <div className="orderCard">
              <p className="orderDate">Ordered Date : {item.date}</p>
              <p className="orderAmnt">Amount Paid : {item.totalAmount}</p>
              <div className="orderList">
                {item.items.map((value) => {
                  return (
                    <div key={value.id} className="orderObject">
                      <div className="orderImage">
                        <img src={value.image} alt={value.title}></img>
                      </div>
                      <div>
                        <h3 className="orderTitle">{value.title}</h3>
                        <div className="orderQuant">Qty : {value.quantity}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="nill_orders">
      <p>Currently You haven't Placed Any Orders</p>
      <p>
        You can select product from <Link to="/home">Home</Link> page and can
        order in <Link to="/cart">Cart</Link> page
      </p>
    </div>
  );
}

export default Orders;
