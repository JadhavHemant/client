import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}className='cursor-pointer'>Logout</button>
  );
};

export default LogoutButton;
