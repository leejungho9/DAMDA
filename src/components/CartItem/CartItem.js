import React, { useEffect } from "react";
import styled from "styled-components";
import QuantityCounts from "../Counts/QuantityCounts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../apis/apis";
import { setCartItems } from "../../reducers/cartSlice";

const ProductImg = styled.img`
  width: 68px;
  height: 68px;
  padding: 18px 0;
`;

const CartItem = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const setCartItemsFunc = async () => {
      try {
        const cartItems = await getCartItem();
        dispatch(setCartItems(cartItems));
      } catch (error) {
        console.error(error);
      }
    };
    setCartItemsFunc();
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cartItems || []);

  const priceFormatting = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      {cartItems.map((item) => (
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
            <QuantityCounts quantity={item.quantity} pid={item.pid} />
          </td>
          <td className="t_5">{priceFormatting(item.price)}</td>
          <td className="t_6">X</td>
        </tr>
      ))}
    </>
  );
};

export default CartItem;
