import React,{ useRef,useState,useEffect } from "react";
import styled from "styled-components";
import data from "../assets/data/BestreviewData.json"
import Carousel from "./Carousel";

const ReviewTitle = styled.div`
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

const ReviewCard = styled.div`
  li:nth-child(2){
    padding-right: 25px;
  }
  dl, li, menu, ol, ul {
    list-style: none;
  }
  * {
  padding: 0;
  margin: 0;
  }
  display: flex;
  justify-content: center;
`;
const ReviewImg = styled.img`
    border-radius: 15px;
    width: 610px;
    height: 400px;
`;
const ReviewLi = styled.li`
  padding-left: 25px;
`;
const ReviewUl = styled.ul`
  display: flex;
  flex-direction: row;
  padding-top: 65px;
  width: 100%;
  transition: all 0.5s;
`;
const ReviewDecription = styled.span`
  font-family: "LINESeedKR-Rg";
  display: flex;
  flex-direction: column;
  padding: 40px 25px 0 25px;
`;
const ItemName = styled.span`
  font-family: "LINESeedKR-Rg";
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;
const ItemTitle = styled.span`
  font-family: "LINESeedKR-Rg";
  padding-top: 30px;
  font-size: 16px;
`;
const ItemComment = styled.span`
  font-family: "LINESeedKR-Rg";
  padding: 7px 0;
  font-size: 16px;
  margin-top: 10px;
`;
const SliderContainer = styled.div`
  max-width: 1300px;
  display: flex;
`;

function BestReview() {
  const slideRef = useRef(null);
  const ulRef = useRef([]);
  const [slideIdx,setSlideIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => {
        nextSlide()
    },5000
    )
    return () => {
        clearInterval(timer)
    }
  }, [slideIdx])

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${slideIdx}00%)`;
    ulRef.current.map((el,index) => {
      if(slideIdx === index) {
        ulRef.current[slideIdx].style.opacity = `1`
      }
      else {
        ulRef.current[index].style.opacity = `0`
      }
    })

  },[slideIdx])

  const nextSlide = () => {
    if(slideIdx < 2) {
      setSlideIdx(slideIdx+1)
    } 
    else if(slideIdx >= 2) {
      setSlideIdx(0)
    }
  }

  const createdCard = data.data.map((el,index) => {
    return (
        <ReviewLi key={el.id}>
          <ReviewImg src={el.url} />
          <ReviewDecription>
              <ItemName>
                <strong>{el.name}</strong>
                <span>
                  <strong>{el.score}</strong> / 5.0
                </span>
              </ItemName>
              <ItemTitle>{el.item_title}</ItemTitle>
                <ItemComment>{el.comment}</ItemComment>
          </ReviewDecription>
        </ReviewLi>
    )
  })
  return (
    <>
      <ReviewTitle><span>BEST REVIEW</span></ReviewTitle>
      <ReviewCard>
        <SliderContainer idx={slideIdx} ref={slideRef}>
          <ReviewUl ref={ref => (ulRef.current[0] = ref)}>{createdCard}</ReviewUl>
          <ReviewUl ref={ref => (ulRef.current[1] = ref)}>{createdCard}</ReviewUl>
          <ReviewUl ref={ref => (ulRef.current[2] = ref)}>{createdCard}</ReviewUl>
        </SliderContainer>
      </ReviewCard>
      <Carousel slideIdx={slideIdx}/>
    </>
  )
}

export default BestReview;