import React, { useState, useRef } from "react";
import styled from "styled-components";
import CreatedCard from "../components/CreatedCard";
import data from "../assets/data/ShopData.json";

const ShopWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const MenuWrapper = styled.div`
  padding-top: 90px;
  display: flex;
  flex-direction: column;
`;
const MenuTitle = styled.span`
  font-family: "LINESeedKR-Bd";
  font-size: 15px;
  padding-bottom: 4px;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input[type="radio"] {
    display: none;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 150px;

  input[type="radio"] {
    margin-right: 20px;
    appearance: none;
    background-color: #f28b39;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    cursor: pointer;
    &:checked {
      background-color: #ffffff;
      border: 3px solid #f28b39;
      cursor: pointer;
    }
  }
`;

const SplitLine = styled.span`
  display: flex;
  width: 280px;
  height: 2px;
  border: none;
  margin-bottom: 20px;
  background-color: #b5b5b6;
`;

const ItemWrapper = styled.ul`
  position: relative;
  left: 74px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 90px;
  width: 1024px;
`;

const ItemContainer = styled.li`
  padding-right: 25px;
  padding-bottom: 90px;
`;

const RadioContainer = styled.div`
  font-family: "LINESeedKR-Rg";
  font-size: 14px;
  width: 280px;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  input[type="radio"]:checked + span {
    color: #f28b39;
  }
  cursor: pointer;
`;
const RadioButton = styled.input`
  width: 100%;
`;
const RadioTitle = styled.span``;

function Shop() {
  const [selectCategory] = useState([
    "수제 청",
    "수제 꿀",
    "즙",
    "건강식품",
    "건강디저트",
  ]);
  const [isCategory, setCategory] = useState("수제 청");

  const [selectFilter] = useState(["리뷰순", "클릭순", "구입순"]);
  const [isFilter, setFilter] = useState("리뷰순");

  const radioRef = useRef([]);

  const CreatedItem = data.data.map((el, idx) => {
    return (
      <ItemContainer key={idx}>
        <CreatedCard data={el} />
      </ItemContainer>
    );
  });

  const handleCategory = (e) => setCategory(e.currentTarget.children[0].value);
  const handleFilter = (e) => setFilter(e.currentTarget.children[0].value);

  function CreaedButton({ item, menuIdx }) {
    return item.map((el, idx) => {
      return (
        <RadioContainer
          key={idx}
          onClick={menuIdx === 0 ? handleCategory : handleFilter}
        >
          <RadioButton
            id={el}
            value={el}
            ref={() => radioRef.current[idx]}
            name={menuIdx === 0 ? "Category" : "Filter"}
            type="radio"
            onChange={menuIdx === 0 ? handleCategory : handleFilter}
            checked={(menuIdx === 0 ? isCategory : isFilter) === el}
          />
          <RadioTitle>{el}</RadioTitle>
        </RadioContainer>
      );
    });
  }
  return (
    <>
      <ShopWrapper>
        <MenuWrapper>
          <CategoryContainer>
            <MenuTitle>CATEGORY</MenuTitle>
            <SplitLine />
            <CreaedButton item={selectCategory} menuIdx={0} />
          </CategoryContainer>
          <FilterContainer>
            <MenuTitle>FILTER</MenuTitle>
            <SplitLine />
            <CreaedButton item={selectFilter} menuIdx={1} />
          </FilterContainer>
        </MenuWrapper>
        <ItemWrapper>{CreatedItem}</ItemWrapper>
      </ShopWrapper>
    </>
  );
}

export default Shop;
