const onClickNaverPay = (cartItems, totalPrice) => {
  const oPay = window.Naver.Pay.create({
    mode: "production",
    clientId: `${process.env.REACT_APP_CLIENT_ID}`,
  });

  const createProductName = () => {
    if (cartItems.length > 1) {
      return `${cartItems[0].title} ${cartItems.length} 개`;
    } else {
      return `${cartItems.title} `;
    }
  };

  oPay.open({
    merchantUserKey: `${process.env.REACT_MERCHANT_USER_KEY}`,
    merchantPayKey: `${process.env.REACT_MERCHANT_PAY_KEY}`,
    productName: createProductName(),
    totalPayAmount: totalPrice, // ! 총 지불 금액
    taxScopeAmount: 0, // !  과세 금액
    taxExScopeAmount: totalPrice, //! 비과세 금액
    returnUrl: `${process.env.REACT_APP_API}/cart`,
  });
};

export default onClickNaverPay;
