import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getDetailItem, getPromotions } from "../../apis/apis";
import PriceFormat from "../../hooks/PriceFormat";

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
  background-position: center;
  background-size: cover;
  cursor: pointer;
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

function Promotion() {
  const [isPromotions, setIsPromotions] = useState([]);
  const [isProduct, setIsProduct] = useState([]);

  // ! firebase promotions data 받아오기
  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const promotions = await getPromotions();
        setIsPromotions(promotions[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPromotion();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getDetailItem(isPromotions.pid);
        setIsProduct(product);
      } catch (error) {
        console.log(error);
      }
    };

    if (isPromotions.length !== 0) {
      fetchProduct();
    }
  }, [isPromotions]);

  return (
    <PrmotionWrapper>
      <PromotionMainTitle>PROMOTION</PromotionMainTitle>
      <PromotionContainer key={isPromotions.promotionId}>
        <PrmotionMainImage src={isPromotions.url} />
        <PromotionInfo>
          <PromotionTitle>{isPromotions.title}</PromotionTitle>
          <PromotionDate>{isPromotions.start_date}</PromotionDate>
          <PromotionDes>{isPromotions.desc}</PromotionDes>
          <ItemContainer>
            <Link to={`/shop/${isPromotions.pid}`}>
              <ItemImage src={isProduct.url} />
            </Link>
            <ItemInfo>
              <ItemCompany>{isProduct && isProduct.company}</ItemCompany>
              <ItemName>{isProduct && isProduct.title}</ItemName>
              <ItemDiscount>{isProduct && isProduct.discount}%</ItemDiscount>
              <ItemPrice>
                {isProduct &&
                  isProduct.price &&
                  PriceFormat(
                    Math.floor(isProduct.price * (1 - isProduct.discount / 100))
                  )}
              </ItemPrice>
            </ItemInfo>
          </ItemContainer>
        </PromotionInfo>
      </PromotionContainer>
    </PrmotionWrapper>
  );
}

export default Promotion;
