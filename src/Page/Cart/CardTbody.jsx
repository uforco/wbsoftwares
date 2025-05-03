import { RiDeleteBin5Line } from "react-icons/ri";
import { PropTypes } from "prop-types";
import { useEffect } from "react";

const CardTbody = ({ data, setQty, qty }) => {
    // const [ qty, setQty ] = useState(data?.course_qty || 1);
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const qtyCard = cartItems.find((item) => item.id === data.id);
        data.course_qty = qtyCard?.course_qty || 1;
        setQty(data.course_qty);
    }, [data, qty, setQty]);

    const incrementCourse = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const updatedCartItems = cartItems.map((item) => {
            if (item.id === data.id) {
                setQty(item.course_qty + 1);
                return { ...item, course_qty: item.course_qty + 1 };
            }
            return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
    const decrementCourse = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const updatedCartItems = cartItems.map((item) => {
            if (item.id === data.id && item.course_qty > 1) {
                setQty(item.course_qty - 1);
                return { ...item, course_qty: item.course_qty - 1 };
            }
            return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }


  return (
    <>
      <tr className="border-b border-gray-300 overflow-x-auto">
        <td>
          <div className="flex items-center justify-center ">
            <div className="w-[20%] text-center flex items-center justify-center ">
              <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
            </div>
            <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
              <div className="mask">
                <img className="h-[40px] w-[70px]" src={data?.photo} alt="Course" />
              </div>
              <p className="text-[14.4px] px-[7px] text-center flex ">
                {data?.course_name}
              </p>
            </div>
          </div>
        </td>
        <td>
          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
              {data?.discount_price} Tk
          </p>
        </td>
        <td>
          <div className="flex justify-center">
            <div className="border">
              <button type="button" onClick={decrementCourse} className="px-4 w-[30px] font-bold font_standard my-1.5">
                -
              </button>
            </div>
            <div className="border-y">
              <input
                type="number"
                name="course_qty"
                className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                value={qty}
              />
            </div>
            <div className="border">
              <button type="button" onClick={incrementCourse} className="px-4 w-[30px] font-bold font_standard my-1.5">
                +
              </button>
            </div>
          </div>
        </td>
        <td>
          <p name="sub_total_course_fee" className="text-[14.4px] font-bold p-[7px] text-black text-center">
            {data?.discount_price * qty} TK
          </p>
        </td>
      </tr>
    </>
  );
};

export default CardTbody;

CardTbody.propTypes = {
  data: PropTypes.any.isRequired,
  setQty: PropTypes.any.isRequired,
  qty: PropTypes.any.isRequired,
};
