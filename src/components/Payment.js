import React, { useEffect, useState } from "react";
import Button from "./Button/Button";

const Payment = ({ cartItems }) => {
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init(`${process.env.REACT_APP_IMP}`);
    const data = {
      pg: "nictest04m", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: totalPrice - discountPrice, // 결제금액
      name:
        cartItems.length > 1
          ? `${cartItems[0].title} 외 + ${cartItems.length}`
          : `${cartItems[0].title}`, // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
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
};

export default Payment;
