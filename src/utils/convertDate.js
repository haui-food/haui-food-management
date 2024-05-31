export const convertIso8601ToDatetime = (iso8601Str) => {
  // Chuyển đổi chuỗi ISO 8601 thành đối tượng Date
  const date = new Date(iso8601Str);

  // Lấy thông tin ngày, tháng, năm, giờ, phút, giây
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

  // Định dạng kết quả theo ngày, tháng, năm và giờ, phút, giây
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};
