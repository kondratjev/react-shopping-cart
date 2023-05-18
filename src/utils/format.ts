const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};
