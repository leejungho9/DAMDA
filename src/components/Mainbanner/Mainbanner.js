import React from "react";
import styled from "styled-components";

const MainbannerWrapper = styled.div`
  width: 100%;
  background-color: #fbeece;
`;
const MainBannerImage = styled.div`
  height: 600px;
  position: relative;
  background-image: url(../images/banner.jpg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

function Mainbanner(props) {
  return (
    <MainbannerWrapper>
      <MainBannerImage />
    </MainbannerWrapper>
  );
}

export default Mainbanner;
