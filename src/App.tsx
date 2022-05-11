import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { GlobalStyle } from 'styles/global';
import { SignUp } from 'pages/userForms/SignUp/SignUp';
import { SignIn } from 'pages/userForms/SignIn/SignIn';
import { store } from 'store/store';

export function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Provider>
  );
}
