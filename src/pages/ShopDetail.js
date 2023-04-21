import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { SiNaver } from "react-icons/si";
import BestDetailReview from "../components/BestDetailReview";
import LineBar from "../components/BorderBar";
import ImageDetailSkeleton from "../components/Skeleton/ImageDetailSkeleton";
import QuantityCounts from "../components/Counts/QuantityCounts";
import { getCartItem, getDetailImage, getDetailItem } from "../apis/apis";
import { useDispatch } from "react-redux";
import { addCartItem } from "../reducers/cartSlice";
const ShopDetailWrapper = styled.div`
  padding-top: 90px;
  margin: 0 auto;
  width: 1300px;
`;

const ShopDetailContainer = styled.div`
  margin-top: 50px;
  display: flex;
`;
const ShopDetailImgBox = styled.div``;

const ShopImageGalleryBox = styled.div`
  display: ${(props) => (props.isLoading ? "none" : "flex")};
  width: 600px;
  justify-content: space-between;
  margin-top: 23px;
`;

const ShopImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
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

const BorderBar = styled(LineBar)`
  width: 630px;
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

const AmountBox = styled(InfoBox)`
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  justify-content: space-between;
`;

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

const DetialTitle = styled.h3`
  font-size: 18px;
  margin-right: 50px;
  font-family: "LINESeedKR-Rg";
`;
const DetailImageBox = styled.div`
  width: 80%;
  height: auto;
  margin: 0 auto;
`;
const DetailImage = styled.img`
  margin-top: 35px;
  width: 100%;
`;
function ShopDetail(props) {
  const { id } = useParams();

  const [detail, setDetail] = useState([]);
  const [detailImage, setdetailImage] = useState([]);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailImg = await getDetailImage(id);
        setdetailImage(detailImg);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailItem = await getDetailItem(id);
        setDetail(detailItem);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(detailImage);
  const checkCart = async () => {
    try {
      const cartItems = await getCartItem();
      return cartItems.some((item) => Number(item.pid) === Number(id));
    } catch (error) {
      console.log(error);
    }
  };

  const AddCartHandler = async () => {
    let check = await checkCart();
    if (check) {
      alert("이미 장바구니에 추가된 상품입니다.");
    } else {
      const data = {
        pid: Number(id),
        title: detail.title,
        company: detail.company,
        quantity: 1,
        url: detail.url,
        price: detail.price,
        discount: Number(detail.discount),
      };

      dispatch(addCartItem(data));
      alert("상품이 정상적으로 장바구니에 담겼습니다.");
    }
  };
  return (
    <ShopDetailWrapper>
      <ShopDetailContainer>
        <ShopDetailImgBox>
          <ShopDetailImg
            src={`${process.env.PUBLIC_URL}/${detail.url}`}
            alt="shop디테일"
          />
          {isLoading && (
            <ShopImageGalleryBox>
              <ImageDetailSkeleton />
            </ShopImageGalleryBox>
          )}
          <ShopImageGalleryBox isLoading={isLoading}>
            <ShopImage
              onLoad={handleImageLoading}
              alt="상품 디테일 이미지"
              src={`${process.env.PUBLIC_URL}/${detailImage.url1}`}
            />
            <ShopImage
              onLoad={handleImageLoading}
              alt="상품 디테일 이미지"
              src={`${process.env.PUBLIC_URL}/${detailImage.url2}`}
            />
            <ShopImage
              onLoad={handleImageLoading}
              alt="상품 디테일 이미지"
              src={`${process.env.PUBLIC_URL}/${detailImage.url3}`}
            />
            <ShopImage
              onLoad={handleImageLoading}
              alt="상품 디테일 이미지"
              src={`${process.env.PUBLIC_URL}/${detailImage.url4}`}
            />
            <ShopImage
              onLoad={handleImageLoading}
              alt="상품 디테일 이미지"
              src={`${process.env.PUBLIC_URL}/${detailImage.url5}`}
            />
          </ShopImageGalleryBox>
        </ShopDetailImgBox>
        <ShopDetailContentBox>
          <ShopDetailTitleBox>
            <ShopContentName>{detail.company}</ShopContentName>
            <ShopContentItemTitle>{detail.title}</ShopContentItemTitle>
            <ShopIconsBox>
              <BsCart4 className="icons cartIcon" onClick={AddCartHandler} />
              <AiOutlineHeart className="icons heartIcon" />
            </ShopIconsBox>
          </ShopDetailTitleBox>
          <BorderBar />
          <ShopDetailPrice>{detail.price}</ShopDetailPrice>
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
            <InfoSpan>수량</InfoSpan>
            <QuantityCounts pid={detail.pid} />
          </QuantityBox>
          <BorderBar />
          <AmountBox>
            <InfoSpan>총금액</InfoSpan>
            <ShopDetailPrice>{detail.price * detail.quantity}</ShopDetailPrice>
          </AmountBox>
          <PayBox>
            <PayButton color={`#01C73C`}>
              <SiNaver className="naverIcon" />
              네이버페이
            </PayButton>
            <PayButton color={`#F28C3A`}>바로 주문하기</PayButton>
          </PayBox>
        </ShopDetailContentBox>
      </ShopDetailContainer>
      <BestDetailReview item={detail} />
      <DetialTitle>상품 상세</DetialTitle>
      <DetailImageBox>
        <DetailImage
          src={`${process.env.PUBLIC_URL}/${detailImage.detailurl}`}
          alt="상품상세 이미지"
        />
      </DetailImageBox>
    </ShopDetailWrapper>
  );
}

export default ShopDetail;
