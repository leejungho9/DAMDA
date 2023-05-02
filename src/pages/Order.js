import React from "react";
import styled from "styled-components";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import Button from "../components/Button/Button";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
import { TfiClose } from "react-icons/tfi";
const OrderContainer = styled.div`
  margin: 0 auto;
  width: 1300px;
  position: relative;
  hr {
    margin-top: 10px;
    color: #b5b5b6;
  }
`;

const OrderTitleH1 = styled.h1`
  font-weight: 800;
  font-size: 18px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 60px;
  font-family: "LINESeedKR-Bd";
`;

const OrdererContainer = styled.div`
  hr {
    margin-top: 10px;
    width: 600px;
    color: #b5b5b6;
  }
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
`;

const OrderMenuSpan = styled.span`
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
  font-weight: bold;
  padding-left: 20px;
  color: #3e3e3e;
`;

const OrderBox = styled.div``;

const OrderInfoBox = styled.div`
  margin-top: 12px;

  &:first-of-type {
    margin-top: 24px;
  }
`;

const PaymentInfoBox = styled.div`
  margin-top: 30px;
  &:first-of-type {
    margin-top: 24px;
  }
`;
const OrderInfoSpanBox = styled.div`
  width: 100px;
  display: inline-block;
  padding-left: 40px;
`;

const OrderInfolabel = styled.label`
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
  color: #3e3e3e;
`;

const OrderInfoSapn = styled.span`
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
  color: #3e3e3e;
`;

const OrdererInfoInput = styled.input`
  width: 240px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid #b5b5b6;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
  font-family: "LINESeedKR-Rg";
  font-size: 14px;
`;

const OrderButton = styled.button`
  width: 80px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid #b5b5b6;
  background-color: #fff;
  font-family: "LINESeedKR-Rg";
  margin-left: 20px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: #f28c3a;
    border: 1px solid #f28c3a;
  }
`;

const PaymentInputRadio = styled.input`
  margin-right: 20px;
  appearance: none;
  background-color: #ffff;
  border: 1px solid #3e3e3e;
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-left: 40px;
  &:checked {
    border: 3px solid #f28b39;
    cursor: pointer;
  }
`;

const PointInput = styled.input`
  width: 60px;
  outline: none;
  height: 35px;
  font-family: "LINESeedKR-Bd";
  color: #3e3e3e;
  border: none;
  font-size: 14px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

const DaumPostcodeContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 32%;
  width: 500px;
  height: 600px;
  z-index: 100;
  display: block;
  background-color: red;
  border: 1px solid #363636;
`;

const DaumPostcodeHeader = styled.div`
  height: 50px;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 15px;
`;
const DaumPostClsoeButton = styled(TfiClose)`
  width: 15px;
  height: 15px;
  color: #000;
  cursor: pointer;
`;
const Order = () => {
  const DaumPostStyle = {
    width: "500px",
    height: "550px",
  };

  const [daumPostModal, setDaumPostModal] = useState(false);
  const onCompleteAdress = (e) => {
    console.log(e);
    setAddress(e.address);
    setDaumPostModal(false);
  };

  const [address, setAddress] = useState("");
  return (
    <OrderContainer>
      {daumPostModal && (
        <DaumPostcodeContainer>
          <DaumPostcodeHeader>
            <DaumPostClsoeButton onClick={() => setDaumPostModal(false)} />
          </DaumPostcodeHeader>
          <DaumPostcode onComplete={onCompleteAdress} style={DaumPostStyle} />
        </DaumPostcodeContainer>
      )}
      <OrderTitleH1>주문하기</OrderTitleH1>
      <OrderMenuSpan>주문상품</OrderMenuSpan>
      <hr />
      <ShoppingCart />
      <OrdererContainer>
        <OrderBox>
          <OrderMenuSpan>주문자 정보</OrderMenuSpan>
          <hr />
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="name">이름</OrderInfolabel>
            </OrderInfoSpanBox>
            <OrdererInfoInput type="text" id="name" />
          </OrderInfoBox>
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="phone">전화번호</OrderInfolabel>
            </OrderInfoSpanBox>
            <OrdererInfoInput type="text" id="phone" />
          </OrderInfoBox>
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="email">이메일</OrderInfolabel>
            </OrderInfoSpanBox>
            <OrdererInfoInput type="text" id="email" />
          </OrderInfoBox>
        </OrderBox>
        <OrderBox>
          <OrderMenuSpan>할인/적립 사용</OrderMenuSpan>
          <hr />
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfoSapn>사용가능쿠폰</OrderInfoSapn>
            </OrderInfoSpanBox>
            <OrderInfoSapn>10개</OrderInfoSapn>
          </OrderInfoBox>
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfoSapn>적립금</OrderInfoSapn>
            </OrderInfoSpanBox>
            <PointInput type="text" id="point" />
            <OrderInfoSapn> 원</OrderInfoSapn>
            {/*  !버튼 사용 고민중 */}
            {/* <OrderButton>사용하기</OrderButton> */}
          </OrderInfoBox>
        </OrderBox>
      </OrdererContainer>
      <OrdererContainer>
        <OrderBox>
          <OrderMenuSpan>배송지 정보</OrderMenuSpan>
          <hr />
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="receiverName">이름</OrderInfolabel>
            </OrderInfoSpanBox>
            <OrdererInfoInput type="text" id="receiverName" />
          </OrderInfoBox>
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="receiverPhone">전화번호</OrderInfolabel>
            </OrderInfoSpanBox>
            <OrdererInfoInput type="text" id="receiverPhone" />
          </OrderInfoBox>
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="receiverAddress">주소</OrderInfolabel>
            </OrderInfoSpanBox>
            <OrdererInfoInput
              type="text"
              id="receiverAddress"
              value={address}
            />
            <OrderButton onClick={() => setDaumPostModal(true)}>
              주소검색
            </OrderButton>
          </OrderInfoBox>
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfoSapn></OrderInfoSapn>
            </OrderInfoSpanBox>
            <OrdererInfoInput type="text" />
          </OrderInfoBox>
          <OrderInfoBox>
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="request">요청사항</OrderInfolabel>
            </OrderInfoSpanBox>
            <OrdererInfoInput type="text" id="request" />
          </OrderInfoBox>
        </OrderBox>
        <OrderBox>
          <OrderMenuSpan>결제수단</OrderMenuSpan>
          <hr />
          <PaymentInfoBox>
            <PaymentInputRadio type="radio" name="payment" id="creditCard" />
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="creditCard">신용카드</OrderInfolabel>
            </OrderInfoSpanBox>
          </PaymentInfoBox>
          <PaymentInfoBox>
            <PaymentInputRadio
              type="radio"
              name="payment"
              id="accountTransfer"
            />
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="accountTransfer">
                계좌이체
              </OrderInfolabel>
            </OrderInfoSpanBox>
          </PaymentInfoBox>
          <PaymentInfoBox>
            <PaymentInputRadio
              type="radio"
              name="payment"
              id="virtualAccount"
            />
            <OrderInfoSpanBox>
              <OrderInfolabel htmlFor="virtualAccount">가상계좌</OrderInfolabel>
            </OrderInfoSpanBox>
          </PaymentInfoBox>
        </OrderBox>
      </OrdererContainer>
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
    </OrderContainer>
  );
};

export default Order;
