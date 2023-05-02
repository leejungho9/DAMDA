const PriceFormat = (price) => {
  // * 금액표기 (,) 함수
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default PriceFormat;
