import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-3">
        <div className="social-icon">
          <Image src="/icons/github.svg" alt="git hub" width={50} height={50} />
        </div>
        <div className="social-icon">
          <Image
            src="/icons/instagram.svg"
            alt="Instagram"
            width={50}
            height={50}
          />
        </div>
        <div className="social-icon">
          <Image
            src="/icons/facebook.svg"
            alt="git hub"
            width={50}
            height={50}
          />
        </div>
      </div>

      <p className="text-white-500">
        © 2025 Dkhoa Happy. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
