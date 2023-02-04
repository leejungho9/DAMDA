import React from 'react';
import styled from 'styled-components';

const MainbannerWrapper = styled.div`
    width: 100%;
    height: 750px;
    position: relative;
    background-image : url('./assets/images/img9.jpg');


`
function Mainbanner(props) {
    return (
        <MainbannerWrapper/>
    );
}

export default Mainbanner;