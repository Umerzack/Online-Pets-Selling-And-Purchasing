// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For Delete Item to Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

export const addItemThunk = (product) => {
  console.log("product in addCartThunk", product);
  return async (dispatch, getState) => {
    const state = getState().handleCart;
    console.log("current cart state in thunk", state);
    const updatedCart = state.find((x) => x.id === product.id)
      ? state.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x))
      : [...state, { ...product, qty: 1 }];

    console.log("updatedCart in addCartThunk", updatedCart);

    try {
      const response = await fetch(
        "https://pet-selling-server.vercel.app/cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCart),
        }
      );

      if (!response.ok) throw new Error("Failed to update the cart");

      // Sync with localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Dispatch the action to update the state
      dispatch({
        type: "ADDITEM",
        payload: product,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
};

export const delItemThunk = (product) => {
  return async (dispatch, getState) => {
    const state = getState().handleCart;
    const updatedCart = state.find((x) => x.id === product.id)
      ? state.map((x) => (x.id === product.id ? { ...x, qty: x.qty - 1 } : x))
      : state.filter((x) => x.id !== product.id);

    console.log("updatedCart in delCartThunk", updatedCart);

    try {
      const response = await fetch(
        "https://pet-selling-server.vercel.app/cart/delete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCart),
        }
      );
      console.log("delete cart", response);

      if (!response.ok) {
        throw new Error("Failed to update the cart");
      }

      // Sync with localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Dispatch the action to update the state
      dispatch({
        type: "DELITEM",
        payload: product,
      });
    } catch (error) {
      console.error("Error deleting from cart:", error);
    }
  };
};
