import React,{ useRef,useEffect } from "react";
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
  font-size: 25px;
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
  font-size: 20px;
  padding-bottom: 20px;
  padding-left: 15px;
  font-weight: 500;
  color: #868686;
  border: none;
  border-bottom: solid;
  width: 400px;
`
const PwInput = styled.input`
  margin-top: 60px;
  font-size: 20px;
  font-weight: 500;
  color: #868686;
  padding-bottom: 20px;
  padding-left: 15px;
  border: none;
  border-bottom: solid;
  width: 400px;
`
const KakaoBtn = styled.div`
    margin-top: 95px;
    background-color: #FEE500;
    width: 400px;
    height: 53px;
    border-radius: 53px;
    cursor: pointer;
`

const NaverBtn = styled.div`
    margin-top: 15px;
    background-color: #03C75A;
    width: 400px;
    height: 53px;
    border-radius: 53px;
    cursor: pointer;
`
const SigninBtn = styled.div`
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
  align-items: center;
  flex-direction: row;
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
  width: 24px;
  height: 24px;
  margin-left: 15px;
  margin-right: 20px;
`
const AutoLoginLabel = styled.label`
  font-size: 20px;
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
      <a><KakaoBtn /></a>
      <a><NaverBtn /></a>
      <a><SigninBtn /></a>
    </LoginWrapper>
  )
}

export default Login;