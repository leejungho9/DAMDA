import React from 'react';
import styled from 'styled-components';
import { FiUser, FiSearch } from "react-icons/fi";

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
        font-family: Arial;
        font-size: 16px;
        margin: 0 26px;
        cursor: pointer;
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
                    <LogoIcon src="icons/logo.png"/>
                    <NavMenu>
                        <MenuContainer>
                            <a>SHOP</a>
                            <a>PROMOTION</a>
                            <a>BRAND</a>
                        </MenuContainer>
                        <IconContainer>
                            <FiUser className='icon userIcon'/>
                            <FiSearch className='icon searchIcon'/>
                        </IconContainer>
                    </NavMenu>
                </NavContainer>
            </NavWrapper>
        </nav>
    );
}

export default Nav;