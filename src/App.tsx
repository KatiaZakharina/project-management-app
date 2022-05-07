import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { WelcomePage } from 'components/WelcomePage/WelcomePage';

export function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
    </Routes>
  );
}
