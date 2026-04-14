import React from 'react'
import LoginC from '../components/LoginC'


function Login({ onClose, onShowRegister, onAuthSuccess }) {
  return (
    <div>
      <LoginC onClose={onClose} onShowRegister={onShowRegister} onAuthSuccess={onAuthSuccess} />
    </div>
  );
}

export default Login