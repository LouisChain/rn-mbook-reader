const removeMultiBlankLines = (s) => {
  if (!s) {
    return null;
  }
  return s.trim().replace(/\n/gm, "");
}

const secondToHMS = (second) => {
  let d = Number(second);
  let h = Math.floor(d / 3600);
  let m = Math.floor(d % 3600 / 60);
  let s = Math.floor(d % 3600 % 60);
  let hDisplay = h > 9 ? h : "0" + h;
  let mDisplay = m > 9 ? m : "0" + m;
  let sDisplay = s > 9 ? s : "0" + s;
  return hDisplay + ":" + mDisplay + ":" + sDisplay;
}

export { removeMultiBlankLines, secondToHMS }