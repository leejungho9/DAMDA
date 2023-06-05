import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSkeleton from "../Skeleton/ImageSkeleton";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { removeReview } from "../../apis/apis";

const CarouselContianer = styled.div`
  width: 1300px;
  .slick-list {
    height: 100px;
    position: relative;
  }
  .slick-track {
    height: 100px;
    position: absolute;
    left: 0;
  }
  .slick-slide {
    padding: 0 15px;
    box-sizing: border-box;
  }
  .slick-dots {
    position: static;
    padding-top: 80px;
    li.slick-active button:before {
      color: #f28b39;
    }
  }
  .slick-prev:before,
  .slick-next:before {
    color: #d2d2d2;
  }
`;
const ReviewContentBox = styled.div`
  display: flex !important;
  width: 650px;
`;

const ReviewContentImageBox = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 70px;
`;
const ReviewContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ReviewContentInfo = styled.div`
  width: 420px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 5px;
`;
const ReviewContentScope = styled.span`
  font-size: 16px;
  font-family: "LINESeedKR-Rg";
`;
const ReviewContentTextBox = styled.div`
  margin-top: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;
const ReviewContentText = styled.span`
  font-size: 16px;
  font-family: "LINESeedKR-Rg";
`;

const ReviewUserName = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
`;
const CloseIconBox = styled.div``;
const CloseIcon = styled(IoCloseOutline)`
  margin-left: 12px;
  cursor: pointer;
  font-size: 18px;
`;

function ReviewCarousel({
  pid,
  isLoading,
  isReviews,
  detailImages,
  setReviews,
}) {
  const { user } = useSelector((state) => state.user);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    arrows: true,
  };
  const protectName = (name) => {
    if (name.length <= 2) {
      return name.replace(name.substring(0, 1), "*");
    }
    return (
      name[0] +
      "*".repeat(name.substring(1, name.length - 1).length) +
      name[name.length - 1]
    );
  };
  const reviewRemoveHandler = async (reviewId) => {
    try {
      await removeReview(reviewId, pid);
      setReviews(isReviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CarouselContianer>
      <Slider {...settings}>
        {isReviews.map((isReview, index) => (
          <ReviewContentBox key={index}>
            <ReviewContentImageBox>
              {isLoading ? (
                <ImageSkeleton
                  length={1}
                  width={100}
                  height={100}
                ></ImageSkeleton>
              ) : (
                <ReviewContentImage
                  src={`${process.env.PUBLIC_URL}/${detailImages}`}
                />
              )}
            </ReviewContentImageBox>
            <ReviewContentInfo>
              <ReviewContentScope>
                {isReview.reviewScore} / 5.0
              </ReviewContentScope>

              <ReviewUserName>{protectName(isReview.userName)}</ReviewUserName>
              <ReviewContentTextBox>
                <ReviewContentText>{isReview.reviewContent}</ReviewContentText>
              </ReviewContentTextBox>
            </ReviewContentInfo>
            <CloseIconBox>
              {isReview.userId === user.userId && (
                <CloseIcon
                  onClick={() => reviewRemoveHandler(isReview.reviewId)}
                />
              )}
            </CloseIconBox>
          </ReviewContentBox>
        ))}
      </Slider>
    </CarouselContianer>
  );
}

export default ReviewCarousel;
