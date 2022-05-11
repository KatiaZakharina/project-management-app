import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global';
import { SignUp } from 'pages/userForms/SignUp/SignUp';
import { SignIn } from 'pages/userForms/SignIn/SignIn';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { Footer } from 'components/Footer/Footer';
import { BoardPage } from 'pages/BoardPage/BoardPage';
import { MainPage } from 'pages/MainPage/MainPage';
import { PrivateRoute } from 'helpers/PrivateRoute';
import { NotFound404 } from 'helpers/NotFound404';
import { store } from 'store/store';

export function App() {
  return (
    <Provider store={store}>
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
          path="/board/:boardID"
          element={
            <PrivateRoute>
              <BoardPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound404 />}></Route>
      </Routes>
      <Footer />
    </Provider>
  );
}
