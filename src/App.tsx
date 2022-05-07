import { Routes, Route } from 'react-router-dom';
import React from 'react';

import { GlobalStyle } from 'styles/global';
import { SignUp } from 'pages/login/SignUp/SignUp';
import { SignIn } from 'pages/login/SignIn/SignIn';

export function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </React.Fragment>
  );
}
