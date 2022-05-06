import { Routes, Route } from 'react-router-dom';
import React from 'react';

import { SignIn } from 'components/user/SignIn/SignIn';
import { SignUp } from 'components/user/SignUp/SignUp';
import { GlobalStyle } from 'styles/global';

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
