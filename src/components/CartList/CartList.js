import React from "react";
import CartItem from "../CartItem/CartItem";

const CartList = ({ cartItems, orderNowMode }) => {
  return cartItems.length !== 0 ? (
    <tbody>
      {cartItems.map((item) => (
        <CartItem key={item.pid} item={item} orderNowMode={orderNowMode} />
      ))}
    </tbody>
  ) : (
    <tr>
      <td colSpan="6">카트에 담긴 제품이 없습니다.</td>
    </tr>
  );
};

export default CartList;
