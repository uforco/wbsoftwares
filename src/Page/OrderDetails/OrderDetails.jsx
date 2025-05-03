// import TrackOrder from "./TrackOrder";

import PropTypes from "prop-types";

const OrderDetails = ({ data }) => {
  // console.log("data", data);

  return (
    <div className=" m-mt_16px">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
        <div className="bg-white lg:p-p_30px w-full  ">
          <div className="text-center  flex flex-col justify-center items-center ">
            <p className="text-xl font-bold">Order Information</p>
            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
              Order Id : <span className="font-semibold">{data?.form_no}</span>
            </p>
          </div>

          <div className="w-full border flex flex-col md:flex-row md:items-start   md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4  ">
            <div className="md:text-base text-sm flex-1  font-semibold   md:border-r-2 md:border-black md:pr-10">
              <p className="font-bold md:mb-4 w-full">
                Demo information,Checkout page information will be here
              </p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Full Name :</p>
                  <p className="text-start">{data?.name}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Email :</p>
                  <p>{data?.email}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Mobile :</p>
                  <p>{data?.phone_no}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>date_of_birth :</p>
                  <p className="text-start">{data?.date_of_birth}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>nid_no :</p>
                  <p className="text-start">{data?.nid_no}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>School/Collage :</p>
                  <p>{data?.school_collage_name}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Job Title :</p>
                  <p>{data?.job_title}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>gender :</p>
                  <p className="text-start">{data?.gender}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Blood Group :</p>
                  <p className="text-start">{data?.blood_group }</p>
                </div>
              </div>
            </div>

            <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
              <p className="font-bold  md:mb-4 w-full">
                Demo information,Checkout page information will be here{" "}
              </p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Father Name :</p>
                  <p className="text-start">{data?.father_name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Father Phone :</p>
                  <p>{data?.father_phone_no}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Local Guardian Name :</p>
                  <p className="text-start">{data?.local_guardian_name}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Local Guardian Phone :</p>
                  <p>{data?.local_guardian_phone_no}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Present Address :</p>
                  <p className="text-start">{data?.present_address}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Permanent Address :</p>
                  <p>{data?.permanent_address}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Permanent Address :</p>
                  <p>{data?.permanent_address}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Admission Date :</p>
                  <p>{ new Date(data?.admission_date).toLocaleDateString() }</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Course Fee :</p>
                  <p>{data?.course_fee}</p>
                </div>

              </div>
            </div>
          </div>

          <div className="lg:my-8 md:my-6 my-8 px-p_4px">
            <p className=" md:my-2 font-semibold">Courses:</p>
            <table className="overflow-x-auto border w-full">
              <thead className="b w-full">
                <tr className="text-sm ">
                  <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border ">
                    Image
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Course Name
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Student Name
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
                    Quantity
                  </th>
                  <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                    Price
                  </th>
                  <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="md:text-base text-sm font-semibold">
                <tr>
                  <td className="border text-center w-10 h-12 px-2">
                    <img src={data?.course_data?.photo} alt="" />
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {data?.course_data?.course_name}
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {data?.name}
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {data?.course_qty}
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {data?.course_data?.discount_price}
                  </td>
                  <td className="lg:py-6 md:py-4 py-2 text-center border">
                    {data?.sub_total_course_fee}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

OrderDetails.propTypes = {
  data: PropTypes.any.isRequired,
};
