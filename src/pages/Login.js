import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../Firebase";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userSlice";
import { getUser } from "../apis/apis";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 50px;
`;
const LoginTitle = styled.span`
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  input:focus {
    outline: none;
  }
`;
const EmailInput = styled.input`
  font-size: 15px;
  padding-bottom: 20px;
  padding-left: 15px;
  font-weight: 500;
  color: #868686;
  border: none;
  border-bottom: solid 1px;
  width: 400px;
`;
const PwInput = styled.input`
  margin-top: 60px;
  font-size: 15px;
  font-weight: 500;
  color: #868686;
  padding-bottom: 15px;
  padding-left: 15px;
  border: none;
  border-bottom: solid 1px;
  width: 400px;
`;
const KakaoBtn = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  margin-top: 95px;
  background-color: #fee500;
  width: 400px;
  height: 53px;
  border-radius: 53px;
  font-family: "LINESeedKR-Rg";
  img {
    position: relative;
    display: block;
    left: -120px;
  }
  cursor: pointer;
`;

const NaverBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  color: #fff;
  margin-top: 15px;
  background-color: #03c75a;
  width: 400px;
  height: 53px;
  border-radius: 53px;
  font-family: "LINESeedKR-Rg";
  img {
    position: relative;
    display: block;
    left: -116px;
    margin-right: 6px;
  }
  cursor: pointer;
`;
const SigninBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  margin-top: 15px;
  margin-bottom: 140px;
  background-color: #fff;
  width: 399px;
  height: 52px;
  border: solid 1px;
  border-radius: 53px;
  font-family: "LINESeedKR-Rg";
  span {
    padding-left: 24px;
  }
  cursor: pointer;
`;
const LoginBtn = styled.button`
  margin-top: 25px;
  margin-right: 15px;
  background-color: #868686;
  width: 120px;
  height: 43px;
  border: none;
  border-radius: 43px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: "LINESeedKR-Rg";
`;
const LoginOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`;
const LoginOptionBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const AutoLogin = styled.input`
  display: flex;
  width: 18px;
  height: 18px;
  margin-left: 15px;
  margin-right: 20px;
`;
const AutoLoginLabel = styled.label`
  font-size: 15px;
  color: #868686;
  cursor: pointer;
  font-family: "LINESeedKR-Rg";
`;
const NaverLogin = styled.div`
  display: none;
`;

function Login() {
  const navigator = useNavigate();
  const naverRef = useRef(null);
  const location = useLocation();
  const [isLogin, setLogin] = useState([]);
  const [user, setUser] = useState([]);

  // ! 로그인 상태 관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // ! 로그인  onChange 이벤트
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const dispatch = useDispatch();
  const onLoginHandler = async (event) => {
    try {
      // ! 이메일 주소와 비밀번호로 사용자 로그인 처리
      const userCredential = await signInWithEmailAndPassword(
        auth,
        id,
        password
      );
      const userInfo = await getUser(userCredential.user.uid);
      dispatch(login(userInfo));
      navigator("/");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          alert("해당 이메일에 해당하는 사용자 계정이 없습니다.");
          break;
        case "auth/invalid-email":
          alert("올바르지 않은 이메일 형식입니다.");
          break;
        case "auth/wrong-password":
          alert("올바르지 않은 비밀번호입니다.");
          break;
        default:
          break;
      }
    }
  };
  const { naver } = window;
  const NAVER_CLIENT_ID = `${process.env.REACT_APP_NAVER_CLIENT_ID}`; // 발급 받은 Client ID 입력
  const NAVER_CALLBACK_URL = `${process.env.REACT_APP_NAVER_CALLBACK_URL}`; // 작성했던 Callback URL 입력

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: "green", type: 2, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        // 아래처럼 선택하여 추출이 가능하고,
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
        // setUserInfo(naverLogin.user)
        setLogin([userid, username]);
      }
    });
    // 요기!
  };

  const getNaverToken = () => {
    if (window.location.href.includes("access_token")) {
      const token = window.location.href.split("=")[1].split("&")[0];
    }
    // console.log, alert 창을 통해 토큰이 잘 추출 되는지 확인하자!
    // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
    // localStorage.setItem('access_token', token)
    // setGetToken(token)
  };

  const handleNaverLogin = () => {
    naverRef.current.children[0].click();
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);

  // ! 카카오 소셜 로그인 로직

  // * 버튼 클릭시 카카오에서 제공하는 URI에 요청 보내기
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_API}/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  };

  // * 받아온 URI에 포함된 인가코드 구분하기
  const KAKAO_AUTHORIZE_CODE = location.search.split("=")[1];

  // * 받아온 인가코드로 토큰 받아오기
  const getKakaoToken = () => {
    fetch(`${process.env.REACT_APP_KAKAO_API}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${KAKAO_AUTHORIZE_CODE}`,
    })
      .then((res) => res.json())
      //! data 찍어보면 access_token 들어옴
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("kakao_token", data.access_token);
          getKaKaoUser();
        } else {
          navigator("/");
        }
      });
  };

  const getKaKaoUser = (async) => {
    const kakaoToken = localStorage.getItem("kakao_token");
    fetch(`${process.env.REACT_APP_KAKAO_API}/v2/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
        "Content-Type": "application/x-www-form-urlencoded;",
      },
    }).then((res) => res.json());
  };

  useEffect(() => {
    if (location.search) {
      getKakaoToken();
    } else {
      return;
    }
  }, []);

  return (
    <LoginWrapper>
      <NaverLogin id="naverIdLogin" ref={naverRef} />
      <LoginTitle>로그인</LoginTitle>
      <LoginBox>
        <EmailInput
          placeholder="이메일을 입력해주세요."
          value={id}
          onChange={onIdHandler}
        />
        <PwInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={onPasswordHandler}
        />
        <LoginOption>
          <LoginOptionBox>
            <AutoLogin type={"checkbox"} />
            <AutoLoginLabel>자동로그인</AutoLoginLabel>
          </LoginOptionBox>
          <LoginBtn onClick={onLoginHandler}>로그인</LoginBtn>
        </LoginOption>
      </LoginBox>
      <KakaoBtn onClick={handleKakaoLogin}>
        <img src="icons/kakao_logo.svg" alt="카카오 아이콘" />
        카카오 로그인
      </KakaoBtn>
      <NaverBtn onClick={handleNaverLogin}>
        <img
          src="icons/naver_logo.png"
          width={18}
          height={16}
          alt="네이버 로그인"
        />
        네이버 로그인
      </NaverBtn>
      <Link to="/signup">
        <SigninBtn>
          <span>회원가입 하기</span>
        </SigninBtn>
      </Link>
    </LoginWrapper>
  );
}

export default Login;
