import styled from "styled-components";

import authImage320 from "@assets/images/auth-image-320.webp";
import authImage480 from "@assets/images/auth-image-480.webp";
import authImage768 from "@assets/images/auth-image-768.webp";
import authImage1200 from "@assets/images/auth-image-1200.webp";
import authImage1920 from "@assets/images/auth-image-1920.webp";

const StyledAuthImage = styled.img`
  height: 100%;
`;

const AuthImage = () => {
  return (
    <StyledAuthImage
      src={authImage768}
      srcSet={`
        ${authImage320} 320w, 
        ${authImage480} 480w, 
        ${authImage768} 768w, 
        ${authImage1200} 1200w, 
        ${authImage1920} 1920w`}
    />
  );
};

export default AuthImage;
