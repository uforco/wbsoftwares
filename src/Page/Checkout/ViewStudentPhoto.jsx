import React from "react";

const ViewStudentPhoto = () => {
  const [studentPhoto, setStudentPhoto] = React.useState(null);

    // const handleFileChange = async (event) => {
    //   const file = event.target.files?.[0];
    //   if (!file) return;

    //   const formData = new FormData();
    //   formData.append("image", file);
    //   try {
    //     const res = await fetch(
    //       `https://api.imgbb.com/1/upload?key=1c14351c09253c456d1ae93a56763727`,
    //       {
    //         method: "POST",
    //         body: formData,
    //       }
    //     );

    //     const data = await res.json();
    //     if (data?.status === 200) {
    //       setStudentPhoto({
    //         img: data?.data?.display_url,
    //         delete_url: data?.data?.delete_url,
    //       });
    //     } 
    //   } catch (error) {
    //     console.error("Upload error:", error);
    //   }
    // };

  // setStudentPhoto(URL.createObjectURL(e.target.files[0]));
  //             console.log(e.target.files, "e.target.files[0]");


  return (
    <div className="w-full mb-4 h-36 relative  ">
      <div>
        <label className="block font-semibold text-base mb-2 w-full h-full ">
          Student Photo:
        </label>
      </div>

      <div className="w-full h-full absolute top-6 left-0 flex items-center justify-center border-2  bg-gray-200  border-gray-300 rounded-md overflow-hidden ">
        {studentPhoto && (
          <div className=" relative h-full z-40   ">
            <button
              type="button"
              onClick={() => setStudentPhoto(null)}
              className=" absolute right-0 top-0 bg-red-500 rounded w-6 h-6  "
            >
              x
            </button>
            <img
              className=" h-full  rounded-md z-40 "
              src={
                studentPhoto
                  ? studentPhoto
                  : "https://i.ibb.co/6s0x2gK/placeholder.png"
              }
              alt="Student Photo"
            ></img>
          </div>
        )}
      </div>
      <div className=" w-full  h-full absolute left-0 top-6 z-10 ">
        {!studentPhoto && (
          <label
            htmlFor="ViewStudentPhoto"
            className=" font-semibold text-base mb-2 border w-full h-full flex items-center justify-center cursor-pointer text-center rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Upload
          </label>
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setStudentPhoto(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          id="ViewStudentPhoto"
          name="ViewStudentPhoto"
          className=" border w-0 h-0 border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  );
};

export default ViewStudentPhoto;
