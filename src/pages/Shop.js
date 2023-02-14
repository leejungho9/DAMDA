import React from "react";
import styled from "styled-components";
import CreatedCard from "../components/CreatedCard";
import data from "../assets/data/ShopData.json";

const ItemWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-top: 90px;
  padding-left: 74px;
  width: 1024px;
`;

const ItemContainer = styled.li`
  padding-right: 25px;
`;

function Shop() {

  const CreatedItem = data.data.map((el, idx) => {
    return (
      <ItemContainer key={idx}>
        <CreatedCard data={el} />
      </ItemContainer>
    )
  })

  return (
    <>
      <ItemWrapper>{CreatedItem}</ItemWrapper>
    </>
  );
}

export default Shop;
