import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const SidebarWrapper = styled.div`
  width: 375px;
  background-color: #f7f8f8;
  height: 100%;
  position: fixed;
  right: ${(props) => (props.state ? "0" : "-400px")};
  transition: all 0.35s;
`;

const SidebarContainer = styled.div`
  margin: 30px 50px 50px 50px;
  .icon {
    cursor: pointer;
  }
`;
const SearchBox = styled.div`
  position: relative;
  margin-top: 40px;
  .searchIcon {
    position: absolute;
    right: 17px;
    top: 10px;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 13px;
  border-radius: 25px;
  border: 0px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: #e6e6e6;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #858585
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
  color: #858585;
  cursor: pointer;
`;

const PriceContainer = styled.div`
  position: relative;
  padding-top: 30px;
`

const SelectValue = styled.div`
  position: absolute;
  top : -25%;
  span {
    line-height: 24px;
    text-align: center;
    color: #858585;
    font-size: 12px;
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);

    &::before{
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-top: 8px solid #f28b39;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      margin-top: -1px;
    }
  }

`
const PriceRange = styled.input.attrs({ type: "range" })`
  width: 100%;
  height: 3px;
  -webkit-appearance: none;
  background-color: #f28b39;
  
  &::before {
    content: "";
    display: block;
    background: #f28b39;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -4px;
  }
  &::after {
    content: "";
    display: block;
    background: #f28b39;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -4px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #ffffff;
    cursor: pointer;
    border: 3px solid #f28b39; 
    border-radius: 50%;
    height: 15px;   
    width: 15px;
    
    &::-webkit-slider-thumb ::after{
      content: "=";
      display: block;
      background: #f28b39;
      width: 10px;
      border-radius: 50%;
      height: 10px;
    
    }
  }
`;
const RadioContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;
const RadioButton = styled.input.attrs({ type: "radio" })`
  width: 15px;
  margin-right: 20px;
  appearance: none;
  background-color: #f28b39;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  cursor: pointer;
  &:checked{
    background-color: #ffffff;
    border: 4px solid #f28b39;
    cursor: pointer;
  }
`;
const RadioLabel = styled.div`
  font-size: 15px;
  color: #858585;
`;
function Sidebar({ isSidebar, setSidebar }) {
  const rangeRef = useRef();
  const valueRef = useRef();

  const [value, setValue] = useState(0);

  const rangeChange = () => {
    let min = rangeRef.current.min
    let max = rangeRef.current.max

    setValue(rangeRef.current.value)
    const newValue = Number((value - min) * 100 / (max- min)),
    newPosition = 20 - (newValue * 0.4);
    valueRef.current.style.left = `calc(${newValue}% + (${newPosition}px))`;
    // console.log(value)
  }
  

  useEffect(() => {
    rangeChange();
  },[value])

  return (
    <SidebarWrapper state={isSidebar}>
      <SidebarContainer>
        <IoCloseOutline
          className="icon"
          size={24}
          onClick={() => setSidebar(!isSidebar)}
        />
        <SearchBox>
          <SearchInput placeholder=" 검색어를 입력해주세요" />
          <FiSearch className="icon searchIcon" />
        </SearchBox>
        <TopSearched>추천 검색어</TopSearched>
        <TagContainer>
          <TopSearchedTag>명절선물</TopSearchedTag>
          <TopSearchedTag>명절선물</TopSearchedTag>
        </TagContainer>
          <TopSearched>금액대</TopSearched>
        <PriceContainer>
          <SelectValue ref={valueRef}><span>{value}</span></SelectValue>
          <PriceRange ref={rangeRef} value={value} onChange={rangeChange}  min={0}max={200000}/>
        </PriceContainer>
        <TopSearched>배송</TopSearched>
        <RadioContainer>
          <RadioButton name="delivery" />
          <RadioLabel>당일출고</RadioLabel>
        </RadioContainer>
        <RadioContainer>
          <RadioButton name="delivery" />
          <RadioLabel>일반배송</RadioLabel>
        </RadioContainer>
        <TopSearched>혜택</TopSearched>
        <RadioContainer>
          <RadioButton name="benefit" />
          <RadioLabel>할인상품</RadioLabel>
        </RadioContainer>
        <RadioContainer>
          <RadioButton name="benefit" />
          <RadioLabel>한정수량</RadioLabel>
        </RadioContainer>
      </SidebarContainer>
    </SidebarWrapper>
  );
}

export default Sidebar;
