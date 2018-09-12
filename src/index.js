const TYPES = {
  OPEN: 0,
  CLOSE: 1,
  EQUAL: 2
};

function getModifiedChars(str, bracketsConfig) {
  return str.split('').map((char) => {
    let kind, type;
    bracketsConfig.map((config, index) => {
      if (config.includes(char)) {
        kind = index;
        if (config[0] === config[1]) {
          type = TYPES.EQUAL;
        } else {
          type = config.indexOf(char);
        }
        return;
      }
    });
    return {kind, type};
  });
}

module.exports = function check(str, bracketsConfig) {
  const chars = getModifiedChars(str, bracketsConfig);
  let stack = [];
  chars.forEach((char) => {
    const lastStackEl = stack[stack.length - 1]; 
    if (lastStackEl && char.kind === lastStackEl.kind &&
        ((char.type === TYPES.EQUAL && lastStackEl.type === TYPES.EQUAL) ||
        (char.type === TYPES.CLOSE && lastStackEl.type === TYPES.OPEN))) {
          
      stack.pop();
    } else {
      stack.push(char);
    }
  });
  return (stack.length) ? false : true;
}
