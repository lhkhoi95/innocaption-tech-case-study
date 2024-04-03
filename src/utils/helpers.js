export function convertToUSCurrency(number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // Set maximum fraction digits to 0
  });

  return formatter.format(Math.floor(number));
}

export const makeApiCall = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to make API call");
  }

  return await response.json();
};
