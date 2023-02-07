import React,{ useRef,useState,useEffect } from "react";
import styled from "styled-components";
import data from "../assets/data/BestsellerData.json"
import Carousel from "./Carousel";

const SellerTitle = styled.div`
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

const SellerCard = styled.div`
  li:nth-child(3){
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
const SellerImg = styled.img`
    border-radius: 15px;
    width: 400px;
    height: 480px;
`;
const SellerLi = styled.li`
  padding-left: 25px;
`;
const SellerUl = styled.ul`
  display: flex;
  flex-direction: row;
  padding-top: 65px;
  width: 100%;
  transition: all 0.5s;
`;
const SellerDecription = styled.span`
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
const ItemDiscount = styled.span`
  font-family: "LINESeedKR-Rg";
  padding: 7px 0;
  font-size: 16px;
`;
const DecriptionPrice = styled.span`
  font-family: "LINESeedKR-Rg";
  padding-right: 16px;
  font-size: 15px;
`;
const DiscountPrice = styled.span`
  font-family: "LINESeedKR-Bd";
  padding-right: 16px;
  font-size: 16px;
  color: #f28b39;
`;
const SliderContainer = styled.div`
  max-width: 1300px;
  display: flex;
`;

function BestSeller() {
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
    let buyPrice = (el.price*(el.discount/100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let realPrice = el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (
        <SellerLi key={el.id}>
          <SellerImg src={el.url} />
          <SellerDecription>
              <ItemName>
                <strong>{el.name}</strong>
                <span>
                  <strong>{el.score}</strong> / 5.0
                </span>
              </ItemName>
              <ItemTitle>{el.item_title}</ItemTitle>
                <ItemDiscount>{el.discount}%</ItemDiscount>
                <span><DiscountPrice>{buyPrice}</DiscountPrice><DecriptionPrice>{realPrice}</DecriptionPrice></span>
          </SellerDecription>
        </SellerLi>
    )
  })
  return (
    <>
      <SellerTitle><span>BEST SELLER</span></SellerTitle>
      <SellerCard>
        <SliderContainer idx={slideIdx} ref={slideRef}>
          <SellerUl ref={ref => (ulRef.current[0] = ref)}>{createdCard}</SellerUl>
          <SellerUl ref={ref => (ulRef.current[1] = ref)}>{createdCard}</SellerUl>
          <SellerUl ref={ref => (ulRef.current[2] = ref)}>{createdCard}</SellerUl>
        </SliderContainer>
      </SellerCard>
      <Carousel slideIdx={slideIdx}/>
    </>
  )
}

export default BestSeller;