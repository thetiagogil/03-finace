export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
};

export const formatChartValue = (value: unknown) => {
  return typeof value === "number" ? formatCurrency(value) : String(value ?? "");
};
