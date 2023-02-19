import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart} from "react-icons/ai";
import { SiNaver } from "react-icons/si";
import { CiCircleMinus, CiCirclePlus} from "react-icons/ci";

const ShopDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 90px;
`;

const ShopDetailContainer = styled.div`
  /* border: 1px solid red; */
  width: 1300px;
  /* height: 800px; */
  margin-top: 50px;
  display: flex;
`;
const ShopDetailImgBox = styled.div``;

const ShopImageGalleryBox = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-between;
  margin-top: 23px;
`;

const ShopImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;
const ShopDetailImg = styled.img`
  width: 600px;
  height: 600px;
`;
const ShopDetailContentBox = styled.div`
  padding-top: 35px;
  padding-left: 70px;
  padding-bottom: 40px;
`;

const ShopDetailTitleBox = styled.div`
  display: flex;
  align-items: center;
`;

const ShopContentName = styled.h3`
  font-size: 20px;
  margin-right: 40px;
  font-family: "LINESeedKR-Rg";
`;

const ShopContentItemTitle = styled.span`
  font-size: 18px;
  font-family: "LINESeedKR-Rg";
`;
const ShopIconsBox = styled.div`
  display: flex;
  flex-grow: 2;
  justify-content: flex-end;
  gap: 20px;
  .icons {
    cursor: pointer;
  }
  .cartIcon {
    font-size: 24px;
  }

  .heartIcon {
    font-size: 26px;
  }
`;

const BorderBar = styled.div`
  width: 630px;
  height: 2px;
  background-color: #efefef;
  margin-top: 15px;
  margin-bottom: 35px;
`;

const ShopDetailPrice = styled.div`
  font-size: 25px;
  color: #f28b39;
  font-weight: bold;
  font-family: "LINESeedKR-Rg";
`;


const ShopDetailInfoBox = styled.div`
  margin-top: 85px;
  display: flex;
  flex-direction: column;
`;
const InfoBox = styled.div`
  margin-bottom: 20px;
  font-family: "LINESeedKR-Rg";
`;
const InfoSpan = styled.p`
  display: inline-block;
  width: 70px;
  font-size: 18px;
  font-weight: bold;
  font-family: "LINESeedKR-Rg";
  margin-right: 80px;
`;


const QuantityBox = styled(InfoBox)`
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  justify-content: space-between;
`;
const ShopDetailQuantity = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: space-between;
.icon{
  cursor: pointer;
  font-size: 25px;
}

`
const PayBox = styled.div`
  width: 630px;
  display: flex;
  justify-content: space-between;
`;
const PayButton = styled.div`
  width: 305px;
  height: 55px;
  background-color: ${(props) => props.color && props.color};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: "LINESeedKR-Rg";
  color: #ffffff;
  cursor: pointer;
  .naverIcon {
    font-size: 20px;
    margin-right: 10px;
  }
`;
function ShopDetail(props) {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);
  console.log(id);

  let priceFormatting = state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <ShopDetailWrapper>
      <ShopDetailContainer>
        <ShopDetailImgBox>
          <ShopDetailImg
            src={`${process.env.PUBLIC_URL}/${state.url}`}
            alt="shop디테일"
          />
        <ShopImageGalleryBox>
          <ShopImage />
          <ShopImage />
          <ShopImage />
          <ShopImage />
          <ShopImage />
        </ShopImageGalleryBox>
        </ShopDetailImgBox>
        <ShopDetailContentBox>
          <ShopDetailTitleBox>
            <ShopContentName>{state.name}</ShopContentName>
            <ShopContentItemTitle>{state.item_title}</ShopContentItemTitle>
            <ShopIconsBox>
              <BsCart4 className="icons cartIcon" />
              <AiOutlineHeart className="icons heartIcon" />
            </ShopIconsBox>
          </ShopDetailTitleBox>
          <BorderBar />
          <ShopDetailPrice>{priceFormatting}</ShopDetailPrice>
          <ShopDetailInfoBox>
            <InfoBox>
              <InfoSpan>크기</InfoSpan> 15*30*2cm
            </InfoBox>
            <InfoBox>
              <InfoSpan>무게</InfoSpan> 1kg
            </InfoBox>
            <InfoBox>
              <InfoSpan>구성품</InfoSpan>꿀, 패키지
            </InfoBox>
            <InfoBox>
              <InfoSpan>유통기한</InfoSpan>상품에 표기된 품질유기한 참고
            </InfoBox>
            <InfoBox>
              <InfoSpan>보관방법</InfoSpan>실온보관 (직사광선 피해주세요)
            </InfoBox>
          </ShopDetailInfoBox>
          <BorderBar />
          <QuantityBox>
            <InfoSpan>수량</InfoSpan> <ShopDetailQuantity><CiCircleMinus className="icon minusIcon"/> 3 <CiCirclePlus className="icon plusIcon"/></ShopDetailQuantity >
          </QuantityBox>
          <BorderBar />
          <QuantityBox>
            <InfoSpan>총금액</InfoSpan> <ShopDetailPrice>300,000</ShopDetailPrice>
          </QuantityBox>
          <PayBox>
            <PayButton color={`#01C73C`}>
              <SiNaver className="naverIcon" />
              네이버페이
            </PayButton>
            <PayButton color={`#F28C3A`}>바로 주문하기</PayButton>
          </PayBox>
        </ShopDetailContentBox>
      </ShopDetailContainer>
    </ShopDetailWrapper>
  );
}

export default ShopDetail;
