import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BestReviewCarousel from "./Carousel/BestReviewCarousel";
import { getProducts } from "../apis/apis";

const CaroselContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 65px;
`;

const ReviewTitle = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 120px;
  margin-bottom: 65px;
  font-family: "LINESeedKR-Bd";
  font-size: 22px;
`;

function BestReview() {
  const [isProducts, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <ReviewTitle>
        <span>BEST REVIEW</span>
      </ReviewTitle>
      <CaroselContainer>
        <BestReviewCarousel items={isProducts} />
      </CaroselContainer>
    </>
  );
}

export default BestReview;
