import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PromotionList from "../components/PromotionList/PromotionList";
import { getPromotions } from "../apis/apis";

const PromotionWrapper = styled.div`
  margin: 0 auto;
  width: 1300px;
  position: relative;
  hr {
    color: #b5b5b6;
  }
`;
const PromotioTitle = styled.h1`
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 60px;
`;
const PromotionCountBox = styled.div`
  text-align: left;
  font-family: "LINESeedKR-Rg";
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
`;
const PromotionCountSpan = styled.span`
  width: 60px;
  margin: 20px 5px;
  text-align: center;
`;
const PromotionBox = styled.div`
  min-height: 500px;
  margin-top: 20px;
  margin-bottom: 85px;
  display: flex;
  flex-wrap: wrap;
`;
const Promotion = () => {
  const [promotions, setPromotions] = useState();
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const promotions = await getPromotions();
        setPromotions(promotions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <PromotionWrapper>
      <PromotioTitle>프로모션</PromotioTitle>
      <PromotionCountBox>
        <PromotionCountSpan>총 {promotions.length} 개 </PromotionCountSpan>
      </PromotionCountBox>
      <hr />
      <PromotionBox>
        <PromotionList items={promotions} />
      </PromotionBox>
    </PromotionWrapper>
  );
};

export default Promotion;
