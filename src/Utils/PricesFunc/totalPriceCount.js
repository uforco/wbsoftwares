export function TotalPrice(z) {
  return z.reduce((previousValue, currentValue) => {
    return (
      previousValue + currentValue?.course_qty * currentValue?.discount_price
    );
  }, 0);
}
