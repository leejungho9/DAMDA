import React, { useState } from "react";
import styled from "styled-components";
import { FiUser, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { BsCart4, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../reducers/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

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

function Nav(props) {
  const dispatch = useDispatch();
  const [isSidebar, setSidebar] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);

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
              <Link to="/shop">SHOP</Link>
              <Link to="/promotion">PROMOTION</Link>
              <a>BRAND</a>
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
            <SearchContainer>
              <FiSearch
                onClick={() => setSidebar(!isSidebar)}
                className="icon searchIcon"
              />
            </SearchContainer>
          </NavMenu>
        </NavContainer>
      </NavWrapper>
      <Sidebar isSidebar={isSidebar} setSidebar={setSidebar} />
    </nav>
  );
}

export default Nav;
