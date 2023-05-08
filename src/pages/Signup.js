import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignupContainer = styled.div`
  margin: 0 auto;
  width: 1300px;
`;
const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SignupTitle = styled.h1`
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
  padding-top: 50px;
`;
const SignupInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 23px;
  position: relative;
`;
const SignupForm = styled.div`
  margin-top: 70px;
`;
const SignupInfoLabel = styled.label`
  font-family: "LINESeedKR-Rg";
  font-size: 15px;
  color: #868686;
`;
const SignupInfoInput = styled.input`
  width: 338px;
  height: 40px;
  background-color: #f6f6f6;
  border-radius: 30px;
  border: none;
  outline: none;
  padding: 5px 20px;
  box-sizing: border-box;
`;

const SignupInfoLabelBox = styled.div`
  width: 150px;
`;

const TermsContainer = styled.div`
  margin-top: 74px;
`;

const TermsBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
const TermsInputBox = styled.div`
  width: 444px;
`;
const TermsLabel = styled.label`
  font-family: "LINESeedKR-Rg";
  font-size: 15px;
  color: #3e3e3e;
  cursor: pointer;
`;
const TermsInputRadio = styled.input``;
const TermsInputLabel = styled.label`
  font-family: "LINESeedKR-Rg";
  font-size: 15px;
  color: #3e3e3e;
  margin-left: 10px;
`;

const SigninBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  font-size: 16px;
  font-weight: 800;
  background-color: #fff;
  width: 399px;
  height: 52px;
  border: solid 1px;
  border-radius: 53px;
  font-family: "LINESeedKR-Rg";
  cursor: pointer;
`;

const SignupSpan = styled.span`
  position: absolute;
  right: 0;
  font-family: "LINESeedKR-Rg";
  cursor: pointer;
  font-size: 12px;
  color: #3e3e3e;
  margin-right: 12px;
`;

const Signup = () => {
  return (
    <SignupContainer>
      <SignupWrapper>
        <SignupTitle>회원가입</SignupTitle>
        <SignupForm>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel>이름 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel>아이디 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel>비밀번호 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput type="password"></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel>비밀번호 확인 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput type="password"></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel>핸드폰번호 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel>주소 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput></SignupInfoInput>
            <SignupSpan>주소검색</SignupSpan>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox></SignupInfoLabelBox>
            <SignupInfoInput placeholder="상세주소를 입력해주세요."></SignupInfoInput>
          </SignupInfoBox>
        </SignupForm>
        <TermsContainer>
          <TermsBox>
            <TermsInputBox>
              <TermsLabel htmlFor="Terms-of-Use">
                [필수] 이용약관동의
              </TermsLabel>
            </TermsInputBox>
            <TermsInputRadio type="radio" id="Terms-of-Use"></TermsInputRadio>
            <TermsInputLabel>동의</TermsInputLabel>
          </TermsBox>
          <TermsBox>
            <TermsInputBox>
              <TermsLabel htmlFor="Privacy-consent">
                [필수] 개인정보 수집 및 이용 동의
              </TermsLabel>
            </TermsInputBox>
            <TermsInputRadio
              type="radio"
              id="Privacy-consent"
            ></TermsInputRadio>
            <TermsInputLabel>동의</TermsInputLabel>
          </TermsBox>
          <TermsBox>
            <TermsInputBox>
              <TermsLabel htmlFor="ShoppingData-opt-in">
                [필수] 쇼핑정보 수신 동의
              </TermsLabel>
            </TermsInputBox>
            <TermsInputRadio
              type="radio"
              id="ShoppingData-opt-in"
            ></TermsInputRadio>
            <TermsInputLabel>동의</TermsInputLabel>
          </TermsBox>
        </TermsContainer>
        <SigninBtn>
          <Link to="/signup">
            <span>회원가입 하기</span>
          </Link>
        </SigninBtn>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;
