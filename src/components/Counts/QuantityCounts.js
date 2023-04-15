import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

const ShopDetailQuantity = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: space-between;
`;

const QuantitDiv = styled.div`
  font-family: "LINESeedKR-Rg";
  width: 50px;
  display: flex;
  justify-content: center;
`;
const QuantityButton = styled.button`
  width: 23px;
  height: 23px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: #fff;
  font-size: 18px;
  cursor: pointer;
`;

const QuantityCounts = ({ quantity, setQuantity }) => {
  const upQuantity = () => {
    if (quantity !== 20) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity);
    }
  };
  const downQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity);
    }
  };

  return (
    <ShopDetailQuantity>
      <QuantityButton className="icon minusIcon" onClick={downQuantity}>
        <AiOutlineMinus size={12} />
      </QuantityButton>
      <QuantitDiv>{quantity}</QuantitDiv>
      <QuantityButton className="icon plusIcon" onClick={upQuantity}>
        <AiOutlinePlus size={12} />
      </QuantityButton>
    </ShopDetailQuantity>
  );
};

export default QuantityCounts;
