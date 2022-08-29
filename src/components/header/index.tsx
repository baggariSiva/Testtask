import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { CartSlice } from "redux/cart";
import "./index.scss";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartData = useSelector((state: CartSlice) => state.cart.items);

  const user = localStorage.getItem("user");
  useEffect(() => {
    !user && navigate("/login");
    user && location.pathname === "/" && navigate("/home");
  }, [user, location, navigate]);


  return (
    <div>
      <div className="header">
        <div className="header_start">
          <Link to="home">Home</Link>
        </div>
        <div className="header_end">
          <Link to="cart"><>{cartData?.length > 0 ? `Cart ${cartData.length}` : "Cart"}</></Link>
          <Link to="orders">Orders</Link>
        </div>
      </div>
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
