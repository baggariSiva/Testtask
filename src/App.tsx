import { useRoutes } from "react-router-dom";
import Cart from "./pages/CartPage";
import Header from "./components/header";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";

import "./scss/index.scss";

function App() {
  return (
    <div>
      {useRoutes([
        {
          element: <Login />,
          path: "/login",
        },
        {
          element: <Header />,
          children: [
            {
              element: <Home />,
              path: "/",
            },
            {
              element: <Home />,
              path: "/home",
            },
            {
              element: <Cart />,
              path: "/cart",
            },
            {
              element: <Orders />,
              path: "/orders",
            },
          ],
        },
      ])}
    </div>
  );
}

export default App;
