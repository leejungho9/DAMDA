import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";
import { ref, get, set, query } from "firebase/database";
import { addCartItem } from "../reducers/cartSlice";

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

//! 장바구니 추가 함수
export const AddCartHandler = async (item, quantity, dispatch) => {
  // ! 비로그인 장바구니 사용 x
  const userId = sessionStorage.getItem("userId");

  if (userId === null) {
    navigator("/login");
    return;
  }
  let check = await checkCart(item.pid);
  if (check) {
    alert("이미 장바구니에 추가된 상품입니다.");
  } else {
    const data = {
      pid: Number(item.pid),
      title: item.title,
      company: item.company,
      quantity: quantity,
      url: item.url,
      price: item.price,
      discount: Number(item.discount),
    };

    dispatch(addCartItem({ data, userId }));
    alert("상품이 정상적으로 장바구니에 담겼습니다.");
  }
};

export const checkCart = async (id) => {
  const userId = sessionStorage.getItem("userId");
  // ! 장바구니 상품 중복 체크
  try {
    const cartItems = await getCartItem(userId);
    return cartItems.some((item) => Number(item.pid) === Number(id));
  } catch (error) {
    console.log(error);
  }
};
