import React, { useState } from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { BsCart4, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../../reducers/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

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

const Menu = styled(Link)`
  color: ${(props) => (props.active === "true" ? "#f28b39" : "#3e3e3e")};
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  .icon {
    cursor: pointer;
    font-size: 20px;
  }
  .searchIcon {
    margin-left: 20px;
  }

  .userIcon {
    z-index: 1;
    &:hover {
      font-weight: bold;
      color: #f28b39;
    }
  }
  .userIcon.user-login {
    color: #f28b39;
  }

  .iconMenuBox {
    .cartIcon {
      position: absolute;
      top: 55px;
      right: 0;
      left: 0;
      margin: auto;
      &:hover {
        font-weight: bold;
        color: #f28b39;
      }
    }
    .heartIcon {
      position: absolute;
      top: 110px;
      right: 0;
      left: 0;
      margin: auto;
      &:hover {
        font-weight: bold;
        color: #f28b39;
      }
    }
    .logoutIcon {
      z-index: 1;
      position: absolute;
      top: 158px;
      width: 23px;
      height: 23px;
      right: 0;
      left: 3px;
      margin: auto;
      &:hover {
        font-weight: bold;
        color: #f28b39;
      }
    }
  }

  &:hover .iconMenuBox {
    display: block;
  }
`;

const IconMenuBox = styled.div`
  top: -10px;
  left: -10px;
  width: 42px;
  height: ${({ checkLogin }) => (checkLogin ? "210px" : "150px")};
  z-index: ${({ checkLogin }) => (checkLogin ? "0" : "-1")};
  background-color: #f7f8f8;
  position: absolute;
  display: none;
  border-radius: 30px;
  display: none;
`;

function Nav(props) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  //! 로그아웃
  const handleLogout = () => {
    signOut(auth)
      .then((response) => {
        dispatch(logout());
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav>
      <NavWrapper>
        <NavContainer>
          <Link to="/">
            <LogoIcon src={`${process.env.PUBLIC_URL}/icons/logo.png`} />
          </Link>
          <NavMenu>
            <MenuContainer>
              <Menu to="/shop" active={pathname === "/shop" ? "true" : "false"}>
                SHOP
              </Menu>
              <Menu
                to="/promotion"
                active={pathname === "/promotion" ? "true" : "false"}
              >
                PROMOTION
              </Menu>
              <Menu
                to="/brand"
                active={pathname === "/brand" ? "true" : "false"}
              >
                BRAND
              </Menu>
            </MenuContainer>
            <IconsContainer>
              {isLoggedIn ? (
                <>
                  <FiUser className="icon userIcon user-login" />
                  <IconMenuBox
                    className="icon iconMenuBox"
                    checkLogin={isLoggedIn}
                  >
                    <Link to="/cart">
                      <BsCart4 className="icon cartIcon" />
                    </Link>
                    <Link to="/wish">
                      <BsHeart className="icon heartIcon" />
                    </Link>
                    <IoIosLogOut
                      className="icon logoutIcon"
                      onClick={handleLogout}
                    />
                  </IconMenuBox>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <FiUser className="icon userIcon" />
                  </Link>
                  <IconMenuBox
                    className="icon iconMenuBox"
                    checkLogin={isLoggedIn}
                  >
                    <Link to="/cart">
                      <BsCart4 className="icon cartIcon" />
                    </Link>
                    <Link to="/wish">
                      <BsHeart className="icon heartIcon" />
                    </Link>
                  </IconMenuBox>
                </>
              )}
            </IconsContainer>
          </NavMenu>
        </NavContainer>
      </NavWrapper>
    </nav>
  );
}

export default Nav;
