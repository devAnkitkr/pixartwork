import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

import "./footer.styles.scss";
const Footer = () => {
  const shareUrl =
    "www.pixartwork.com";
  const title = "pixart.com";
  return (
    <footer className="footer">
      <span className='mr-3'>Designed by devankit.com</span>
      <FacebookShareButton
        url={shareUrl}
        quote={title}
        image={shareUrl}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </footer>
  );
};

export default Footer;
