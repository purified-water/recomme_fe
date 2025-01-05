export const DecimaliseNumber = (num: number): string => {
  if (!num) {
    return "";
  }

  if (num === 0) return "0";

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
