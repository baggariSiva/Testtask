import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemsSlice, setItems } from "redux/setItems";
import { Item } from "types/itemType";
import "./styles.scss";
import Products from "components/Home/Products";

function Home() {
  const [items, setItem] = useState<Item[]>();
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCatergory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const allItems = useSelector((state: ItemsSlice) => state.items.items);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=n")
      .then(function (response) {
        dispatch(setItems(response.data));
        let filterCategory: string[] = ["select"];
        response?.data?.forEach((item: Item) => {
          filterCategory.indexOf(item.category) === -1 &&
            filterCategory.push(item.category);
        });
        setCategories(filterCategory);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let filteredItems = allItems;
    if (priceRange.min > 0) {
      filteredItems = filteredItems.filter((el) => {
        return el.price >= priceRange.min;
      });
    }
    if (priceRange.max > 0) {
      filteredItems = filteredItems.filter((el) => {
        return el.price <= priceRange.max;
      });
    }
    if (selectedCategory !== "select" && selectedCategory !== "") {
      filteredItems = filteredItems.filter((el) => {
        return el.category === selectedCategory;
      });
    }
    if (search) {
      filteredItems = filteredItems.filter((el) => {
        return el.title.toLowerCase().includes(search.toLowerCase());
      });
    }
    setItem(filteredItems);
  }, [allItems, priceRange, selectedCategory, search]);

  const onPriceRangeChnage = (event: {
    target: { value: string; name: string };
  }) => {
    const { value, name } = event.target;
    setPriceRange((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };
  const onChangeCatergory = (event: { target: { value: string } }) => {
    setSelectedCatergory(event.target.value);
  };
  const onChangeSearch = (event: { target: { value: string } }) => {
    setSearch(event.target.value);
  };

  return (
    <div className="home-root">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={onChangeSearch}
          className="search"
        />
      </div>
      <div className="filter-root">
        <div className="filter-item">
          <div className="filter-items">
            <div className="filter-items">
              <span>Price Range</span>
              <div className="filter-item-price">
                <input
                  className="input"
                  type="number"
                  value={priceRange.min}
                  name="min"
                  placeholder="min"
                  onChange={onPriceRangeChnage}
                />
                <span>-</span>
                <input
                  className="input"
                  type="number"
                  value={priceRange.max > 0 ? priceRange.max : ""}
                  name="max"
                  placeholder="max"
                  onChange={onPriceRangeChnage}
                />
              </div>
            </div>

            <div className="filter-items">
              <span>Category</span>

              <select
                className="input"
                value={selectedCategory}
                onChange={onChangeCatergory}
              >
                {categories.map((catergory: string, index: number) => {
                  return (
                    <option key={index} value={catergory}>
                      {catergory}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        {items && items.length > 0 ? (
          <Products items={items || []} />
        ) : (
          <div className="empty_search">
            <p>No Products found!</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
