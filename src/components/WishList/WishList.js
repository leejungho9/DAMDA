import React from "react";
import WishItem from "../WishItem/WishItem";
const WishList = ({ wishItems, editMode, setCheckItemId, checkItemId }) => {
  return wishItems.length !== 0 ? (
    <>
      {wishItems.map((item, index) => (
        <WishItem
          item={item}
          key={item.pid}
          editMode={editMode}
          setCheckItemId={setCheckItemId}
          checkItemId={checkItemId}
        />
      ))}
    </>
  ) : (
    <p>관심상품이 없습니다.</p>
  );
};

export default WishList;
