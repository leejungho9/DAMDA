import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  * {
    padding: 0;
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
`;
const CardImg = styled.img`
  width: 300px;
  height: 300px;
`;
const CardDecription = styled.div`
  font-family: "LINESeedKR-Rg";
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;

  span {
    padding-left: 5px;
    padding-right: 5px;
  }
`;

const ItemName = styled.span`
  font-family: "LINESeedKR-Rg";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
`;
const ItemTitle = styled.span`
  font-family: "LINESeedKR-Rg";
  padding-top: 30px;
  font-size: 14px;
`;
const ItemPrice = styled.span`
  font-family: "LINESeedKR-Bd";
  padding-top: 13px;
  font-size: 14px;
  color: #f28b39;
`;

function CreatedCard({ data }) {
  let priceFormatting = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return (
    <CardWrapper key={data.id}>
      <CardImg src={data.url} />
      <CardDecription>
        <ItemName>
          <strong>{data.name}</strong>
          <span>
            <strong>{data.score}</strong> / 5.0
          </span>
        </ItemName>
        <ItemTitle>{data.item_title}</ItemTitle>
        <ItemPrice>{priceFormatting}</ItemPrice>
      </CardDecription>
    </CardWrapper>
  );
}

export default CreatedCard;
