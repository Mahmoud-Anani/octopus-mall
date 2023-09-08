// Add new route to us handle or change price all project /api/v1/typeCurrency
const EGP = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EGP",
});

const normalNumber = new Intl.NumberFormat("en-IN", {
  maximumSignificantDigits: 3,
});

export { EGP, normalNumber };
