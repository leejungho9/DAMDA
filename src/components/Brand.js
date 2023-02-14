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
  width: 1300px;
  height: 310px;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-evenly;
  margin: 0 auto;
`
const BrandBox = styled.div`
  width: 610px;
  height: 140px;
  border: 1px solid #d6d6d6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;

  &:hover{  
    background-color : #f3f3f3;
    p {
      opacity: 1;
    }
  }
`

function Brand(props) {
  return (
    <BrandWrapper>
      <BrandMainTitle>BRAND</BrandMainTitle>
      <BrandBoxContainer>
        <BrandBox src={"images/brand1.png"}>
        </BrandBox>
        <BrandBox src={"images/brand2.png"}>
        </BrandBox>
        <BrandBox src={"images/brand3.png"}>
        </BrandBox>
        <BrandBox src={"images/brand4.png"}>
        </BrandBox>

      </BrandBoxContainer>
    </BrandWrapper>
  );
}

export default Brand;