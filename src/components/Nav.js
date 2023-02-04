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
    
    .navContainer{
        padding:  0 65px;
        height: 90px;
        width: 1600px;
        display: flex;
        align-items: center;
        
        .logoIcon{
            width: 90px;
        }

        .navMenu{
            width: 100%;
            display: flex;
            justify-content: flex-end;
   
            .menuContainer{
                a{
                    font-size: 18px;
                    margin: 0 26px;
                }
            }
            .iconsContainer{
                margin-left : 44px;
                .icon{
                    margin-left: 20px;
                }
            }
        }
    }
`
function Nav(props) {
    return (
        <nav>
            <NavWrapper>
                <div className='navContainer'>
                    <img src="./assets/icons/logo.png" className="logoIcon"/>
                    <div className='navMenu'>
                        <div className='menuContainer'>
                            <a>SHOP</a>
                            <a>PROMOTION</a>
                            <a>BRAND</a>
                        </div>
                        <div className='iconsContainer'>
                            <FiUser className='icon userIcon'/>
                            <FiSearch className='icon searchIcon'/>
                        </div>
                    </div>
                </div>
            </NavWrapper>
        </nav>
    );
}

export default Nav;