import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardTbody from "./CardTbody";

const Cart = () => {
    const [ deleteRefetch, setDeleteRefetch ] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const fetchCourses = async () => {
      try {
        const response = await fetch("https://itder.com/api/get-course-list");
        const data = await response.json();
        setFetching(false);
        const sortArr = data?.courseData?.filter((item) => {
          item.course_qty = 1;
          return cartItems.some((cartItem) => cartItem.id === item.id);
        });
        setCourses(sortArr);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setFetching(false);
      }
    };
    fetchCourses();
  }, [deleteRefetch]);


  return (
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
        Cart
      </h1>
      <div className="pt-p_16px">
        <div className="lg:flex items-start gap-3">
          <div className="w-full lg:w-[58%] bg-white border-2">
            <table className=" overflow-x-auto  w-full">
              <thead>
                <tr className="border-b-4 border-gray-300">
                  <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                    Course
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Price
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Quantity
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Sub Total
                  </th>
                </tr>
              </thead>
              {!fetching && (
                <tbody className="overflow-x-auto ">
                  {courses?.map((course) => (
                  <CardTbody key={course.id} data={course} setDeleteRefetch={setDeleteRefetch} />
                ))}
                </tbody>
              )}
            </table>
            {fetching && (
              <div className="flex justify-center items-center h-28">
                <div className=" border-t-4 border-l-4 border-[#06284a] w-12 h-12 rounded-full animate-spin "></div>
              </div>
            )}
          </div>
          <div className="lg:w-[41%] bg-white border-2 ">
            <div className="px-[30px]">
              <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                Cart Summary
              </h2>
              <div className="py-3 flex justify-between border-b border-gray-300">
                <p className="text-black font-bold">Total Price</p>
                <p className="text-black font-bold"></p>
              </div>

              <Link
                to={`/cart/checkout`}
                state={"bdt"}
                className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
