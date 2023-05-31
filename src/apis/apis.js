import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";
import { ref, get, set, query, orderByChild, equalTo } from "firebase/database";
import { addCartItem } from "../reducers/cartSlice";
import { addWishItem } from "../reducers/wishSlice";
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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  });
};

//! 장바구니 추가 함수
export const AddCartHandler = async (item, quantity, dispatch, userId) => {
  let check = await CheckCart(item.pid, userId);
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

// ! 장바구니 상품 중복 체크
const CheckCart = async (pid, userId) => {
  try {
    const cartItems = await getCartItem(userId);
    return cartItems.some((item) => Number(item.pid) === Number(pid));
  } catch (error) {
    console.log(error);
  }
};

export const AddWishHandler = async (item, quantity, dispatch, userId) => {
  // ! 비로그인 관심상품 사용 x

  let check = await checkWish(item.pid, userId);

  if (check) {
    alert("이미 관심상품으로 지정된 상품입니다.");
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

    dispatch(addWishItem({ data, userId }));
    alert("상품이 정상적으로 관심상품에 담겼습니다.");
  }
};

// ! 관심상품 중복 체크
const checkWish = async (pid, userId) => {
  try {
    const wishItems = await getWishItem(userId);
    return wishItems.some((item) => Number(item.pid) === Number(pid));
  } catch (error) {
    console.log(error);
  }
};

//! 웰컴 쿠폰 받기
export const addCouponHandler = async (couponId, userId, dispatch) => {
  const check = await CheckCoupon(couponId, userId);
  if (check) {
    alert("이미 받은 쿠폰입니다.");
  } else {
    try {
      const data = {
        couponId: couponId,
        couponName: " 웰컴쿠폰10%",
        discount: 10,
        status: false,
      };

      dispatch(login({ user: { coupon: data } }));
      set(ref(db, "users/" + userId + "/coupon/" + couponId), data);
      alert("쿠폰이 정상적으로 발급되었습니다.");
    } catch (error) {
      console.log(error);
    }
  }
};

//! 웰컴 쿠폰 중복
const CheckCoupon = async (couponId, userId) => {
  try {
    const usersRef = query(
      ref(db, "users/" + userId + "/coupon"),
      orderByChild("couponId"),
      equalTo(couponId)
    );
    const snapshot = await get(usersRef);

    if (snapshot.val()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
