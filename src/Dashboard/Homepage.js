import React, {useEffect, useState} from "react";
import Background_vid from "_common/AppHeader/Home_background_vid";
import Dashboard from "./Dashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'
const Homepage = () => {
    const [showIcon, setShowIcon] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
  
        // Kiểm tra nếu vị trí cuộn trang lớn hơn 0, hiển thị biểu tượng, ngược lại ẩn nó
        if (scrollTop > 0) {
          setShowIcon(true);
        } else {
          setShowIcon(false);
        }
      };
  
      // Thêm sự kiện cuộn trang khi component được render
      window.addEventListener("scroll", handleScroll);
  
      // Hủy sự kiện cuộn trang khi component bị hủy
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    const scrollToTop = () => {
        // Cuộn trang lên đầu
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Sử dụng 'smooth' để có hiệu ứng cuộn mượt
      };
  return (
    <div>
      <div >
        <Background_vid style={{ position: 'relative' }}/>
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
