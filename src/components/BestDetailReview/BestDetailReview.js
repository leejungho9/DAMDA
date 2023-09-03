import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Rate } from "antd";
import { addReview, getReviews } from "../../apis/apis";
import { useSelector } from "react-redux";
import LineBar from "../Common/BorderBar";
import ReviewCarousel from "../Carousel/ReviewCarousel";

const ReviewWrapper = styled.div`
  margin-top: 105px;
`;
const ReviewContainer = styled.div`
  margin-bottom: 45px;
`;
const ReviewTextArea = styled.div`
  margin-bottom: 28px;
  display: flex;
  position: relative;
  align-items: center;
`;
const ReviewTitle = styled.h3`
  font-size: 18px;
  margin-right: 50px;
  font-family: "LINESeedKR-Rg";
`;
const ReviewScope = styled.span`
  font-size: 18px;
  font-family: "LINESeedKR-Rg";
`;
const ReviewContentWrapper = styled.div``;

const BorderBar = styled(LineBar)`
  width: 100%;
  margin-bottom: 30px;
`;
const ReviewWriteButton = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
const ReviewContentInput = styled.textarea`
  height: 150px;
  width: 100%;
  outline: none;
  resize: none;
  border: 1px solid #cdcdcd;
  font-size: 15px;
  padding: 10px;
  box-sizing: border-box;
  font-family: "LINESeedKR-Rg";
`;
const SubmitReviewButtonBox = styled.div`
  position: relative;
  padding: 10px 0;
`;

const SubmitReviewButton = styled.button`
  border: none;
  background: white;
  border-radius: 10px;
  font-size: 15px;
  font-family: "LINESeedKR-Rg";
  position: absolute;
  right: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ReviewContentBox = styled.div`
  display: flex !important;
  width: 650px;
`;

const ReviewContentText = styled.span`
  margin-top: 20px;
  font-size: 16px;
  font-family: "LINESeedKR-Rg";
`;

const BestDetailReview = ({
  pid,
  item,
  reviewWriteMode,
  setReviewWriteMode,
  detailImages,
}) => {
  const [reviewScore, setReviewScore] = useState(2.5);
  const [reviewContent, setReviewContent] = useState("");
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const userId = user.userId;
  const [isReviews, setReviews] = useState([]);
  const [allScore, setAllScore] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const changeReviewHandelr = (event) => {
    setReviewScore(event);
  };

  const changeReviewHandler = (event) => {
    setReviewContent(event.target.value);
  };

  const resetReview = () => {
    setReviewContent("");
    setReviewScore(2.5);
    setReviewWriteMode(false);
  };

  const submitReviewHandler = async () => {
    try {
      await addReview(pid, reviewScore, reviewContent, userId, user.name);
      resetReview();
      alert("리뷰가 정상적으로 작성됐습니다.");

      // ! 작성한 리뷰를 isReviews 배열에 추가
      const newReviewData = {
        reviewId: isReviews.length + 1,
        userId: userId,
        userName: user.name,
        reviewScore: reviewScore,
        reviewContent: reviewContent,
      };
      setReviews([...isReviews, newReviewData]);
    } catch (error) {
      console.log(error);
    }
  };

  //! pid에 대한 리뷰 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getReviews(pid);
        setReviews(reviews);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [pid]);

  //! 평균 평점 점수내는 함수
  useEffect(() => {
    const allScoreHandler = () => {
      if (isReviews.length === 0) {
        setAllScore(0);
      } else {
        const totalScore = isReviews.reduce(
          (sum, review) => sum + review.reviewScore,
          0
        );
        const averageScore = totalScore / isReviews.length;
        setAllScore(Math.round(averageScore * 10) / 10);
      }
    };

    allScoreHandler();
  }, [isReviews]);

  return (
    <ReviewWrapper>
      <ReviewContainer>
        <ReviewTextArea>
          <ReviewTitle>BEST 고객리뷰</ReviewTitle>
          <ReviewScope> {allScore} / 5.0</ReviewScope>
          {isLoggedIn && (
            <ReviewWriteButton>
              {reviewWriteMode ? (
                <AiOutlineMinus onClick={() => setReviewWriteMode(false)} />
              ) : (
                <AiOutlinePlus onClick={() => setReviewWriteMode(true)} />
              )}
            </ReviewWriteButton>
          )}
        </ReviewTextArea>
        <ReviewContentWrapper>
          {isReviews.length === 0 ? (
            <ReviewContentBox>
              <ReviewContentText> 작성된 리뷰가 없습니다.</ReviewContentText>
            </ReviewContentBox>
          ) : (
            <ReviewCarousel
              pid={pid}
              isLoading={isLoading}
              isReviews={isReviews}
              detailImages={detailImages}
              setReviews={setReviews}
            />
          )}
        </ReviewContentWrapper>
      </ReviewContainer>
      <BorderBar />
      {reviewWriteMode && (
        <ReviewContainer>
          <ReviewTextArea>
            <ReviewTitle>리뷰 작성하기</ReviewTitle>
            <ReviewScope>
              <Rate
                allowHalf
                defaultValue={2.5}
                onChange={changeReviewHandelr}
                value={reviewScore}
              />
            </ReviewScope>
          </ReviewTextArea>
          <ReviewContentInput
            placeholder="내용을 입력해주세요."
            value={reviewContent}
            onChange={changeReviewHandler}
          />
          <SubmitReviewButtonBox>
            <SubmitReviewButton onClick={submitReviewHandler}>
              등록
            </SubmitReviewButton>
          </SubmitReviewButtonBox>
        </ReviewContainer>
      )}
    </ReviewWrapper>
  );
};

export default BestDetailReview;
