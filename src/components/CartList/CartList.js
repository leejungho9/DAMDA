import React from "react";
import CartItem from "../CartItem/CartItem";
import styled from "styled-components";

const Tbody = styled.tbody`
  td {
    padding-top: 10px;
  }
`;
const CartList = ({ cartItems, orderNowMode }) => {
  return cartItems.length !== 0 ? (
    <Tbody>
      {cartItems.map((item, index) => (
        <CartItem key={index} item={item} orderNowMode={orderNowMode} />
      ))}
    </Tbody>
  ) : (
    <Tbody>
      <tr>
        <td colSpan="6">카트에 담긴 제품이 없습니다.</td>
      </tr>
    </Tbody>
  );
};

export default CartList;
