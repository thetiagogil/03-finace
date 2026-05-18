export const capitalizeFirstLetter = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return "";
  return `${trimmedValue.charAt(0).toUpperCase()}${trimmedValue.slice(1)}`;
};
