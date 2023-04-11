import React from "react";
import styled from "styled-components";
import LineBar from "./BorderBar";

const ReviewWrapper = styled.div`
  margin-top: 105px;
`;
const ReviewContainer = styled.div`
  margin-bottom: 45px;
`;
const ReviewTextArea = styled.div`
  margin-bottom: 28px;
  display: flex;
`;
const ReviewTitle = styled.h3`
  font-size: 18px;
  margin-right: 50px;
  font-family: "LINESeedKR-Rg";
`;
const ReviewScope = styled.span`
  font-size: 18px;
  font-family: "LINESeedKR-Rg";
`;
const ReviewContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ReviewContent = styled.div`
  display: flex;
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
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
const ReviewContentScope = styled.span`
  margin-top: 15px;
  font-size: 16px;
  font-family: "LINESeedKR-Rg";
`;
const ReviewContentText = styled.span`
  margin-top: 20px;
  font-size: 16px;
  font-family: "LINESeedKR-Rg";
`;

const BorderBar = styled(LineBar)`
  width: 100%;
  margin-bottom: 100px;
`;

const BestDetailReview = ({ item }) => {
  return (
    <ReviewWrapper>
      <ReviewContainer>
        <ReviewTextArea>
          <ReviewTitle>BEST 고객리뷰</ReviewTitle>
          <ReviewScope> {item.score} / 5.0</ReviewScope>
        </ReviewTextArea>
        <ReviewContentWrapper>
          {/* 반복돼야함 */}
          <ReviewContent>
            <ReviewContentImageBox>
              <ReviewContentImage
                src={`${process.env.PUBLIC_URL}/${item.url}`}
              />
            </ReviewContentImageBox>
            <ReviewContentInfo>
              <ReviewContentScope>4.2 / 5.0</ReviewContentScope>
              <ReviewContentText>
                선물용으로 샀는데 너무 만족합니다.
              </ReviewContentText>
            </ReviewContentInfo>
          </ReviewContent>
          {/* 반복돼야함 */}
          <ReviewContent>
            <ReviewContentImageBox>
              <ReviewContentImage
                src={`${process.env.PUBLIC_URL}/${item.url}`}
              />
            </ReviewContentImageBox>
            <ReviewContentInfo>
              <ReviewContentScope>4.2 / 5.0</ReviewContentScope>
              <ReviewContentText>
                선물용으로 샀는데 너무 만족합니다.
              </ReviewContentText>
            </ReviewContentInfo>
          </ReviewContent>
        </ReviewContentWrapper>
      </ReviewContainer>
      <BorderBar />
    </ReviewWrapper>
  );
};

export default BestDetailReview;
