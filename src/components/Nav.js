import React,{ useState,useRef,useEffect } from "react";
import styled from "styled-components";
import { FiUser, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';

const NavWrapper = styled.div`
  position: absolute;
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
  width: 90px;
`;
const NavMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MenuContainer = styled.div`

  a {
    font-family: Arial;
    font-size: 16px;
    margin: 0 26px;
    cursor: pointer;
    &:hover {
      color : black;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  margin-left: 44px;
  align-items: center;
  .icon {
    cursor: pointer;
    font-size: 20px;
    margin-left: 20px;
    .icon:hover {
      font-weight: bold;
    }
  }
`;

const SidebarContainer = styled.div`
    position: absolute;
    z-index: 999;
`

function Nav(props) {
  const [isSidebar,setSidebar] = useState(false);

  useEffect(() => {
    console.log(isSidebar)
  },[isSidebar])
  
return (
  <nav>
    <NavWrapper>
      <NavContainer>
        <Link to="/">
          <LogoIcon src="icons/logo.png" />
        </Link>
        <NavMenu>
          <MenuContainer>
            <Link to="/shop">SHOP</Link>
            <a>PROMOTION</a>
            <a>BRAND</a>
          </MenuContainer>
          <IconContainer>
            <Link to="/login">
              <FiUser className="icon userIcon" />
            </Link>
            <FiSearch onClick={() => setSidebar(!isSidebar)} className="icon searchIcon" />
          </IconContainer>
        </NavMenu>
      </NavContainer>
    </NavWrapper>
    <SidebarContainer><Sidebar isSidebar={isSidebar} setSidebar={setSidebar}/></SidebarContainer>
  </nav>
);
}

export default Nav;