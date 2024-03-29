import React, { useRef } from "react";
import { BsCart4 } from "react-icons/bs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "../../apis/apis";

const WishImageBox = styled.div`
  width: 300px;
  height: 300px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;
const WishImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;

  &:hover {
    transform: scale(1.02);
    transition: all 0.3s ease-in-out 0s;
  }
`;

const CartIconBox = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  bottom: 15px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  align-items: center;
  justify-content: center;
  background-color: #f28b39;
  opacity: 0.9;
`;
const CartIcon = styled(BsCart4)`
  cursor: pointer;
  font-size: 20px;
  padding: 0 5px;
  color: white;
`;

const CloseBox = styled.div`
  position: absolute;
  inset: 0px;
  z-index: 10;
  cursor: pointer;
`;
const CheckInput = styled.input`
  appearance: none;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(218, 221, 224);
  background-color: rgb(255, 255, 255);
  transition: border-color 0.1s ease 0s, background-color 0.1s ease 0s;
  position: absolute;
  top: 12px;
  left: 12px;
  border-radius: 4px;
  box-sizing: border-box;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #f28b39;
  }
`;

const WishItem = ({ item, editMode, setCheckItemId, checkItemId }) => {
  const dispatch = useDispatch();
  const checkRef = useRef(null);
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const userId = user.userId;

  const ChangeCheckHandler = () => {
    checkRef.current.checked = !checkRef.current.checked;
    if (checkRef.current.checked) {
      setCheckItemId([...checkItemId, item.pid]);
    } else {
      setCheckItemId((prevItemId) =>
        prevItemId.filter((id) => id !== item.pid)
      );
    }
  };

  const clickAddCartButton = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용가능합니다.");
      navigator("/login");
      return;
    }

    try {
      AddCart(item, 1, dispatch, userId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WishImageBox>
      <WishImage src={item.url} alt="이미지" />
      <CartIconBox>
        <CartIcon onClick={clickAddCartButton} />
      </CartIconBox>
      {editMode && (
        <CloseBox onClick={ChangeCheckHandler}>
          <CheckInput type="checkbox" ref={checkRef}></CheckInput>
        </CloseBox>
      )}
    </WishImageBox>
  );
};

export default WishItem;
