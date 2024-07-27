import React, { useState, useEffect } from 'react';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} style={styles.button}>
          <ExpandLessRoundedIcon 
            sx={{fontSize: '40px', fontWeight: "800"}}
          />
        </button>
      )}
    </div>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#1e90ff',
    padding: '5px 7px',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    transition: 'opacity 0.5s ease-in-out'
  }
};

export default BackToTopButton;