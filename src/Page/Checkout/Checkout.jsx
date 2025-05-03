// import React from "react";
import { useEffect, useState } from "react";
import CardTbody from "../Cart/CardTbody";
import ViewStudentPhoto from "./ViewStudentPhoto";
import { toast } from "react-toastify";
// import uploadStudentPhoto from "../../Utils/uploadStudentPhoto/uploadStudentPhoto";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  let navigate = useNavigate();
  const [deleteRefetch, setDeleteRefetch] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [courses, setCourses] = useState([]);

  // Data Fetching with courses by sort to cart items
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const fetchCourses = async () => {
      if (courses.length < 1) {
        setFetching(true);
      }
      try {
        const response = await fetch("https://itder.com/api/get-course-list");
        const data = await response.json();
        const sortArr = await data?.courseData?.filter((item) => {
          return cartItems.some((cartItem) => {
            if (cartItem.id === item.id) {
              item.course_qty = Number(cartItem?.course_qty);
              return true;
            } else {
              return false;
            }
          });
        });
        setCourses(sortArr);
        setFetching(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setFetching(false);
      }
    };
    fetchCourses();
  }, [courses.length, deleteRefetch]);

  // purchase process system
  const submitHeandler = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newData = {
      course_id: courses[0]?.id,
      admission_date: new Date().toISOString(),
      photo: data.ViewStudentPhoto, // e.target.ViewStudentPhoto?.files[0] - png jpeg
      name: data?.fullName,
      father_name: data?.parentName,
      father_phone_no: data?.parentNumber,
      school_collage_name: data?.school,
      job_title: data?.jobTitle,
      email: data?.email,
      gender: data?.gender,
      present_address: data?.presentAddress,
      permanent_address: data?.permanentAddress,
      nid_no: data?.nid,
      phone_no: data?.phoneNumber,
      local_guardian_name: data?.Local_Guardian_Name,
      local_guardian_phone_no: data?.Local_Guardian_Phone,
      date_of_birth: data?.dob,
      blood_group: data?.bloodGroup,
      course_fee: 12000,
      course_qty: Number(data?.course_qty),
      total_course_fee: courses[0]?.regular_price * data?.course_qty,
      discount_course_fee: Number(courses[0]?.discount_price),
      sub_total_course_fee: courses[0]?.discount_price * data?.course_qty,
    };

    let newformData = new FormData();
    for (const key in newData) {
      if (key === "photo" && newData[key] instanceof File) {
        newformData.append(key, newData[key]);
      } else {
        newformData.append(key, newData[key]?.toString() ?? "");
      }
    }

    const response = await fetch("https://itder.com/api/course-purchase", {
      method: "POST",
      body: newformData,
    });
    const result = await response.json();

    // navigate and reset Form system
    if (result?.status_code != 201) {
      toast.warning(result?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    toast.success(result?.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = cartItems.filter(
      (item) => item.id != result?.coursePurchaseData?.course_id
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    newformData = new FormData();
    formData = new FormData();
    e.target.reset();

    navigate(
      `/search?phone=${result?.coursePurchaseData?.phone_no}&orderid=${result?.coursePurchaseData?.form_no}`
    );
  };

  return (
    <div className="  mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        onSubmit={submitHeandler}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Trainee Information Section */}
        <div className="form-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullName"
                className="block font-semibold text-base mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required={true}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                required={true}
                name="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block font-semibold text-base mb-2"
              >
                Phone:
              </label>
              <input
                type="text"
                required={true}
                name="phoneNumber"
                id="phoneNumber"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Name:
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required={true}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Phone:
              </label>
              <input
                type="text"
                required={true}
                name="parentNumber"
                id="parentNumber"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2"
              >
                School/College:
              </label>
              <input
                type="text"
                required={true}
                name="school"
                id="school"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="jobTitle"
                className="block font-semibold text-base mb-2"
              >
                Job Title:
              </label>
              <input
                type="text"
                required={true}
                name="jobTitle"
                id="jobTitle"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="Local_Guardian_Name"
                className="block font-semibold text-base mb-2"
              >
                Local_Guardian_Name:
              </label>
              <input
                type="text"
                id="Local_Guardian_Name"
                required={true}
                name="Local_Guardian_Name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="Local_Guardian_Phone"
                className="block font-semibold text-base mb-2"
              >
                Local_Guardian_Phone:
              </label>
              <input
                type="text"
                id="Local_Guardian_Phone"
                required={true}
                name="Local_Guardian_Phone"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                type="text"
                id="nid"
                required={true}
                name="nid"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                required={true}
                name="dob"
                id="dob"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                id="gender"
                required={true}
                name="gender"
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                id="bloodGroup"
                required={true}
                name="bloodGroup"
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled selected>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2"
              >
                Present Address:
              </label>
              <textarea
                id="presentAddress"
                required={true}
                name="presentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <textarea
                id="permanentAddress"
                required={true}
                name="permanentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <ViewStudentPhoto></ViewStudentPhoto>
        </div>

        <div className="m-mt_16px">
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
                        <CardTbody
                          key={course.id}
                          data={course}
                          setDeleteRefetch={setDeleteRefetch}
                        />
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
                    <p className="text-black font-bold">{/* {totalPric} */}</p>
                  </div>

                  <button
                    type="submit"
                    className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                  >
                    Purchase The Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
