import React from "react";
import styled from "styled-components";
import data from "../assets/data/BestsellerData.json"

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
`;
const SellerImg = styled.img`
    width: 500px;
    height: 660px;
`;
const SellerLi = styled.li`
  padding-left: 25px;
`;
const SellerUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 65px;
  width: 100%;
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
  font-size: 23px;
`;
const ItemTitle = styled.span`
  font-family: "LINESeedKR-Rg";
  padding-top: 45px;
  font-size: 20px;
`;
const ItemDiscount = styled.span`
  font-family: "LINESeedKR-Rg";
  font-size: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
`;
const DecriptionPrice = styled.span`
  font-family: "LINESeedKR-Rg";
  padding-right: 16px;
  font-size: 18px;
`;
const DiscountPrice = styled.span`
  font-family: "LINESeedKR-Bd";
  padding-right: 16px;
  font-size: 20px;
  color: #f28b39;
`;

function BestSeller() {
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
        <SellerUl>{createdCard}</SellerUl>
      </SellerCard>
    </>
  )
}

export default BestSeller;