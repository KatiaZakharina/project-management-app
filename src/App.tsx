import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global';
import { SignUp } from 'pages/login/SignUp/SignUp';
import { SignIn } from 'pages/login/SignIn/SignIn';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { BoardPage } from 'pages/BoardPage/BoardPage';
import { MainPage } from 'pages/MainPage/MainPage';
import { PrivateRoute } from 'hoc/PrivateRoute';
import { NotFound404 } from 'pages/NotFound404/NotFound404';

export function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/board"
          element={
            <PrivateRoute>
              <BoardPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound404 />}></Route>
      </Routes>
    </React.Fragment>
  );
}
