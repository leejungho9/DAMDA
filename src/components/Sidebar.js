import React from "react";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 375px;
  background-color: #f7f8f8;
  height: 100%;
  position: fixed;
  top: 90px;
  right: 0px;
`;

const SidebarContainer = styled.div`
  margin: 50px;
`;
const SearchBox = styled.div``;
const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 15px;
  border-radius: 18px;
  border: 0px;
  padding: 0 15px;
  box-sizing: border-box;
  font-weight: bold;
  background-color: #e6e6e6;
  &::placeholder {
    color: gray;
  }
`;

const TopSearched = styled.p`
  margin-top: 60px;
  margin-bottom: 30px;
  color: #3e3a39;
  font-family: "LINESeedKR-Rg";
  font-size: 18px;
  font-weight: bold;
`;
const TagContainer = styled.div`
  display: flex;
`;
const TopSearchedTag = styled.div`
  width: 70px;
  height: 30px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  background-color: #e6e6e6;
`;
const PriceRange = styled.input.attrs({ type: "range" })`
  width: 100%;
  height: 3px;
`;
const RadioContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`
const RadioButton = styled.input.attrs({ type: "radio" })`
  width: 15px;
  margin-right: 20px;
`;

const RadioLabel = styled.div`
  font-size: 15px;
  color: #898989;
  font-weight: bold;
`
function Sidebar(props) {
  return (
    <SidebarWrapper>
      <SidebarContainer>
        <SearchBox>
          <SearchInput placeholder=" 검색어를 입력해주세요 " />
          <TopSearched>추천 검색어</TopSearched>
          <TagContainer>
            <TopSearchedTag>명절선물</TopSearchedTag>
            <TopSearchedTag>명절선물</TopSearchedTag>
          </TagContainer>
          <TopSearched>금액대</TopSearched>
          <PriceRange />
          <TopSearched>배송</TopSearched>
          <RadioContainer>
            <RadioButton  name="delivery"/>
            <RadioLabel>당일출고</RadioLabel>
          </RadioContainer>
          <RadioContainer>
            <RadioButton name="delivery" />
            <RadioLabel>일반배송</RadioLabel>
          </RadioContainer>
          <TopSearched>혜택</TopSearched>
          <RadioContainer>
            <RadioButton name="benefit"/>
            <RadioLabel>할인상품</RadioLabel>
          </RadioContainer>
          <RadioContainer>
            <RadioButton name="benefit"/>
            <RadioLabel>한정수량</RadioLabel>
          </RadioContainer>
        </SearchBox>
      </SidebarContainer>
    </SidebarWrapper>
  );
}

export default Sidebar;
