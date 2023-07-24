import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../apis/apis";
import { removeMultipleCartItems, setCartItem } from "../../reducers/cartSlice";
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";
import CartList from "../CartList/CartList";
import PriceFormat from "../../hooks/PriceFormat";
const CartBox = styled.div`
  min-height: 400px;
  margin-bottom: 85px;
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

const ButtonBox = styled.div`
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
    span {
      cursor: pointer;
    }
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
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems || []);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderNowMode, setOrderNowMode] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const userId = user.userId;
  useEffect(() => {
    if (location.pathname === "/orders") {
      setOrderNowMode(true);
    }
    // * getCartItem : 카트 아이템 가져오기
    const getCartItemFunc = async () => {
      try {
        const cartItems = await getCartItem(userId);

        dispatch(setCartItem(cartItems));
      } catch (error) {
        console.error(error);
      }
    };
    getCartItemFunc();
  }, [userId, dispatch, location]);

  useEffect(() => {
    // * CartItem 총 금액 구하기
    if (cartItems.length > 0) {
      const newTotalPrice = cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
      // * CartItem 총 할인금액 구하기
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

  const onClickNaverPayButton = () => {
    const oPay = window.Naver.Pay.create({
      mode: "production",
      clientId: process.env.REACT_APP_CLIENT_ID,
    });
    oPay.open({
      merchantUserKey: "DAMDA123",
      merchantPayKey: "123456789",
      productName: `${cartItems[0].title} 외 ${cartItems.length} 개`,
      totalPayAmount: totalPrice, // ? 총 결제금액
      taxScopeAmount: 0, // ? 과세금액
      taxExScopeAmount: totalPrice,
      returnUrl: `${process.env.REACT_APP_API}/cart`,
    });
  };

  const [checkItems, setCheckItems] = useState([]);
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArr = [];
      cartItems.forEach((el) => idArr.push(el.pid));
      setCheckItems(idArr);
    } else {
      setCheckItems([]);
    }
  };

  const handleRemoveCheck = () => {
    dispatch(removeMultipleCartItems({ userId, checkItems }));
  };

  return (
    <CartBox>
      {!orderNowMode && (
        <>
          <TableHeader>
            <tbody>
              <tr>
                <td className="t_1">
                  <input
                    type="checkbox"
                    id="allCheck"
                    onChange={(event) => handleAllCheck(event.target.checked)}
                    checked={
                      checkItems.length === cartItems.length ? true : false
                    }
                  />
                </td>
                <td className="t_2">
                  <label htmlFor="allCheck">전체선택</label>
                </td>
                <td className="t_3" onClick={() => handleRemoveCheck()}>
                  <span>선택삭제</span>
                </td>
              </tr>
            </tbody>
          </TableHeader>
          <hr />
        </>
      )}
      <CartContext>
        <TableBody>
          <CartList
            cartItems={cartItems}
            orderNowMode={orderNowMode}
            checkItems={checkItems}
            setCheckItems={setCheckItems}
          />
        </TableBody>
        <OrderContainer>
          <OrderBox>
            <OrderInfoSpan>
              상품 금액
              <OrderInfoPriceSpan>{PriceFormat(totalPrice)}</OrderInfoPriceSpan>
            </OrderInfoSpan>
            <OrderInfoSpan>
              상품 할인금액
              <OrderInfoPriceSpan>
                {PriceFormat(discountPrice)}
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
                {PriceFormat(totalPrice - discountPrice)}
              </OrderInfoPriceSpan>
            </OrderInfoSpan>
          </OrderAmountContainer>
          {!orderNowMode && (
            <>
              <ButtonBox>
                <Button
                  color="#F28C3A"
                  width={316}
                  height={55}
                  radius={10}
                  className="orderButton"
                  link={true}
                  fontSize={14}
                  href={"/orders"}
                >
                  바로 주문하기
                </Button>
              </ButtonBox>
              <ButtonBox>
                <Button
                  color={`#01C73C`}
                  width={316}
                  height={55}
                  radius={10}
                  onClick={onClickNaverPayButton}
                  className="orderButton"
                  icon={true}
                  fontSize={14}
                >
                  네이버 페이
                </Button>
              </ButtonBox>
            </>
          )}
        </OrderContainer>
      </CartContext>
    </CartBox>
  );
};

export default ShoppingCart;
