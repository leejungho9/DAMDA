import React from "react";
import styled from "styled-components";
import QuantityCounts from "../Counts/QuantityCounts";
const ProductImg = styled.img`
  width: 68px;
  height: 68px;
  padding: 18px 0;
`;

const CartItem = () => {
  return (
    <tr>
      <td className="t_1">
        <input type="checkbox" />
      </td>
      <td className="t_2">
        <ProductImg
          src={`${process.env.PUBLIC_URL}/images/shopDetail/shop_detail01.jpg`}
          alt="장바구니 이미지"
        />
      </td>
      <td className="t_3">
        허니순 <br />
        꿀진담 2종 세트
      </td>
      <td className="t_4">
        <QuantityCounts />
      </td>
      <td className="t_5">150,000</td>
      <td className="t_6">X</td>
    </tr>
  );
};

export default CartItem;
