import ImageCard from "components/common/ImageCard";
import { useDispatch, useSelector } from "react-redux";
import { CartSlice, setCart } from "redux/cart";
import { Item } from "types/itemType";
import './styles.scss'

type ProductsType = {
  items: Item[];
};

const Products = ({ items }: ProductsType) => {
  const cartData = useSelector((state: CartSlice) => state.cart.items);
  const dispatch = useDispatch();

  const handleOnAddToCart = (item: Item) => {
    const temp = cartData.find((prod: any) => prod.id === item.id);
    let tempQuantity = [...cartData];
    if (tempQuantity.length === 0 || temp === undefined) {
      let newItem = { ...item };
      newItem.quantity = 1;
      tempQuantity.push(newItem);
      dispatch(setCart(tempQuantity));
    } else if (tempQuantity.length !== 0) {
      const tempIndex = tempQuantity.indexOf(temp);
      let newItem = { ...tempQuantity[tempIndex] };
      newItem.quantity = newItem.quantity + 1;
      tempQuantity[tempIndex] = newItem;
      dispatch(setCart(tempQuantity));
    }
  };
  return (
    <div className="product-card-root">
      {items?.map((product) => {
        return (
          <div key={product.id} style={{ width: "100%" }}>
            <div className="product-card">
              <ImageCard src={product.image} />
              <div className="product-description">
                <span className="product-title">{product.title}</span>
                <span>{product.description}</span>
                <div className="product-ratings">
                  <span className="product-ratings-chip">
                    {product.rating.rate}☆
                  </span>
                  <span> {product.rating.count} Ratings & Reviews</span>
                </div>
              </div>
              <div className="product-price">
                <div className="product-title">₹{product.price}</div>
                <div>
                  <button
                    className="button"
                    onClick={() => {
                      handleOnAddToCart(product);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
