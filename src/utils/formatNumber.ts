export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }
  const suffixes = ["k", "M", "B", "T"];
  const suffixIndex = Math.floor(Math.log10(num) / 3) - 1;
  const divisor = Math.pow(1000, suffixIndex + 1);
  let shortNum = num / divisor;
  shortNum = parseFloat(shortNum.toFixed(1));
  return shortNum + suffixes[suffixIndex];
};
