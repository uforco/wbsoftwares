import PropTypes from "prop-types";
import discountPricesFunc from "../../Utils/discountPricesFunc/discountPricesFunc";
import { toast } from "react-toastify";

const CourseCard = ({ course }) => {
  const rating = Array.from({ length: 5 }, (_, index) => index + 1);

  const saveAddToCart = (course) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length >= 1) {
      return toast.warning("A maximum of one card can be added.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const existingItem = cartItems.find((item) => item.id === course.id);
    if (existingItem) {
      return toast.warning("Already added to cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      cartItems.push({ ...course, course_qty: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img className=" h-80 w-full " src={course?.photo} alt="" />
        <div className="absolute top-0 left-0 p-2">
          <h3 className="text-white text-sm font-bold bg-black p-2 py-1 rounded-md ">
            {course?.course_name}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-gray-800 text-lg font-semibold mb-2">
          {course?.course_name}
        </h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {rating.map((rating) => {
              if (rating <= 2) {
                return (
                  <span key={rating} className="text-blue-500 text-md">
                    ★
                  </span>
                );
              } else {
                return (
                  <span key={rating} className="text-gray-400 text-md">
                    ★
                  </span>
                );
              }
            })}
          </div>

          <span className="ml-2 text-gray-600 text-md font-bold">
            {course?.trainer_data?.name}
          </span>
        </div>
        <p className="text-gray-600 text-md mb-4">
          Course Details
          <span className="text-blue-500">Show Details(no need to change)</span>
        </p>
        <hr />
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="line-through text-gray-400 text-sm">
              Tk {course?.regular_price}
            </span>
            <span className="text-green-600 text-md font-bold ml-2">
              {discountPricesFunc(
                course?.regular_price,
                course?.discount_price
              )}
              %
            </span>
            <span className="text-black text-lg font-bold ml-2">
              Tk {course?.discount_price}
            </span>
          </div>
          {/* <span className="text-green-600 text-sm">Earn Tk 48</span> */}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => saveAddToCart({ id: course?.id })}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

CourseCard.propTypes = {
  course: PropTypes.any.isRequired,
};
