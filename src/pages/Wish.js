import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WishList from "../components/WishList/WishList";
import { useDispatch, useSelector } from "react-redux";
import { getWishItem } from "../apis/apis";
import { removeWishItem, setWishItem } from "../reducers/wishSlice";
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
  min-height: 800px;
  margin-top: 45px;
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
  const wishItems = useSelector((state) => state.wishItems || []);
  const [editMode, setEditMode] = useState(false);
  const [checkItemId, setCheckItemId] = useState([]);
  const { user } = useSelector((state) => state.user);
  const userId = user.userId;

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
  }, [wishItems, userId]);

  const editModeHandle = () => {
    setEditMode(!editMode);
  };

  //! 관심상품 삭제하기
  const checkRemoveHandler = async () => {
    try {
      dispatch(removeWishItem({ checkItemId, userId }));
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WishContainer>
      <WishTitleH1>관심상품</WishTitleH1>
      <WishCountBox>
        <WishCountSpan>총 {wishItems.length}개 </WishCountSpan>

        {editMode ? (
          <WiShEditMenuBox>
            <WishEditSpan onClick={checkRemoveHandler}>삭제 </WishEditSpan>
            <WishEditSpan onClick={editModeHandle}>취소 </WishEditSpan>
          </WiShEditMenuBox>
        ) : (
          <WishEditSpan onClick={editModeHandle}>편집 </WishEditSpan>
        )}
      </WishCountBox>
      <hr />
      <WishBox>
        <WishList
          editMode={editMode}
          wishItems={wishItems}
          setCheckItemId={setCheckItemId}
          checkItemId={checkItemId}
        />
      </WishBox>
    </WishContainer>
  );
};

export default Wish;
