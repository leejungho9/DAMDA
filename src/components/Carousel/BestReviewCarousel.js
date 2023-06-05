import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const CarouselContianer = styled.div`
  width: 1300px;

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
`;
const CarouselBox = styled.div``;
const CarouselImageBox = styled.div`
  height: 430px;
  cursor: pointer;
`;
const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;
const ProductDecription = styled.div`
  font-family: "LINESeedKR-Rg";
  display: flex;
  flex-direction: column;
  padding: 40px 25px 5px 25px;
`;
const ProductCompany = styled.div`
  font-family: "LINESeedKR-Rg";
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
`;
const ProductTitle = styled.span`
  font-family: "LINESeedKR-Rg";
  font-size: 18px;
`;
const ItemComment = styled.span`
  font-family: "LINESeedKR-Rg";
  padding-top: 15px;
  line-height: 1.5rem;
`;

const ProductScore = styled.div``;
const TextStrong = styled.strong``;
function BestReviewCarousel({ items }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
  };

  return (
    <CarouselContianer>
      <Slider {...settings}>
        {items.map((item, index) => (
          <CarouselBox key={index}>
            <CarouselImageBox>
              <CarouselImage src={item.url} alt="이미지" />
            </CarouselImageBox>
            <ProductDecription>
              <ProductCompany>
                <TextStrong>{item.company}</TextStrong>
                <ProductScore>
                  <TextStrong>{item.score}</TextStrong> / 5.0
                </ProductScore>
              </ProductCompany>
              <ProductTitle>{item.title}</ProductTitle>
              <ItemComment>{"맛있어요 재주문 할 거 에요"}</ItemComment>
            </ProductDecription>
          </CarouselBox>
        ))}
      </Slider>
    </CarouselContianer>
  );
}

export default BestReviewCarousel;
