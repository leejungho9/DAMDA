import React from "react";
import styled from "styled-components";
import QuantityCounts from "../Counts/QuantityCounts";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../reducers/cartSlice";
import { IoMdClose } from "react-icons/io";
import PriceFormat from "../../hooks/PriceFormat";
const ProductImg = styled.img`
  width: 68px;
  height: 68px;
  padding: 18px 0;
`;

const CloseIcon = styled(IoMdClose)`
  cursor: pointer;
  &:hover {
    color: #f28b39;
  }
`;

const CartItem = ({ orderNowMode, item }) => {
  const dispatch = useDispatch();
  const onRemoveCartItem = (pid) => {
    dispatch(removeCartItem(pid));
  };

  return (
    <tr key={item.pid}>
      <td className="t_1">
        <input type="checkbox" />
      </td>
      <td className="t_2">
        <Link to={`/shop/${item.pid}`}>
          <ProductImg
            src={`${process.env.PUBLIC_URL}/${item.url}`}
            alt="장바구니 이미지"
          />
        </Link>
      </td>

      <td className="t_3">
        {item.company}
        <br />
        {item.name}
      </td>
      <td className="t_4">
        <QuantityCounts
          quantity={item.quantity}
          pid={item.pid}
          orderNowMode={orderNowMode}
        />
      </td>
      <td className="t_5">{PriceFormat(item.price)}</td>
      <td className="t_6" onClick={() => onRemoveCartItem(item.pid)}>
        <CloseIcon />
      </td>
    </tr>
  );
};

export default CartItem;
