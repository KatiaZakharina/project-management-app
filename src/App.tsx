import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { GlobalStyle } from 'styles/global';
import { SignUp } from 'pages/login/SignUp/SignUp';
import { SignIn } from 'pages/login/SignIn/SignIn';
import { WelcomePage } from 'components/WelcomePage/WelcomePage';

export function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </React.Fragment>
  );
}
