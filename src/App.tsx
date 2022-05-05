import { Routes, Route } from 'react-router-dom';

import { SignIn } from 'components/SignIn/SignIn';
import { SignUp } from 'components/SignUp/SignUp';

export function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}
