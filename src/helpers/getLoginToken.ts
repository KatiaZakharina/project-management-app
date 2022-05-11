export const getLoginToken = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, '$1');
};
