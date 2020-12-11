function convert(x, y) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(x)) return x;

  if (x < 999) {
    // console.log(`${Math.round(x / 1000)}K`);
    return x;
  }
  if (x < 9999) {
    // console.log(`${Math.round(x / 1000)}K`);
    if (y) {
      return `${Math.round(x / 1000)}K`;
    }
    return `${(x / 1000).toFixed(2)}K`;
  }

  if (x < 1000000) {
    return `${Math.round(x / 1000)}K`;
  }
  if (x < 10000000) {
    return `${Math.round(x / 1000000)}M`;
  }

  if (x < 1000000000) {
    return `${Math.round(x / 1000000)}M`;
  }

  if (x < 1000000000000) {
    return `${Math.round(x / 1000000000)}B`;
  }

  return '1T+';
}

export default convert;
