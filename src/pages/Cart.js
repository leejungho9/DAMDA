import styled from "styled-components";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";

const CartContainer = styled.div`
  margin: 0 auto;
  width: 1300px;
`;

const CartTitle = styled.h1`
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 60px;
`;

const Cart = () => {
  return (
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      <ShoppingCart />
    </CartContainer>
  );
};

export default Cart;
