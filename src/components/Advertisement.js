import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { addCouponHandler } from "../apis/apis";

const AdvertisementWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 140px;
`;

const AdvertisementBg = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f6f6f6;
  position: relative;
  cursor: pointer;
`;

const AdvertisementContainer = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto;
  max-width: 1250px;
`;

const AdvertisementText = styled.div`
  background-image: url(../images/event3.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 350px;
  height: 200px;
  position: absolute;
  left: 50px;
`;

const AdvertisementButton = styled.div`
  background-image: url(../images/event2.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 130px;
  height: 200px;
  position: absolute;
  left: 430px;
`;

const AdvertisementCoupon = styled.div`
  background-image: url(../images/event1.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 400px;
  height: 200px;
  position: absolute;
  right: 0;
`;

function Advertisement() {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const userId = user.userId;
  const couponId = "WECOMECO01";
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const clickAddCouponButton = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용가능합니다.");
      navigator("/login");
      return;
    }
    addCouponHandler(couponId, userId, dispatch);
  };

  return (
    <AdvertisementWrapper>
      <AdvertisementBg onClick={clickAddCouponButton}>
        <AdvertisementContainer>
          <AdvertisementText />
          <AdvertisementButton />
          <AdvertisementCoupon />
        </AdvertisementContainer>
      </AdvertisementBg>
    </AdvertisementWrapper>
  );
}

export default Advertisement;
