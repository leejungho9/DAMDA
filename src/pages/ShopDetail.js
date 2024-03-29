import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import BestDetailReview from "../components/BestDetailReview/BestDetailReview";
import LineBar from "../components/Common/BorderBar";
import ImageSkeleton from "../components/Skeleton/ImageSkeleton";
import QuantityCounts from "../components/Counts/QuantityCounts";
import {
  AddCart,
  AddWish,
  getDetailImage,
  getDetailItem,
  plusViews,
} from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button/Button";
import PriceFormat from "../hooks/PriceFormat";
import DetailImageCard from "../components/ImageCard/DetailImageCard";
import onClickNaverPay from "../utils/openNaverPay";

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
  margin-top: 35px;
`;
const DetailImage = styled.img`
  width: 100%;
`;

const PlusButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
`;
const PlusButton = styled.button`
  width: 400px;
  height: 50px;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  font-family: "LINESeedKR-Rg";
  cursor: pointer;
`;

function ShopDetail(props) {
  const { id } = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState([]);
  const [detailImages, setdetailImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [_, setViews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewWriteMode, setReviewWriteMode] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [allProductImages, setAllProductImages] = useState([]);
  const [displayProductImages, setDisplayProductImages] = useState([]);
  const limitNum = 1;
  const userId = user.userId;
  //! detil Imaage 가져오기
  useEffect(() => {
    const fetchDetailImg = async () => {
      try {
        const detailImg = await getDetailImage(id);
        setdetailImages(detailImg);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetailImg();
  }, [id]);

  //!  detail Product 정보 가져오기
  useEffect(() => {
    const fetchDetailItem = async () => {
      try {
        const detailItem = await getDetailItem(id);
        setDetail(detailItem);
        setAllProductImages(Object.values(detailItem.detailUrl));
        setDisplayProductImages(
          filterDisplayProductData(Object.values(detailItem.detailUrl))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetailItem();
  }, [id]);

  //! 조회수 올리기
  useEffect(() => {
    const increaseViews = async () => {
      try {
        const detailItem = await plusViews(id);
        setViews(detailItem);
      } catch (error) {
        console.log(error);
      }
    };

    increaseViews();
  }, [id]);

  //! 상세 이미지 필터처리
  const filterDisplayProductData = (
    allProductImages,
    displayProductImages = []
  ) => {
    const limit = displayProductImages.length + limitNum;
    const array = allProductImages.filter(
      (images, index) => index + 1 <= limit
    );

    return array;
  };

  const clickAddCartButton = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용가능합니다.");
      navigator("/login");
      return;
    }
    try {
      AddCart(detail, quantity, dispatch, userId);
    } catch (error) {
      console.log(error);
    }
  };

  const clickAddWishButton = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용가능합니다.");
      navigator("/login");
      return;
    }
    try {
      AddWish(detail, quantity, dispatch, userId);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = (detail, quantity) => {
    return Math.floor(detail.price * (1 - detail.discount / 100)) * quantity;
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
            <DetailImageCard detailImages={detailImages} />
          )}
        </ShopDetailImgBox>
        <ShopDetailContentBox>
          <ShopDetailTitleBox>
            <ShopContentName>{detail.company}</ShopContentName>
            <ShopContentItemTitle>{detail.title}</ShopContentItemTitle>
            <ShopIconsBox>
              <BsCart4
                className="icons cartIcon"
                onClick={clickAddCartButton}
              />
              <AiOutlineHeart
                className="icons heartIcon"
                onClick={clickAddWishButton}
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
                PriceFormat(totalPrice(detail, quantity))}
            </ShopDetailPrice>
          </AmountBox>
          <PayBox>
            <Button
              color={`#01C73C`}
              width={305}
              height={55}
              radius={10}
              onClick={() =>
                onClickNaverPay(detail, totalPrice(detail, quantity))
              }
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

      <BestDetailReview
        pid={id}
        item={detail}
        reviewWriteMode={reviewWriteMode}
        setReviewWriteMode={setReviewWriteMode}
        detailImages={detail.url}
      />
      <DetialTitle>상품 상세</DetialTitle>
      <DetailImageBox>
        {displayProductImages.length > 0 ? (
          displayProductImages.map((el, index) => (
            <DetailImage
              key={index}
              src={`${process.env.PUBLIC_URL}/${el}`}
              loading="lazy"
              alt="상품상세 이미지"
            />
          ))
        ) : isLoading ? (
          <h2>...Loading</h2>
        ) : (
          <h2>상세이미지가 없습니다.</h2>
        )}
        {allProductImages.length > displayProductImages.length && (
          <PlusButtonBox>
            <PlusButton
              onClick={() =>
                setDisplayProductImages(
                  filterDisplayProductData(
                    allProductImages,
                    displayProductImages
                  )
                )
              }
            >
              더보기
            </PlusButton>
          </PlusButtonBox>
        )}
      </DetailImageBox>
    </ShopDetailWrapper>
  );
}

export default ShopDetail;
