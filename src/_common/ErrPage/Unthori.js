import React from "react";


const ErrPage = () => {
  return (
    <div > {/* Sử dụng lớp CSS từ module SCSS */}
      <div className="lock"></div>
      <div className="message">
        <h1>Access to this page is restricted</h1>
        <p>Please check with the site admin if you believe this is a mistake.</p>
      </div>
    </div>
  );
}

export default ErrPage;
