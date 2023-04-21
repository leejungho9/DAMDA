import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../apis/apis";
import { setCartItem } from "../reducers/cartSlice";

const CartContainer = styled.div`
  margin: 0 auto;
  width: 1300px;
`;

const CartTitle = styled.h1`
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 60px;
`;

const CartBox = styled.div`
  height: 500px;

  table input[type="checkbox"] {
    width: 60px;
    margin: 20px 0;
  }
`;

const CartContext = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: px;
`;

const OrderContainer = styled.div`
  margin-top: 35px;
`;

const OrderBox = styled.div`
  padding: 13px 50px;
  border: 1px solid #b5b5b6;
  width: 316px;
  height: 170px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  margin-bottom: 15px;
`;

const OrderAmountContainer = styled.div`
  padding: 0 50px;
  border: 1px solid #b5b5b6;
  width: 316px;
  height: 55px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  margin-bottom: 15px;
`;

const OrderInfoSpan = styled.span`
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
  padding: 13px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const OrderInfoPriceSpan = styled.span`
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
  box-sizing: border-box;
`;

const TableHeader = styled.table`
  text-align: left;
  font-family: "LINESeedKR-Rg";
  font-size: 14px;

  .t_1 {
    width: 50px;
  }
  .t_2 {
    width: 50%;
  }
  .t_3 {
    width: 50%;
  }
`;
const TableBody = styled.table`
  text-align: center;
  font-family: "LINESeedKR-Rg";
  font-size: 14px;
  min-width: 960px;
  .t_1 {
    width: 50px;
  }
  .t_2 {
    width: 100px;
    text-align: left;
  }
  .t_3 {
    width: 254px;
    text-align: left;
  }
  .t_4 {
    width: 105px;
  }
  .t_5 {
    width: 137px;
  }
  .t_6 {
    width: 300px;
    text-align: left;
    padding-left: 50px;
    box-sizing: border-box;
  }
`;
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems || []);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const priceFormatting = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const setCartItemFunc = async () => {
      try {
        const cartItems = await getCartItem();
        dispatch(setCartItem(cartItems));
      } catch (error) {
        console.error(error);
      }
    };
    setCartItemFunc();
  }, [dispatch]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const newTotalPrice = cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
      let result = 0;
      cartItems.map((el) => {
        let buyPrice = Math.floor(el.price * (el.discount / 100) * el.quantity);
        result += buyPrice;
        return result;
      });

      setDiscountPrice(result);
      setTotalPrice(newTotalPrice);
    }
  }, [cartItems]);

  return (
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      <CartBox>
        <TableHeader>
          <tbody>
            <tr>
              <td className="t_1">
                <input type="checkbox" />
              </td>
              <td className="t_2">전체선택</td>
              <td className="t_3"> 전체삭제</td>
            </tr>
          </tbody>
        </TableHeader>
        <hr />
        <CartContext>
          <TableBody>
            <CartItem cartItems={cartItems} />
          </TableBody>
          <OrderContainer>
            <OrderBox>
              <OrderInfoSpan>
                상품 금액
                <OrderInfoPriceSpan>
                  {priceFormatting(totalPrice)}
                </OrderInfoPriceSpan>
              </OrderInfoSpan>
              <OrderInfoSpan>
                상품 할인금액
                <OrderInfoPriceSpan>
                  {priceFormatting(discountPrice)}
                </OrderInfoPriceSpan>
              </OrderInfoSpan>
              <OrderInfoSpan>
                배송비 <OrderInfoPriceSpan>3,500</OrderInfoPriceSpan>
              </OrderInfoSpan>
            </OrderBox>
            <OrderAmountContainer>
              <OrderInfoSpan>
                결정예정금액
                <OrderInfoPriceSpan>
                  {priceFormatting(totalPrice - discountPrice)}
                </OrderInfoPriceSpan>
              </OrderInfoSpan>
            </OrderAmountContainer>
            <OrderAmountContainer>
              <OrderInfoSpan>바로 주문하기</OrderInfoSpan>
            </OrderAmountContainer>
            <OrderAmountContainer>
              <OrderInfoSpan>네이버 페이</OrderInfoSpan>
            </OrderAmountContainer>
          </OrderContainer>
        </CartContext>
      </CartBox>
    </CartContainer>
  );
};

export default Cart;
