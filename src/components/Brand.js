import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBrands } from "../apis/apis";

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
`;
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

  &:hover {
    background-color: #f3f3f3;
    p {
      opacity: 1;
    }
  }
`;

function Brand() {
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
    <BrandWrapper>
      <BrandMainTitle>BRAND</BrandMainTitle>
      <BrandBoxContainer>
        {brands &&
          brands.map((items) => (
            <BrandBox src={items.url} key={items.brandId}></BrandBox>
          ))}
      </BrandBoxContainer>
    </BrandWrapper>
  );
}

export default Brand;
