import React from "react";
import styled from "styled-components";

const ShopImageGalleryBox = styled.div`
  display: flex;
  width: 600px;
  justify-content: flex-start;
  margin-top: 23px;
`;

const ShopImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 25px;

  &:nth-last-of-type() {
    margin-right: 0;
  }
`;

function DetailImageCard({ detailImages }) {
  return (
    <ShopImageGalleryBox>
      {detailImages.map((image, index) => {
        return (
          <ShopImage
            key={index}
            alt="상품 디테일 이미지"
            src={`${process.env.PUBLIC_URL}/${image}`}
          />
        );
      })}
    </ShopImageGalleryBox>
  );
}

export default DetailImageCard;
