import React from 'react';
import styled from "styled-components";

const BrandWrapper = styled.div`
  width: 100%;
  margin: 140px 0;
`;
const BrandMainTitle = styled.h3`
  text-align: center;
  margin-bottom: 65px;
  font-family: "LINESeedKR-Bd";
  font-size: 22px;
`;

const BrandBoxContainer = styled.div`
  display: flex;
  width: 1600px;
  height: 310px;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-evenly;
  margin: 0 auto;
  box-sizing: border-box;
`
const BrandBox = styled.div`
  width: 755px;
  height: 140px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{  
    background-color : #00000070;
    color : blue;
    p {
      opacity: 1;
    }
  }

`
const BrandName = styled.p`
  font-size: 20px;
  color : white;
  opacity: 0;
`

function Brand(props) {
  return (
    <BrandWrapper>
      <BrandMainTitle>BRAND</BrandMainTitle>
      <BrandBoxContainer>
        <BrandBox>
          <BrandName>일상이 예술, 예술이 일상 아트앤에디션</BrandName>
        </BrandBox>
        <BrandBox>
          <BrandName>일상이 예술, 예술이 일상 아트앤에디션</BrandName>
        </BrandBox>
        <BrandBox>
          <BrandName>일상이 예술, 예술이 일상 아트앤에디션</BrandName>
        </BrandBox>
        <BrandBox>
          <BrandName>일상이 예술, 예술이 일상 아트앤에디션</BrandName>
        </BrandBox>

      </BrandBoxContainer>
    </BrandWrapper>
  );
}

export default Brand;