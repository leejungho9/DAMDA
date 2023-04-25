import React from "react";
import { SiNaver } from "react-icons/si";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonStyles = styled.button`
  width: ${(props) => props.width + "px;"};
  height: ${(props) => props.height + "px;"};
  border-radius: ${(props) => props.radius + "px;"};
  background-color: ${(props) => props.color && props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  font-size: 18px;
  font-family: "LINESeedKR-Rg";
  color: #ffffff;
  cursor: pointer;
  .naverIcon {
    font-size: 20px;
    margin-right: 10px;
  }
`;

const LinkButtonStyles = styled(Link)`
  width: ${(props) => props.width + "px;"};
  height: ${(props) => props.height + "px;"};
  border-radius: ${(props) => props.radius + "px;"};
  background-color: ${(props) => props.color && props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  font-size: 18px;
  font-family: "LINESeedKR-Rg";
  color: #ffffff;
  cursor: pointer;
  .naverIcon {
    font-size: 20px;
    margin-right: 10px;
  }
`;
const Button = ({
  color,
  width,
  height,
  radius,
  onClick,
  children,
  className,
  icon,
  link,
  href,
}) => {
  return (
    <>
      {!link && (
        <ButtonStyles
          width={width}
          height={height}
          radius={radius}
          color={color}
          onClick={onClick}
          className={className}
        >
          {icon && <SiNaver className="naverIcon" />}
          {children}
        </ButtonStyles>
      )}
      {link && (
        <LinkButtonStyles
          width={width}
          height={height}
          radius={radius}
          color={color}
          onClick={onClick}
          className={className}
          to={href}
        >
          {icon && <SiNaver className="naverIcon" />}
          {children}
        </LinkButtonStyles>
      )}
    </>
  );
};

export default Button;
