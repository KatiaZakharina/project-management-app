import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { GRAY, LIGHT_GRAY } from './constants';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  #root{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
 
  *,
*::before,
*::after {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
  font-family: Roboto;
}
*::-webkit-scrollbar {
    width: 5px;
 }
*::-webkit-scrollbar-track {
  background: ${LIGHT_GRAY};
}
*::-webkit-scrollbar-thumb {
  background: ${GRAY};
  border-radius: 2px;
}

ol li,
ul li {
  list-style: none;
}
a,
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
img {
  vertical-align: top;
}
html,
body {
  font-size: 14px;
  line-height: 1;
  height: 100%;
}
input[type="text"],
input[type="search"] input[type="email"],
input[type="tel"],
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input,
button,
textarea {
  font-family: inherit;
}`;
