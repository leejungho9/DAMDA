import React from "react";
import styled from "styled-components";

const PrmotionWrapper = styled.div`
  width: 100%;
  margin-top: 120px;
`;
const PromotionMainTitle = styled.h3`
  text-align: center;
  margin-bottom: 65px;
  font-family: "LINESeedKR-Bd";
  font-size: 22px;
`;
const PrmotionMainImage = styled.div`
  width: 850px;
  height: 600px;
  background-image: url("images/promotion_main.jpg");
  background-repeat: no-repeat;
  background-position: center;
`;
const PromotionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PromotionInfo = styled.div`
  width: 350px;
  padding: 25px;
  position: relative;
  line-height: 1;
  font-family: "LINESeedKR-Rg";
`;

const PromotionTitle = styled.h3`
  font-family: "LINESeedKR-Bd";
  font-size: 24px;
  margin: 0;
  margin-bottom: 15px;
`;

const PromotionDate = styled.p`
  margin: 0;
  margin-bottom: 45px;
  font-size: 16px;
`;

const PromotionDes = styled.p`
  line-height: 1.8rem;
  font-size: 16px;
`;

const ItemContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
`;

const ItemImage = styled.div`
  width: 220px;
  height: 220px;
  background-image: url("images/promotion_sub.jpg");
  background-repeat: no-repeat;
`;
const ItemInfo = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const ItemCompany = styled.p`
  font-family: 'LINESeedKR-Bd';
  font-size: 17px;
  margin-bottom: 30px;
`;

const ItemName = styled.p`
  font-family: 'LINESeedKR-Rg';
  font-size: 17px;
`;

const ItemDiscount = styled.p`
  font-family: 'LINESeedKR-Rg';
  font-size: 17px;
  margin : 10px 0;
`;

const ItemPrice = styled.p`
  font-family: 'LINESeedKR-Bd';
  font-size: 17px;
  color: #f28b39;
`;

function Promotion(props) {
  return (
    <PrmotionWrapper>
      <PromotionMainTitle>PROMOTION</PromotionMainTitle>
      <PromotionContainer>
        <PrmotionMainImage />
        <PromotionInfo>
          <PromotionTitle>다가오는 추석, 선물 찾고계세요?</PromotionTitle>
          <PromotionDate>2023.4.2-5.2</PromotionDate>
          <PromotionDes>
            단 한달 동안 진행하는 종려나무숲 선물패키지 이벤트입니다. 사랑하는 가족, 친구, 친지 마음을 담은 특별한 선물을 담다에서 준비하세요.
          </PromotionDes>

          <ItemContainer>
            <ItemImage />
            <ItemInfo>
              <ItemCompany>허니순</ItemCompany>
              <ItemName>꿀진담 2종 세트</ItemName>
              <ItemDiscount>50%</ItemDiscount>
              <ItemPrice>100,000</ItemPrice>
            </ItemInfo>
          </ItemContainer>
        </PromotionInfo>
      </PromotionContainer>
    </PrmotionWrapper>
  );
}

export default Promotion;
