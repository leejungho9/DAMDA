import React,{ useRef,useEffect } from "react";
import styled from "styled-components";

const CarouselUl = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 240px;
  height: 14px;
  border: solid 1px;
  border-color: #f28b39;
  padding: 0;
  margin: 0;
  margin-top: 120px;
  border-radius: 14px;
`;

const CarouselLi = styled.li`
  background-color: #f28b39;
  width: 80px;
  height: 14px;
  border-radius: 14px;
  cursor: pointer;
`;
const CarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;
  dl, li, menu, ol, ul {
    list-style: none;
  }
`
function Carousel({ slideIdx }) {
  const slideRef = useRef(null);

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(+${slideIdx}00%)`;
  },[slideIdx])
  
  return (
    <CarouselWrapper>
      <CarouselUl>
        <CarouselLi ref={slideRef} idx={slideIdx}/>
      </CarouselUl>
    </CarouselWrapper>
  )
}

export default Carousel;