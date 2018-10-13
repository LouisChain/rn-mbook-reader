const removeMultiBlankLines = (s) => {
  if(!s) {
    return null;
  }
  return s.trim().replace(/\n/gm, "");
}

export { removeMultiBlankLines }