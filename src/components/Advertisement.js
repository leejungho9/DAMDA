import React from "react";
import styled from "styled-components";

const AdvertisementWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 140px;
`;

const AdvertisementBg = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f6f6f6;
  position: relative;
`;

const AdvertisementContainer = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto;
  max-width: 1250px;

`

const AdvertisementText = styled.div`
    background-image: url(images/event3.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 350px;
    height: 200px;
    position: absolute;
    left: 50px;
`;

const AdvertisementButton = styled.div`
  background-image: url(images/event2.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 130px;
  height: 200px;
  position: absolute;
  left: 430px;
`

const AdvertisementCoupon = styled.div`
  background-image: url(images/event1.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 400px;
  height: 200px;
  position: absolute;
  right: 0;
`

function Advertisement(props) {
  return (
    <AdvertisementWrapper>
      <AdvertisementBg>
        <AdvertisementContainer>
          <AdvertisementText />
          <AdvertisementButton />
          <AdvertisementCoupon />
        </AdvertisementContainer>
      </AdvertisementBg>
    </AdvertisementWrapper>
  );
}

export default Advertisement;
