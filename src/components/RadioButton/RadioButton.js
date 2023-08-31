import React, { useRef } from "react";
import styled from "styled-components";

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

function RadioButtons({ item, menuIdx, isItem, setFun }) {
  const radioRef = useRef([]);
  const handleCategory = (e) => setFun(e.currentTarget.children[0].value);
  const handleFilter = (e) => setFun(e.currentTarget.children[0].value);
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
          checked={isItem === el}
        />
        <RadioTitle>{el}</RadioTitle>
      </RadioContainer>
    );
  });
}

export default RadioButtons;
