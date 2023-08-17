import { useState, useEffect } from "react";

const useCartPrice = (cartItems) => {
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      const newTotalPrice = cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
      const totalDiscountPrice = cartItems.reduce(
        (acc, cur) =>
          acc + Math.floor(cur.price * (cur.discount / 100) * cur.quantity),
        0
      );

      setDiscountPrice(totalDiscountPrice);
      setTotalPrice(newTotalPrice);
    }
  }, [cartItems]);

  return { discountPrice, totalPrice };
};

export default useCartPrice;
