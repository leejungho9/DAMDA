import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";
import {
  ref,
  get,
  set,
  query,
  orderByChild,
  equalTo,
  update,
  remove,
  push,
} from "firebase/database";
import { addCartItem } from "../reducers/cartSlice";
import { addWishItem } from "../reducers/wishSlice";
import { login } from "../reducers/userSlice";

export const getProducts = async () => {
  const productsRef = ref(db, "products");
  const snapshot = await get(productsRef, "value");

  if (!snapshot.exists()) {
    throw new Error("No products found");
  }
  const productItems = Object.values(snapshot.val());
  return productItems;
};

export const getDetailImage = async (pid) => {
  const queryRef = query(
    ref(db, "detail"),
    orderByChild("pid"),
    equalTo(Number(pid))
  );

  const snapshot = await get(queryRef);
  const detail = snapshot.val();

  if (detail) {
    const key = Object.keys(detail);
    const productRef = ref(db, `detail/${key}/url`);
    const snapshot = await get(productRef);

    const detailImages = Object.values(snapshot.val());

    return detailImages;
  }
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
  const wishItems = Object.values(snapshot.val());
  return wishItems;
};

export const getCartItem = async (id) => {
  const productsRef = ref(db, "cart_items/" + id);
  const snapshot = await get(productsRef);

  if (!snapshot.exists()) {
    return null;
  }
  const cartItems = Object.values(snapshot.val());
  return cartItems;
};

export const getPromotions = async () => {
  const promotionsRef = ref(db, "promotions/");
  const snapshot = await get(promotionsRef);

  const promotionItems = Object.values(snapshot.val());
  return promotionItems;
};

export const getBrands = async () => {
  const brandsRef = ref(db, "brand/");
  const snapshot = await get(brandsRef);

  const brandItems = Object.values(snapshot.val());
  return brandItems;
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
export const AddCart = async (item, quantity, dispatch, userId) => {
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

export const AddWish = async (item, quantity, dispatch, userId) => {
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
export const addCoupon = async (couponId, userId, dispatch) => {
  const check = await CheckCoupon(couponId, userId);
  if (check) {
    alert("이미 받은 쿠폰입니다.");
  } else {
    const data = {
      couponId: couponId,
      couponName: " 웰컴쿠폰10%",
      discount: 10,
      status: false,
    };

    dispatch(login({ user: { coupon: data } }));
    set(ref(db, "users/" + userId + "/coupon/" + couponId), data);
    alert("쿠폰이 정상적으로 발급되었습니다.");
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
// ! 조회수 증가
export const plusViews = async (pid) => {
  const queryRef = query(
    ref(db, "products/"),
    orderByChild("pid"),
    equalTo(Number(pid))
  );

  get(queryRef).then((snapshot) => {
    const product = snapshot.val();
    const key = Object.keys(product);
    if (product) {
      const productRef = ref(db, `products/${key}`);
      update(productRef, { views: product[key].views + 1 });
    }
  });
};

//! 리뷰작성하기
export const addReview = async (
  pid,
  reviewScore,
  reviewContent,
  userId,
  userName
) => {
  const reviewItems = await getReviewLengths(pid);
  const data = {
    reviewId: reviewItems.length + 1,
    userId: userId,
    pid: Number(pid),
    userName: userName,
    reviewScore: reviewScore,
    reviewContent: reviewContent,
    like: 3,
  };
  const reviewRef = ref(db, "products/product" + pid + "/reviews/");
  const newReviewRef = push(reviewRef);
  set(newReviewRef, data);

  const reviewRefs = ref(db, `reviews/`);
  const newReviewRefs = push(reviewRefs);
  set(newReviewRefs, data);
};

// ! 리뷰 길이 가져오기
export const getReviewLengths = async () => {
  const reviewRef = ref(db, `reviews/`);
  const snapshot = await get(reviewRef);
  const reviewItems = Object.values(snapshot.val());
  return reviewItems;
};

// ! 리뷰 가져오기
export const getReviews = async (pid) => {
  const queryRef = query(
    ref(db, "reviews/"),
    orderByChild("pid"),
    equalTo(Number(pid))
  );

  const snapshot = await get(queryRef);
  const reviewItems = Object.values(snapshot.val());
  return reviewItems;
};

//!리뷰 삭제
export const removeReview = async (reviewId, pid) => {
  const queryRef = query(
    ref(db, "reviews/"),
    orderByChild("reviewId"),
    equalTo(Number(reviewId))
  );

  const queryRef2 = query(
    ref(db, "products/product" + pid + "/reviews/"),
    orderByChild("reviewId"),
    equalTo(Number(reviewId))
  );

  await get(queryRef).then((childSnapshot) => {
    const reviews = childSnapshot.val();
    const key = Object.keys(reviews);
    const reviewRef = ref(db, `reviews/${key}`);
    remove(reviewRef);
  });

  await get(queryRef2).then((childSnapshot) => {
    const reviews = childSnapshot.val();
    const key = Object.keys(reviews);
    const reviewRef = ref(db, `products/product${pid}/reviews/${key}`);

    remove(reviewRef);
  });
};
