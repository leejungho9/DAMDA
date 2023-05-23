import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { postSignup } from "../apis/apis";
import { useNavigate } from "react-router-dom";

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
const SignupForm = styled.form`
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
const TermsInputCheckbox = styled.input``;
const TermsInputLabel = styled.label`
  font-family: "LINESeedKR-Rg";
  font-size: 15px;
  color: #3e3e3e;
  margin-left: 10px;
`;

const SigninBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70px auto;
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
  margin-right: 20px;
`;

const DaumPostcodeContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: 600px;
  z-index: 100;
  display: block;
  background-color: red;
  border: 1px solid #363636;
`;
const DaumPostcodeHeader = styled.div`
  height: 50px;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 15px;
`;
const DaumPostClsoeButton = styled(TfiClose)`
  width: 15px;
  height: 15px;
  color: #000;
  cursor: pointer;
`;

const Signup = () => {
  const navigator = useNavigate();
  const [daumPostModal, setDaumPostModal] = useState(false);

  // ! 회원가입
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const DaumPostStyle = {
    width: "500px",
    height: "550px",
  };
  const onCompleteAdress = (e) => {
    console.log(e);
    setAddress(e.address);
    setDaumPostModal(false);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onPhoneHandler = (event) => {
    const { value } = event.target;
    const onlyNumber = value.replace(/[^0-9]/g, "");
    setPhone(onlyNumber);
  };

  const onDetailAddressHandler = (event) => {
    setDetailAddress(event.currentTarget.value);
  };

  // ! 약관 상태 값 관리

  const [termsOfUser, setTermsOfUser] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [shoppingDataOptIn, setShoppingDataOptIn] = useState(false);

  const onTermsOfUserHandler = (event) => {
    setTermsOfUser(event.target.checked);
  };
  const onPrivacyConsentHandler = (event) => {
    setPrivacyConsent(event.target.checked);
  };
  const onShoppingDataOptInHandler = (event) => {
    setShoppingDataOptIn(event.target.checked);
  };

  // ! checkSignup 상태
  const [checkSignUp, setCheckSignUp] = useState(false);

  const handleValidation = (event) => {
    event.preventDefault();

    if (name.length === 0) {
      alert("정확한 이름을 입력해주세요");
      return;
    }

    const emailRegExp =
      /^[A-Za-z0-9]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(id)) {
      alert("정확한 이메일 주소를 입력해주세요.");
      return;
    }
    const passwordRegExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (!passwordRegExp.test(password)) {
      alert("정확한 비밀번호를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 같지 않습니다.");
      return;
    }
    const phoneRegExp = /^[0-9]{10,11}$/;
    if (!phoneRegExp.test(phone)) {
      alert("정확한 핸드폰 번호를 입력해주세요.");
      return;
    }

    if (address.length === 0) {
      alert("정확한 주소를 입력해주세요.");
      return;
    }

    if (detailAddress.length === 0) {
      alert("정확한 상세 주소를 입력해주세요.");
      return;
    }

    if (!termsOfUser) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    if (!privacyConsent) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    if (!shoppingDataOptIn) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    setCheckSignUp(true);
    handleSignup();
  };

  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, id, password);
      const userInfo = {
        uId: user.user.uid,
        name,
        id,
        password,
        phone,
        address,
        detailAddress,
      };
      postSignup(userInfo);
      alert("정상적으로 회원가입 되었습니다.");
      navigator("/login");
    } catch (err) {
      //console.log(err.code);
      switch (err.code) {
        case "auth/email-already-in-use":
          alert("이미 가입되어 있는 계정입니다");
          break;
        default:
          break;
      }
    }
  };

  return (
    <SignupContainer>
      {daumPostModal && (
        <DaumPostcodeContainer>
          <DaumPostcodeHeader>
            <DaumPostClsoeButton onClick={() => setDaumPostModal(false)} />
          </DaumPostcodeHeader>
          <DaumPostcode onComplete={onCompleteAdress} style={DaumPostStyle} />
        </DaumPostcodeContainer>
      )}
      <SignupWrapper>
        <SignupTitle>회원가입</SignupTitle>
        <SignupForm onSubmit={handleValidation}>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel htmlFor="name">이름 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput
              id="name"
              value={name}
              onChange={onNameHandler}
            ></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel htmlFor="id">아이디 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput
              id="id"
              value={id}
              onChange={onIdHandler}
              placeholder="아이디(이메일 형식)"
            ></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel htmlFor="password">비밀번호 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput
              type="password"
              id="password"
              value={password}
              onChange={onPasswordHandler}
              placeholder=" 8~20자 영문, 숫자, 특수문자 조합"
            ></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel htmlFor="confirmPassword">
                비밀번호 확인 *
              </SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
              placeholder="비밀번호 확인"
            ></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel htmlFor="phone">핸드폰번호 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput
              id="phone"
              value={phone}
              onChange={onPhoneHandler}
            ></SignupInfoInput>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox>
              <SignupInfoLabel>주소 *</SignupInfoLabel>
            </SignupInfoLabelBox>
            <SignupInfoInput value={address} readOnly></SignupInfoInput>
            <SignupSpan onClick={() => setDaumPostModal(true)}>
              주소검색
            </SignupSpan>
          </SignupInfoBox>
          <SignupInfoBox>
            <SignupInfoLabelBox></SignupInfoLabelBox>
            <SignupInfoInput
              placeholder="상세주소를 입력해주세요."
              value={detailAddress}
              onChange={onDetailAddressHandler}
            ></SignupInfoInput>
          </SignupInfoBox>
          <TermsContainer>
            <TermsBox>
              <TermsInputBox>
                <TermsLabel htmlFor="Terms-of-Use">
                  [필수] 이용약관동의
                </TermsLabel>
              </TermsInputBox>
              <TermsInputCheckbox
                type="checkbox"
                id="Terms-of-Use"
                onChange={onTermsOfUserHandler}
              ></TermsInputCheckbox>
              <TermsInputLabel>동의</TermsInputLabel>
            </TermsBox>
            <TermsBox>
              <TermsInputBox>
                <TermsLabel htmlFor="Privacy-consent">
                  [필수] 개인정보 수집 및 이용 동의
                </TermsLabel>
              </TermsInputBox>
              <TermsInputCheckbox
                type="checkbox"
                id="Privacy-consent"
                onChange={onPrivacyConsentHandler}
              ></TermsInputCheckbox>
              <TermsInputLabel>동의</TermsInputLabel>
            </TermsBox>
            <TermsBox>
              <TermsInputBox>
                <TermsLabel htmlFor="ShoppingData-opt-in">
                  [필수] 쇼핑정보 수신 동의
                </TermsLabel>
              </TermsInputBox>
              <TermsInputCheckbox
                type="checkbox"
                id="ShoppingData-opt-in"
                onChange={onShoppingDataOptInHandler}
              ></TermsInputCheckbox>
              <TermsInputLabel>동의</TermsInputLabel>
            </TermsBox>
          </TermsContainer>
          <SigninBtn>회원가입 하기</SigninBtn>
        </SignupForm>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;
