export const convertToVND = (amount) => {
  let formattedAmount = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return formattedAmount;
};
