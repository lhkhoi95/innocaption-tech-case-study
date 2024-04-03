export function convertToUSCurrency(number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // Set maximum fraction digits to 0
  });

  return formatter.format(Math.floor(number));
}
