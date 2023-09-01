import styled from "styled-components";
import ProductItem from "../ProductItem/ProductItem";

const ItemWrapper = styled.ul`
  position: relative;
  left: 74px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 90px;
  width: 1024px;
`;

const ItemContainer = styled.li`
  padding-right: 25px;
  padding-bottom: 90px;
`;

function ProductList({ isProduct }) {
  return (
    <ItemWrapper>
      {isProduct.map((el) => {
        return (
          <ItemContainer key={el.pid}>
            <ProductItem data={el} />
          </ItemContainer>
        );
      })}
    </ItemWrapper>
  );
}

export default ProductList;
