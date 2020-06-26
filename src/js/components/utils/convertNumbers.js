function convert(x) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(x)) return x;

  if (x < 9999) {
    return x;
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
