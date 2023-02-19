import React from "react";
import styled from "styled-components";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
const FooterWrapper = styled.div`
  margin-top: 100px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
`;

const FooterContainer = styled.div`
  width: 1300px;
  padding: 70px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

const CompanyName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const AddressContainer = styled.div`
  flex-grow: 2;
  & ul:first-of-type{
    margin-top: 28px;
    margin-bottom: 20px;
  }

`;
const AddressUl = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0px;

`;

const AdressLl = styled.li`
  &:not(:last-child)::after {
    content: "|";
  }
  .firstSpan{
    padding-left: 0;
  }
`;
const AddressSpan = styled.span`
  padding: 0 20px;
  font-size: 14px;
  font-weight: ${prop => prop.strong && "bold"};
  cursor: ${prop => prop.strong && "pointer"};
`;

const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  
  .icons{
    color : gray;
    margin-top: 10px;
    padding-left : 60px;
    cursor: pointer;
  }

`

function Footer(props) {
  return (
    <FooterWrapper>
      <FooterContainer>
        <AddressContainer>
          <CompanyName>(주)담다</CompanyName>
          <AddressUl>
            <AdressLl><AddressSpan className="firstSpan">경기도 고양시 일산서구 33층</AddressSpan></AdressLl>
            <AdressLl><AddressSpan>대표이사 : 이정호</AddressSpan></AdressLl>
            <AdressLl><AddressSpan>개인정보보호책임자 : 윤지원</AddressSpan></AdressLl>
            <AdressLl><AddressSpan>사업자등록번호 : 723-32-90183</AddressSpan></AdressLl>
          </AddressUl>
          <AddressUl>
            <AdressLl><AddressSpan className="firstSpan">MON-FRI  9:00 - 18:00</AddressSpan></AdressLl>
            <AdressLl><AddressSpan strong={true}>회사소개</AddressSpan></AdressLl>
            <AdressLl><AddressSpan strong={true}>이용약관</AddressSpan></AdressLl>
            <AdressLl><AddressSpan strong={true}>개인정보처리방침</AddressSpan></AdressLl>
          </AddressUl>
        </AddressContainer>
        <SocialContainer>
          <BsInstagram className="icons instagram" size={30}/>
          <BsYoutube className="icons youtube" size={35}/>
          <RiKakaoTalkFill className="icons kakao" size={35}/>
        </SocialContainer>
      </FooterContainer>
    </FooterWrapper>
  );
}

export default Footer;
