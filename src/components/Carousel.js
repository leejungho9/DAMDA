import React,{ useRef,useState,useEffect } from "react";
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
  position: fixed;
  background-color: #f28b39;
  width: 80px;
  height: 14px;
  border-radius: 14px;
  cursor: pointer;
  transition: ${(props) => (!props.idx ? '' : 'all 0.5s ease-in-out')};
  transform: ${(props) => `translateX(+` + props.idx * 80 +'px)'};
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

function Carousel() {
  const slideRef = useRef(null);
  const [slideIdx,setSlideIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => {
        nextSlide()
    },2500
    )
    return () => {
        clearInterval(timer)
    }
  }, [slideIdx])

  const nextSlide = () => {
    if(slideIdx < 2) {
      setSlideIdx(slideIdx+1)
    } 
    else if(slideIdx >= 2) {
      setSlideIdx(0)
    }
  }
  
  return (
    <CarouselWrapper>
      <CarouselUl ref={slideRef}>
        <CarouselLi idx={slideIdx}/>
      </CarouselUl>
    </CarouselWrapper>
  )
}

export default Carousel;