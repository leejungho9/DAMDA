import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CreatedCard from "../components/Common/CreatedCard";
import { getProducts } from "../apis/apis";
import RadioButton from "../components/RadioButton/RadioButton";

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

function Shop() {
  const [selectFilter] = useState(["리뷰순", "클릭순"]);
  const [selectCategory] = useState([
    "수제 청",
    "수제 꿀",
    "즙",
    "건강식품",
    "건강디저트",
  ]);
  const [isCategory, setCategory] = useState("수제 청");
  const [isFilter, setFilter] = useState("리뷰순");
  const [isProduct, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [isCategory, isFilter]);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      const checkCategory = products.filter((el) => el.category === isCategory);
      let sortedProducts = [...checkCategory];

      if (isFilter === "리뷰순") {
        setProducts(
          sortedProducts.sort((a, b) => b.reviews?.length - a.reviews?.length)
        );
      } else if (isFilter === "클릭순") {
        setProducts(sortedProducts.sort((a, b) => b.views - a.views));
      } else {
        setProducts(checkCategory);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ShopWrapper>
        <MenuWrapper>
          <CategoryContainer>
            <MenuTitle>CATEGORY</MenuTitle>
            <SplitLine />
            <RadioButton
              item={selectCategory}
              menuIdx={0}
              isItem={isCategory}
              setFun={setCategory}
            />
          </CategoryContainer>

          <FilterContainer>
            <MenuTitle>FILTER</MenuTitle>
            <SplitLine />
            <RadioButton
              item={selectFilter}
              menuIdx={1}
              isItem={isFilter}
              setFun={setFilter}
            />
          </FilterContainer>
        </MenuWrapper>
        {isLoading && (
          <ItemWrapper>
            <h1>로딩 중입니다</h1>
          </ItemWrapper>
        )}
        {!isLoading && isProduct.length !== 0 && (
          <ItemWrapper>
            {isProduct.map((el) => {
              return (
                <ItemContainer key={el.pid}>
                  <CreatedCard data={el} />
                </ItemContainer>
              );
            })}
          </ItemWrapper>
        )}
        {!isLoading && isProduct.length === 0 && (
          <ItemWrapper>
            <h1>찾는 상품이 존재하지 않습니다.</h1>
          </ItemWrapper>
        )}
      </ShopWrapper>
    </>
  );
}

export default Shop;
