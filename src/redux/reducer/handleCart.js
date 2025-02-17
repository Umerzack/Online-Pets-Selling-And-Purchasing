const getInitialCart = [];

const handleCart = (state = getInitialCart, action) => {
  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state, { ...product, qty: 1 }];
      }
      return updatedCart;

    case "DELITEM":
      const exist2 = state.find((x) => x.id === product.id);

      // 🛑 Prevents error if `exist2` is undefined
      if (!exist2) return state;

      if (exist2.qty > 1) {
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      } else {
        updatedCart = state.filter((x) => x.id !== product.id);
      }

      return updatedCart;

    default:
      return state;
  }
};

export default handleCart;
