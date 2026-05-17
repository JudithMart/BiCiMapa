import React from 'react'
import RegisterC from '../shared/components/RegisterC';


function Register({ onClose, onShowLogin, onAuthSuccess }) {
  return (
    <div>
      <RegisterC onClose={onClose} onShowLogin={onShowLogin} onAuthSuccess={onAuthSuccess} />
    </div>
  );
}

export default Register