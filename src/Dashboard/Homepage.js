import React, { useEffect, useState } from "react";
import Background_vid from "_common/AppHeader/Home_background_vid";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
const Homepage = () => {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setShowIcon(true);
      } else {
        setShowIcon(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div>
      <div >
        <Background_vid style={{ position: 'relative' }} />
        {showIcon && (
          <div onClick={scrollToTop} style={{ position: 'fixed', bottom: '30px', right: '20px', cursor: 'pointer', border: '1px solid', borderRadius: '100%', backgroundColor: 'white', padding: '10px' }}>
            <FontAwesomeIcon icon={faArrowUp} size="xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
