import React from "react";
import PromotionItems from "../PromotionItem/PromotionItems";

const PromotionList = ({ items }) => {
  return (
    items &&
    items.map((item) => <PromotionItems item={item} key={item.promotionId} />)
  );
};

export default PromotionList;
