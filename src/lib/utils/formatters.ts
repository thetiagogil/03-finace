export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
};

export const formatChartValue = (value: unknown) => {
  return typeof value === "number" ? formatCurrency(value) : String(value ?? "");
};

export const formatCurrencyAxis = (value: number | string) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? formatCurrency(numericValue) : String(value);
};
