import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import BestDetailReview from "../components/BestDetailReview";
import LineBar from "../components/BorderBar";
import ImageSkeleton from "../components/Skeleton/ImageSkeleton";
import QuantityCounts from "../components/Counts/QuantityCounts";
import {
  AddCartHandler,
  getDetailImage,
  getDetailItem,
  getWishItem,
} from "../apis/apis";
import { useDispatch } from "react-redux";
import Button from "../components/Button/Button";
import PriceFormat from "../hooks/PriceFormat";
import { addWishItem } from "../reducers/wishSlice";
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
  display: flex;
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
  .icons:hover {
    color: #f28b39;
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
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState([]);
  const [detailImage, setdetailImage] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // ! store에 있는 user 정보
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchDetailImg = async () => {
      try {
        const detailImg = await getDetailImage(id);
        setdetailImage(detailImg);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetailImg();
  }, []);

  useEffect(() => {
    const fetchDetailItem = async () => {
      try {
        const detailItem = await getDetailItem(id);
        setDetail(detailItem);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetailItem();
  }, []);
  const checkWish = async () => {
    // ! 관심상품 중복 체크
    try {
      const wishItems = await getWishItem(userId);
      return wishItems.some((item) => Number(item.pid) === Number(id));
    } catch (error) {
      console.log(error);
    }
  };

  const AddWishHandler = async () => {
    // ! 비로그인 관심상품 사용 x
    if (userId === null) {
      navigator("/login");
      return;
    }
    let check = await checkWish();

    if (check) {
      alert("이미 관심상품으로 지정된 상품입니다.");
    } else {
      const data = {
        pid: Number(id),
        title: detail.title,
        company: detail.company,
        quantity: quantity,
        url: detail.url,
        price: detail.price,
        discount: Number(detail.discount),
      };

      dispatch(addWishItem({ data, userId }));
      alert("상품이 정상적으로 관심상품에 담겼습니다.");
    }
  };

  const clickOrder = () => {};

  const onClickNaverPayButton = () => {
    const oPay = window.Naver.Pay.create({
      mode: "production",
      clientId: process.env.REACT_APP_CLIENT_ID,
    });
    oPay.open({
      merchantUserKey: "DAMDA123",
      merchantPayKey: "123456789",
      productName: detail.title,
      totalPayAmount:
        Math.floor(detail.price * (1 - detail.discount / 100)) * quantity, // ? 총 결제금액
      taxScopeAmount: 0, // ? 과세금액
      taxExScopeAmount:
        Math.floor(detail.price * (1 - detail.discount / 100)) * quantity, // ? 면세금액
      returnUrl: `${process.env.REACT_APP_API}/shop/${detail.pid}`,
    });
  };
  return (
    <ShopDetailWrapper>
      <ShopDetailContainer>
        <ShopDetailImgBox>
          {isLoading ? (
            <ImageSkeleton length={1} width={600} height={600} />
          ) : (
            <ShopDetailImg
              src={`${process.env.PUBLIC_URL}/${detail.url}`}
              alt="shop디테일"
            />
          )}
          {isLoading ? (
            <ShopImageGalleryBox>
              <ImageSkeleton length={5} width={100} height={100} />
            </ShopImageGalleryBox>
          ) : (
            <ShopImageGalleryBox>
              <ShopImage
                alt="상품 디테일 이미지"
                src={`${process.env.PUBLIC_URL}/${detailImage.url1}`}
              />
              <ShopImage
                alt="상품 디테일 이미지"
                src={`${process.env.PUBLIC_URL}/${detailImage.url2}`}
              />
              <ShopImage
                alt="상품 디테일 이미지"
                src={`${process.env.PUBLIC_URL}/${detailImage.url3}`}
              />
              <ShopImage
                alt="상품 디테일 이미지"
                src={`${process.env.PUBLIC_URL}/${detailImage.url4}`}
              />
              <ShopImage
                alt="상품 디테일 이미지"
                src={`${process.env.PUBLIC_URL}/${detailImage.url5}`}
              />
            </ShopImageGalleryBox>
          )}
        </ShopDetailImgBox>
        <ShopDetailContentBox>
          <ShopDetailTitleBox>
            <ShopContentName>{detail.company}</ShopContentName>
            <ShopContentItemTitle>{detail.title}</ShopContentItemTitle>
            <ShopIconsBox>
              <BsCart4
                className="icons cartIcon"
                onClick={() => AddCartHandler(detail, quantity, dispatch)}
              />
              <AiOutlineHeart
                className="icons heartIcon"
                onClick={AddWishHandler}
              />
            </ShopIconsBox>
          </ShopDetailTitleBox>
          <BorderBar />
          <ShopDetailPrice>
            {detail.price &&
              PriceFormat(
                Math.floor(detail.price * (1 - detail.discount / 100))
              )}
          </ShopDetailPrice>
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
            <QuantityCounts
              pid={detail.pid}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </QuantityBox>
          <BorderBar />
          <AmountBox>
            <InfoSpan>총금액</InfoSpan>
            <ShopDetailPrice>
              {detail.price &&
                quantity &&
                PriceFormat(
                  Math.floor(detail.price * (1 - detail.discount / 100)) *
                    quantity
                )}
            </ShopDetailPrice>
          </AmountBox>
          <PayBox>
            <Button
              color={`#01C73C`}
              width={305}
              height={55}
              radius={10}
              onClick={onClickNaverPayButton}
              className="orderButton"
              icon={true}
            >
              네이버페이
            </Button>

            <Button
              color="#F28C3A"
              width={305}
              height={55}
              radius={10}
              onClick={clickOrder}
              className="orderButton"
              icon={false}
              link={true}
              href={"/orders"}
            >
              바로 주문하기
            </Button>
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
