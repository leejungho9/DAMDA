import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { minusQuantity, plusQuantity } from "../../reducers/cartSlice";
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

const QuantityCounts = ({ quantity, setQuantity, pid, orderNowMode }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user.userId;
  const MAX_QUANTITY = 20;
  const MIN_QUANTITY = 1;

  const changeQuantity = (type) => {
    if (type === "minus") {
      if (quantity > MIN_QUANTITY) {
        dispatch(minusQuantity({ pid, userId }));
        setQuantity && setQuantity(quantity - 1);
      }
      return;
    }
    if (type === "plus") {
      if (quantity < MAX_QUANTITY) {
        dispatch(plusQuantity({ pid, userId }));
        setQuantity && setQuantity(quantity + 1);
      }
      return;
    }
  };

  return (
    <ShopDetailQuantity>
      {!orderNowMode && (
        <QuantityButton
          className="icon minusIcon"
          onClick={() => changeQuantity("minus")}
        >
          <AiOutlineMinus size={12} onClick={minusQuantity} />
        </QuantityButton>
      )}
      <QuantitDiv>{quantity}</QuantitDiv>
      {!orderNowMode && (
        <QuantityButton
          className="icon plusIcon"
          onClick={() => changeQuantity("plus")}
        >
          <AiOutlinePlus size={12} onClick={plusQuantity} />
        </QuantityButton>
      )}
    </ShopDetailQuantity>
  );
};

export default QuantityCounts;
