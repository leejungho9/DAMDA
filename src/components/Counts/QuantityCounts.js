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

  const plusQuantityHandler = () => {
    if (quantity < 20) {
      dispatch(plusQuantity({ pid, userId }));
      setQuantity && setQuantity(quantity + 1);
    }
  };
  const minusQuantityHandler = () => {
    if (quantity > 1) {
      dispatch(minusQuantity({ pid, userId }));
      setQuantity && setQuantity(quantity - 1);
    }
  };

  return (
    <ShopDetailQuantity>
      {!orderNowMode && (
        <QuantityButton
          className="icon minusIcon"
          onClick={minusQuantityHandler}
        >
          <AiOutlineMinus size={12} onClick={minusQuantity} />
        </QuantityButton>
      )}
      <QuantitDiv>{quantity}</QuantitDiv>
      {!orderNowMode && (
        <QuantityButton className="icon plusIcon" onClick={plusQuantityHandler}>
          <AiOutlinePlus size={12} onClick={plusQuantity} />
        </QuantityButton>
      )}
    </ShopDetailQuantity>
  );
};

export default QuantityCounts;
