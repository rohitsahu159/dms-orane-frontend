
export const inrFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

export const urlConstants = {
  BASE_URI_DEV: "http://103.107.67.49:8080/api/v2",
};

export const COLORS = {
  white: '#fff',
  dark: '#000',
  red: '#F52A2A',
  light: '#F1F1F1',
  green: '#00B761',
  oraneBlue: '#00a7e5',
};

export const inrDateFormatNoTime = (date) =>
  new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export const inrDateFormatWithTime = (date) =>
  new Date(date).toLocaleString("en-IN");