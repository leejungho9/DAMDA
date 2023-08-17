import React from "react";
import Button from "./Button/Button";
import useCartPrice from "../hooks/useCartPrice";
import { useSelector } from "react-redux";

const Payment = React.memo(({ cartItems }) => {
  const { discountPrice, totalPrice } = useCartPrice(cartItems);
  const { user } = useSelector((state) => state.user);
  const formatName = (cartItems) => {
    return cartItems.length > 1
      ? `${cartItems[0].title} 외 + ${cartItems.length}`
      : `${cartItems[0].title}`;
  };
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init(`${process.env.REACT_APP_IMP}`);
    const data = {
      pg: `${process.env.REACT_PAYMENT_PG}`, // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: totalPrice - discountPrice, // 결제금액
      name: formatName(cartItems), // 주문명
      buyer_name: user.name, // 구매자 이름
      buyer_tel: user.phone, // 구매자 전화번호
      buyer_email: user.email, // 구매자 이메일
      buyer_addr: user.address, // 구매자 주소
      buyer_postcode: "12333", // 구매자 우편번호
    };
    IMP.request_pay(data, callback);
  };
  const callback = (response) => {
    const { success, error_msg } = response;
    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };
  return (
    <Button
      onClick={onClickPayment}
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
  );
});

export default Payment;
