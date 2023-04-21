import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiUser, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { BsCart4, BsHeart } from "react-icons/bs";

const NavWrapper = styled.div`
  z-index: 1;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
`;
const NavContainer = styled.div`
  padding: 0 65px;
  height: 90px;
  width: 1600px;
  display: flex;
  align-items: center;
`;
const LogoIcon = styled.img`
  width: 140px;
`;
const NavMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MenuContainer = styled.div`
  margin-right: 54px;
  a {
    font-family: Arial;
    font-size: 16px;
    margin: 0 26px;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  .icon {
    cursor: pointer;
    font-size: 20px;
    &:hover {
      font-weight: bold;
      color: #f28b39;
    }
  }
  .searchIcon {
    margin-left: 20px;
  }

  .iconMenuBox {
    z-index: -1;
    top: -10px;
    left: -10px;
    width: 42px;
    height: 143px;
    background-color: #f7f8f8;
    position: absolute;
    display: none;
    border-radius: 30px;
    display: none;

    .cartIcon {
      position: absolute;
      top: 55px;
      right: 0;
      left: 0;
      margin: auto;
    }
    .heartIcon {
      position: absolute;
      top: 110px;
      right: 0;
      left: 0;
      margin: auto;
    }
  }

  &:hover .iconMenuBox {
    display: block;
  }
`;

const IconMenuBox = styled.div``;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  .icon {
    cursor: pointer;
    font-size: 20px;
    .icon:hover {
      font-weight: bold;
    }
  }
  .searchIcon {
    margin-left: 20px;
  }
`;

const SidebarContainer = styled.div`
  position: absolute;
  z-index: 999;
`;

function Nav(props) {
  const [isSidebar, setSidebar] = useState(false);

  useEffect(() => {}, [isSidebar]);

  return (
    <nav>
      <NavWrapper>
        <NavContainer>
          <Link to="/">
            <LogoIcon src={`${process.env.PUBLIC_URL}/icons/logo.png`} />
          </Link>
          <NavMenu>
            <MenuContainer>
              <Link to="/shop">SHOP</Link>
              <a>PROMOTION</a>
              <a>BRAND</a>
            </MenuContainer>
            <IconsContainer>
              <Link to="/login">
                <FiUser className="icon userIcon" />
              </Link>
              <IconMenuBox className="iconMenuBox">
                <Link to="/cart">
                  <BsCart4 className="icon cartIcon" />
                </Link>
                <BsHeart className="icon heartIcon" />
              </IconMenuBox>
            </IconsContainer>
            <SearchContainer>
              <FiSearch
                onClick={() => setSidebar(!isSidebar)}
                className="icon searchIcon"
              />
            </SearchContainer>
          </NavMenu>
        </NavContainer>
      </NavWrapper>
      <SidebarContainer>
        <Sidebar isSidebar={isSidebar} setSidebar={setSidebar} />
      </SidebarContainer>
    </nav>
  );
}

export default Nav;
