import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'App';

describe('App', () => {
  it('App render', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
