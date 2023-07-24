import React from "react";
import { TfiClose } from "react-icons/tfi";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const DaumPostcodeContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: 600px;
  z-index: 100;
  display: block;
  border: 1px solid #363636;
`;
const DaumPostcodeHeader = styled.div`
  height: 50px;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 15px;
`;
const DaumPostClsoeButton = styled(TfiClose)`
  width: 15px;
  height: 15px;
  color: #000;
  cursor: pointer;
`;
function DaumPostModal({ setDaumPostModal, onCompleteAdress }) {
  const DaumPostStyle = {
    width: "500px",
    height: "550px",
  };
  return (
    <DaumPostcodeContainer>
      <DaumPostcodeHeader>
        <DaumPostClsoeButton onClick={() => setDaumPostModal(false)} />
      </DaumPostcodeHeader>
      <DaumPostcode onComplete={onCompleteAdress} style={DaumPostStyle} />
    </DaumPostcodeContainer>
  );
}

export default DaumPostModal;
