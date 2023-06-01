import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const CarouselBox = styled.div`
  width: 410px !important;
`;
const CarouselImageBox = styled.div`
  width: 410px !important;
  height: 480px;
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
  padding: 40px 25px 0 25px;
`;
const ProductCompany = styled.div`
  font-family: "LINESeedKR-Rg";
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
`;

const ProductScore = styled.div``;
const TextStrong = styled.strong``;
const ProductTitle = styled.span`
  font-family: "LINESeedKR-Rg";
  font-size: 16px;
`;
const ProductPriceBox = styled.div``;
const ProductDiscount = styled.span`
  font-family: "LINESeedKR-Rg";
  padding: 7px 0;
  font-size: 16px;
`;
const ProductPrice = styled.span`
  font-family: "LINESeedKR-Rg";
  padding-right: 16px;
  font-size: 15px;
`;
const ProductDiscountPrice = styled.span`
  font-family: "LINESeedKR-Bd";
  padding-right: 16px;
  font-size: 16px;
  color: #f28b39;
`;

function BestSellerCarousel({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    arrows: false,
  };

  return (
    <CarouselContianer>
      <Slider {...settings}>
        {items.map((item) => (
          <CarouselBox>
            <Link to={`/shop/${item.pid}`}>
              <CarouselImageBox>
                <CarouselImage src={item.url} alt="이미지" />
              </CarouselImageBox>
            </Link>
            <ProductDecription>
              <ProductCompany>
                <TextStrong>{item.company}</TextStrong>
                <ProductScore>
                  <TextStrong>{item.score}</TextStrong> / 5.0
                </ProductScore>
              </ProductCompany>
              <ProductTitle>{item.title}</ProductTitle>
              <ProductDiscount>{item.discount}%</ProductDiscount>
              <ProductPriceBox>
                <ProductDiscountPrice>{item.price}</ProductDiscountPrice>
                <ProductPrice>{item.price}</ProductPrice>
              </ProductPriceBox>
            </ProductDecription>
          </CarouselBox>
        ))}
      </Slider>
    </CarouselContianer>
  );
}

export default BestSellerCarousel;
