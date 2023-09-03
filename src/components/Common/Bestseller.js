import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BestSellerCarousel from "../Carousel/BestSellerCarousel";
import { getProducts } from "../../apis/apis";

const CaroselContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 65px;
`;

const SellerTitle = styled.div`
  span {
    font-family: "LINESeedKR-Bd";
    font-size: 22px;
  }
  * {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 120px;
  }
`;

function BestSeller() {
  const [isProducts, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <SellerTitle>
        <span>BEST SELLER</span>
      </SellerTitle>
      <CaroselContainer>
        <BestSellerCarousel items={isProducts} />
      </CaroselContainer>
    </>
  );
}

export default BestSeller;
