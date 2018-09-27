const urlNonRelativePathRegex = /\/\/.*\./gi;
const urlFinderRegex = /(?:https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}[^.]\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
const dirtyToCleanCharacterMap = { '<': '&lt;', '>': '&gt;' };
const dirtyToCleanRegex = new RegExp(
  Object.keys(dirtyToCleanCharacterMap).join('|'),
  'gi'
);
export const sanitizeInput = input =>
  input.replace(dirtyToCleanRegex, match => dirtyToCleanCharacterMap[match]);

export const decorateOutput = output =>
  output.replace(urlFinderRegex, match => {
    let url = match;
    // Stupid fucking goddamn javascript regex engine bug doesn't work with:
    //if (!urlNonRelativePathRegex.test(match))
    //    url = '//' + match;
    // instead, we must:
    if (url.match(urlNonRelativePathRegex) == null) url = '//' + match;
    return '<a target="_blank" href="' + url + '">' + match + '</a>';
  });

export const isMobileDevice = () => (
  typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
);
