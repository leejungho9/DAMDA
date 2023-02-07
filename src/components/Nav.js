import React from 'react';
import styled from 'styled-components';
import { FiUser, FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';

const NavWrapper = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
`
const NavContainer = styled.div`
    padding:  0 65px;
    height: 90px;
    width: 1600px;
    display: flex;
    align-items: center;
`
const LogoIcon = styled.img`
    width: 90px;
`
const NavMenu = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

const MenuContainer = styled.div`
    a{
        font-size: 18px;
        margin: 0 26px;
    }
`

const IconContainer = styled.div`
    display: flex;
    margin-left: 44px;
    align-items: center;
    .icon{
        font-size: 18px;
        margin-left: 20px;
    }
`

function Nav(props) {
    return (
        <nav>
            <NavWrapper>
                <NavContainer>
                    <Link to="/"><LogoIcon src="icons/logo.png"/></Link>
                    <NavMenu>
                        <MenuContainer>
                            <Link to="/login"><a>SHOP</a></Link>
                            <a>PROMOTION</a>
                            <a>BRAND</a>
                        </MenuContainer>
                        <IconContainer>
                            <Link to="/login"><FiUser className='icon userIcon'/></Link>
                            <FiSearch className='icon searchIcon'/>
                        </IconContainer>
                    </NavMenu>
                </NavContainer>
            </NavWrapper>
        </nav>
    );
}

export default Nav;