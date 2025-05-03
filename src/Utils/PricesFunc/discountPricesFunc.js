
const discountPricesFunc = (regular_price, discount_price = 0) => {
    const discount = regular_price - discount_price;
    return ((discount / regular_price) * 100).toFixed(2)  // = (800 / 1000) * 100 = 20%
    // return (discount_price * 100 / regular_price).toFixed(2) // = (800 * 100) / 1000 = 80%
};

export default discountPricesFunc;