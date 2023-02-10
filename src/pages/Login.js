import React from "react";
import styled from "styled-components";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 98px;
`
const LoginTitle = styled.span`
  margin-top: 150px;
  font-family: "LINESeedKR-Bd";
  font-weight: 800;
  font-size: 18px;
`
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  input:focus {
    outline:none;
  }
`
const EmailInput = styled.input`
  font-size: 15px;
  padding-bottom: 20px;
  padding-left: 15px;
  font-weight: 500;
  color: #868686;
  border: none;
  border-bottom: solid 1px;
  width: 400px;
`
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
`
const KakaoBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    margin-top: 95px;
    background-color: #FEE500;
    width: 400px;
    height: 53px;
    border-radius: 53px;
    cursor: pointer;
`

const NaverBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    margin-top: 15px;
    background-color: #03C75A;
    width: 400px;
    height: 53px;
    border-radius: 53px;
    cursor: pointer;
`
const SigninBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 800;
    margin-top: 15px;
    margin-bottom: 140px;
    background-color: #fff;
    width: 400px;
    height: 53px;
    border: solid 1px;
    border-radius: 53px;
    cursor: pointer;
`
const LoginBtn = styled.button`
    margin-top: 25px;
    margin-right: 15px;
    background-color: #868686;
    width: 120px;
    height: 43px;
    border: none;
    border-radius: 43px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    font-family: "LINESeedKR-Rg";
`
const LoginOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`
const LoginOptionBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const AutoLogin = styled.input`
  display: flex;
  width: 18px;
  height: 18px;
  margin-left: 15px;
  margin-right: 20px;
`
const AutoLoginLabel = styled.label`
  font-size: 15px;
  color: #868686;
  cursor: pointer;
  font-family: "LINESeedKR-Rg";
`

function Login({ slideIdx }) {
  
  return (
    <LoginWrapper>
      <LoginTitle>로그인 / 회원가입</LoginTitle>
      <LoginBox>
        <EmailInput placeholder="이메일을 입력해주세요." />
        <PwInput placeholder="비밀번호를 입력해주세요." />
        <LoginOption>
        <LoginOptionBox><AutoLogin type={"checkbox"} /><AutoLoginLabel>자동로그인</AutoLoginLabel></LoginOptionBox>
        <LoginBtn>로그인</LoginBtn>
        </LoginOption>

      </LoginBox>
      <a><KakaoBtn>카카오 로그인</KakaoBtn></a>
      <a><NaverBtn>네이버 로그인</NaverBtn></a>
      <a><SigninBtn>회원가입 하기</SigninBtn></a>
    </LoginWrapper>
  )
}

export default Login;