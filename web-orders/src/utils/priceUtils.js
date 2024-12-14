export function formatPrice(price) {
  if (typeof price === 'string') {
    return price.replace('₫', '');
  }
  return price.toLocaleString('vi-VN');
}