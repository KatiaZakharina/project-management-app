export const getLoginToken = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, '$1');
};

export const getPassword = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)password\s*\=\s*([^;]*).*$)|^.*$/, '$1');
};
