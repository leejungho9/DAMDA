import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBrands } from "../apis/apis";

const BrandnWrapper = styled.div`
  margin: 0 auto;
  width: 1300px;
  position: relative;
  hr {
    color: #b5b5b6;
  }
`;
const BrandTitle = styled.h1`
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 60px;
`;
const BrandCountBox = styled.div`
  text-align: left;
  font-family: "LINESeedKR-Rg";
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
`;
const BrandCountSpan = styled.span`
  width: 60px;
  margin: 20px 5px;
  text-align: center;
`;
const BrandBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 800px;
`;
const BrandBox = styled.div`
  margin-top: 45px;
  margin-bottom: 85px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const BrandImage = styled.div`
  width: 400px;
  height: 120px;
  border: 1px solid #d6d6d6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 30px;

  &:hover {
    background-color: #f3f3f3;
    p {
      opacity: 1;
    }
  }
`;

const Brand = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const Brands = await getBrands();
        setBrands(Brands);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrands();
  }, []);
  return (
    <BrandnWrapper>
      <BrandTitle>브랜드</BrandTitle>
      <BrandCountBox>
        <BrandCountSpan>총 {brands && brands.length}개</BrandCountSpan>
      </BrandCountBox>
      <hr />
      <BrandBoxContainer>
        <BrandBox>
          {brands &&
            brands.map((items) => (
              <BrandImage src={items.url} key={items.brandId}></BrandImage>
            ))}
        </BrandBox>
      </BrandBoxContainer>
    </BrandnWrapper>
  );
};

export default Brand;
