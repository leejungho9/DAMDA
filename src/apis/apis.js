import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";
import { ref, get, set, query } from "firebase/database";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userSlice";

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

export const getDetailImage = async (pid) => {
  const productsRef = ref(db, `detail`);
  const snapshot = await get(productsRef);

  if (!snapshot.exists()) {
    throw new Error("상품의 상세이미지를 불러올 수 없습니다.");
  }
  const data = snapshot.val();
  const product = Object.values(data).find((item) => item.pid === Number(pid));
  return product;
};

export const getDetailItem = async (pid) => {
  const productsRef = ref(db, `products`);
  const snapshot = await get(productsRef);

  if (!snapshot.exists()) {
    throw new Error("상품의 상세정보를 불러올 수 없습니다.");
  }
  const data = snapshot.val();
  const product = Object.values(data).find((item) => item.pid === Number(pid));
  return product;
};

export const getWishItem = async (id) => {
  const productsRef = ref(db, "wish_items/" + id);
  const snapshot = await get(productsRef);

  if (!snapshot.exists()) {
    return null;
  }
  const wishItems = [];
  snapshot.forEach((childSnapshot) => {
    const product = childSnapshot.val();
    wishItems.push(product);
  });

  return wishItems;
};

export const getCartItem = async (id) => {
  const productsRef = ref(db, "cart_items/" + id);
  const snapshot = await get(productsRef);

  if (!snapshot.exists()) {
    return null;
  }
  const cartItems = [];
  snapshot.forEach((childSnapshot) => {
    const product = childSnapshot.val();
    cartItems.push(product);
  });

  return cartItems;
};

// ! signup
export const postSignup = async (userInfo) => {
  const data = {
    coupon: {},
    point: 3000,
    userId: userInfo.uId,
    email: userInfo.email,
    name: userInfo.name,
    phone: userInfo.phone,
    address: userInfo.address,
    detailAddress: userInfo.detailAddress,
  };
  set(ref(db, "users/" + userInfo.uId), data);
};

// !login
export const getUser = async (userId) => {
  const queryRef = query(ref(db, "users/" + userId));
  const snapshot = await get(queryRef);
  return snapshot.val();
};

// ! 현재 로그인한 사용자 정보 가져오기 (혹시 모르니 남겨두기)

export const CheckLoginUserInfo = async () => {
  const auth = getAuth();

  const getLoggedInUserId = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(null);
      }
    });
  });
  if (getLoggedInUserId) {
    const userId = await getLoggedInUserId;
    const userInfo = await getUser(userId);
    return userInfo;
  } else {
    return undefined;
  }
};
