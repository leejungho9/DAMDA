import React from "react";
import styled from "styled-components";

const MainbannerWrapper = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  background-image: url(../images/banner.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function Mainbanner(props) {
  return <MainbannerWrapper />;
}

export default Mainbanner;
