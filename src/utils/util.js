const urlNonRelativePathRegex = /\/\/.*\./gi;
const urlFinderRegex = /(?:https?:\/\/)?(www .)?[-a-zA-Z0-9@:%._+~#=]{2,256}[^.]\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
const urlRegex = /(https?:\/\/[^ ]*)/;
const dirtyToCleanCharacterMap = { '<': '&lt;', '>': '&gt;' };
const dirtyToCleanRegex = new RegExp(
  Object.keys(dirtyToCleanCharacterMap).join('|'),
  'gi'
);
export const sanitizeInput = input =>
  input.replace(dirtyToCleanRegex, match => dirtyToCleanCharacterMap[match]);

export const isUrl = input => urlFinderRegex.test(input);

export const getUrl = input =>
  input.match(urlRegex) ? input.match(urlRegex)[1] : false;

export const decorateOutput = (output, username) => {
  const anchorizedOutput = output.replace(urlFinderRegex, match => {
    let url = match;
    // Stupid fucking goddamn javascript regex engine bug doesn't work with:
    //if (!urlNonRelativePathRegex.test(match))
    //    url = '//' + match;
    // instead, we must:
    if (url.match(urlNonRelativePathRegex) == null) url = '//' + match;
    return '';
  });
  const userRegex = new RegExp(`@${username}`, 'gi');

  const userizedOutput = anchorizedOutput.replace(
    userRegex,
    match => `<span class="highlight">${match}</span>`
  );

  return userizedOutput;
};

export const isMobileDevice = () =>
  typeof window.orientation !== 'undefined' ||
  navigator.userAgent.indexOf('IEMobile') !== -1;
