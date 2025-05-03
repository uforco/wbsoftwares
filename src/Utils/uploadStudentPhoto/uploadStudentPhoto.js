const uploadStudentPhoto = async (data) => {
  const formData = new FormData();
  formData.append("image", data);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=1c14351c09253c456d1ae93a56763727`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data?.status === 200) {
      return data?.data?.display_url;
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};

export default uploadStudentPhoto;
