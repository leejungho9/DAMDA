import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ref, onValue } from "firebase/database";
import db from "../Firebase";

const PrmotionWrapper = styled.div`
  width: 100%;
  margin-top: 120px;
`;
const PromotionMainTitle = styled.h3`
  text-align: center;
  margin-bottom: 65px;
  font-family: "LINESeedKR-Bd";
  font-size: 22px;
`;
const PrmotionMainImage = styled.div`
  width: 850px;
  height: 600px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
`;
const PromotionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PromotionInfo = styled.div`
  width: 350px;
  padding: 25px;
  position: relative;
  line-height: 1;
  font-family: "LINESeedKR-Rg";
`;

const PromotionTitle = styled.h3`
  font-family: "LINESeedKR-Bd";
  font-size: 24px;
  margin: 0;
  margin-bottom: 15px;
`;

const PromotionDate = styled.p`
  margin: 0;
  margin-bottom: 45px;
  font-size: 16px;
`;

const PromotionDes = styled.p`
  line-height: 1.8rem;
  font-size: 16px;
`;

const ItemContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
`;

const ItemImage = styled.div`
  width: 220px;
  height: 220px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
`;
const ItemInfo = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const ItemCompany = styled.p`
  font-family: "LINESeedKR-Bd";
  font-size: 17px;
  margin-bottom: 30px;
`;

const ItemName = styled.p`
  font-family: "LINESeedKR-Rg";
  font-size: 17px;
`;

const ItemDiscount = styled.p`
  font-family: "LINESeedKR-Rg";
  font-size: 17px;
  margin: 10px 0;
`;

const ItemPrice = styled.p`
  font-family: "LINESeedKR-Bd";
  font-size: 17px;
  color: #f28b39;
`;

function Promotion(props) {
  const [isPromotions, setIsPromotions] = useState([]);
  //firebase promotions data 받아오기
  useEffect(() => {
    const value = ref(db, "promotions/");
    onValue(value, (snapshot) => {
      const data = snapshot.val();
      setIsPromotions([data]);
    });
  }, []);

  return (
    <PrmotionWrapper>
      <PromotionMainTitle>PROMOTION</PromotionMainTitle>
      {isPromotions &&
        isPromotions.map((promotion) => {
          let buyPrice = (
            promotion.product1.price *
            (promotion.product1.discount / 100)
          )
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return (
            <PromotionContainer key={promotion.promotion_id}>
              <PrmotionMainImage src={promotion.url} />
              <PromotionInfo>
                <PromotionTitle>{promotion.title}</PromotionTitle>
                <PromotionDate>{promotion.start_date}</PromotionDate>
                <PromotionDes>{promotion.desc}</PromotionDes>
                <ItemContainer>
                  <ItemImage src={promotion.sub_url} />
                  <ItemInfo>
                    <ItemCompany>{promotion.product1.company}</ItemCompany>
                    <ItemName>{promotion.product1.title}</ItemName>
                    <ItemDiscount>{promotion.product1.discount}%</ItemDiscount>
                    <ItemPrice>{buyPrice}</ItemPrice>
                  </ItemInfo>
                </ItemContainer>
              </PromotionInfo>
            </PromotionContainer>
          );
        })}
    </PrmotionWrapper>
  );
}

export default Promotion;
