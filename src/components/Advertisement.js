import React from "react";
import styled from "styled-components";

const AdvertisementWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 140px;
`;

const AdvertisementImage = styled.div`
  background-image: url("images/img5.jpg");
  background-repeat:  no-repeat;
  width: 100%;
  height: 200px;
  background-repeat: no-repeat;
  background-size : cover;
  background-position: center;
`


function Advertisement(props) {
  return (
    <AdvertisementWrapper>
      <AdvertisementImage/>
    </AdvertisementWrapper>
  );
}

export default Advertisement;
