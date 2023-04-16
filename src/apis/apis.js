import db from "../Firebase";
import { ref, get } from "firebase/database";

export const getProducts = async () => {
  const productsRef = ref(db, "products");
  const snapshot = await get(productsRef, "value");

  if (!snapshot.exists()) {
    throw new Error("No products found");
  }
  const products = [];
  snapshot.forEach((childSnapshot) => {
    const product = childSnapshot.val();
    products.push(product);
  });
  return products;
};

export const getDetailProducts = async (id) => {
  const productsRef = ref(db, `detail/${id}`);
  const snapshot = await get(productsRef);

  if (!snapshot.exists()) {
    throw new Error("상품의 상세페이지를 불러올 수 없습니다.");
  }

  const data = snapshot.val();
  return data;
};

export const getCartItem = async (id) => {
  const productsRef = ref(db, "cart_items/U01");
  const snapshot = await get(productsRef);

  if (!snapshot.exists()) {
    throw new Error("장바구니 정보를 불러올 수 없습니다.");
  }
  const cartItems = [];
  snapshot.forEach((childSnapshot) => {
    const product = childSnapshot.val();
    cartItems.push(product);
  });
  return cartItems;
};
