
export const inrFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

export const urlConstants = {
  BASE_URI_DEV: "http://103.107.67.49:8080/api/v2",
};