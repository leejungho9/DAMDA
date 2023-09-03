import React from "react";
import Button from "./Button/Button";
import useCartPrice from "../hooks/useCartPrice";
import { useSelector } from "react-redux";
import { onClickPayment } from "../utils/openPayMent";

const Payment = React.memo(({ cartItems }) => {
  const { discountPrice, totalPrice } = useCartPrice(cartItems);
  const { user } = useSelector((state) => state.user);

  return (
    <Button
      onClick={() => onClickPayment(cartItems, discountPrice, totalPrice, user)}
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
