import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
 
  *,
*::before,
*::after {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
  font-family: Roboto;
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
