import React from "react";
import styled from "styled-components";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";

const OrderContainer = styled.div`
  margin: 0 auto;
  width: 1300px;
`;

const OrderTitleH1 = styled.h1`
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 60px;
`;
const Order = () => {
  return (
    <OrderContainer>
      <OrderTitleH1>주문하기</OrderTitleH1>
      <ShoppingCart />
    </OrderContainer>
  );
};

export default Order;
