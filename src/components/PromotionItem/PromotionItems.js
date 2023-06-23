import React from "react";
import styled from "styled-components";

const PromotionBox = styled.div`
  width: 300px;
  height: 300px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 24px;
  position: relative;
`;
const PromotionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  &:hover {
    transform: scale(1.02);
    transition: all 0.3s ease-in-out 0s;
  }
`;

const PromotionInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 18px 5px 0px;
  font-family: "LINESeedKR-Rg";
`;

const PromotionTitle = styled.span``;
const PromotionStatus = styled.span`
  color: #f28b39;
`;
const PromotionItems = ({ item }) => {
  return (
    <PromotionBox>
      <PromotionImage src={item.url} alt="이미지" />

      <PromotionInfoBox>
        <PromotionTitle>{item.title}</PromotionTitle>
        <PromotionStatus>{item.active ? "진행중" : "마감"}</PromotionStatus>
      </PromotionInfoBox>
    </PromotionBox>
  );
};

export default PromotionItems;
