import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PriceFormat from "../hooks/PriceFormat";

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
  cursor: pointer;
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
  let displayPrice = PriceFormat(data.price);

  const navigate = useNavigate();

  function goToDetail() {
    navigate(`/shop/${data.pid}`);
  }

  return (
    <CardWrapper key={data.pid}>
      <CardImg src={data.url} onClick={goToDetail} />
      <CardDecription>
        <ItemName>
          <strong>{data.title}</strong>
          <span>
            <strong>{data.score}</strong> / 5.0
          </span>
        </ItemName>
        <ItemTitle>{data.company}</ItemTitle>
        <ItemPrice>{displayPrice}</ItemPrice>
      </CardDecription>
    </CardWrapper>
  );
}

export default CreatedCard;
