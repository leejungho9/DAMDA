import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WishList from "../components/WishList/WishList";
import { useDispatch, useSelector } from "react-redux";
import { getWishItem } from "../apis/apis";
import { setWishItem } from "../reducers/wishSlice";
import { useNavigate } from "react-router-dom";

const WishContainer = styled.main`
  margin: 0 auto;
  width: 1300px;
  position: relative;
  hr {
    color: #b5b5b6;
  }
`;
const WishTitleH1 = styled.h1`
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 60px;
`;

const WishBox = styled.div`
  min-height: 500px;
  margin-top: 20px;
  margin-bottom: 85px;
  display: flex;
  flex-wrap: wrap;
`;
const WishCountBox = styled.div`
  text-align: left;
  font-family: "LINESeedKR-Rg";
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
`;

const WishCountSpan = styled.span`
  width: 60px;
  margin: 20px 5px;
  text-align: center;
`;

const WishEditSpan = styled.span`
  cursor: pointer;
  width: 60px;
  margin: 20px 5px;
  text-align: center;
`;
const WiShEditMenuBox = styled.div``;

const Wish = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    // //! user가 없을 시 로그인 페이지 이동
    if (userId === null) {
      navigator("/login");
      return;
    }
  }, []);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const wishItems = useSelector((state) => state.wishItems || []);

  // * getWishItem : 관심상품 가져오기
  useEffect(() => {
    const getWishItemFunc = async () => {
      try {
        const wishItems = await getWishItem(userId);
        dispatch(setWishItem(wishItems));
      } catch (error) {
        console.error(error);
      }
    };
    getWishItemFunc();
  }, []);

  return (
    <WishContainer>
      <WishTitleH1>관심상품</WishTitleH1>
      <WishCountBox>
        <WishCountSpan>총 5 개 </WishCountSpan>

        {editMode ? (
          <WiShEditMenuBox>
            <WishEditSpan>삭제 </WishEditSpan>
            <WishEditSpan onClick={handleEditMode}>취소 </WishEditSpan>
          </WiShEditMenuBox>
        ) : (
          <WishEditSpan onClick={handleEditMode}>편집 </WishEditSpan>
        )}
      </WishCountBox>
      <hr />
      <WishBox>
        <WishList editMode={editMode} wishItems={wishItems} />
      </WishBox>
    </WishContainer>
  );
};

export default Wish;
