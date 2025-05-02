import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";


const Courses = () => {
  const [fetching, setFetching] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://itder.com/api/get-course-list");
        const data = await response.json();
        setFetching(false);
        setCourses(data?.courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setFetching(false);
      }
    };
    fetchCourses();
  }, []);

  console.log(courses[0]);

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className=" border-t-4 border-l-4 border-[#06284a] w-16 h-16 rounded-full animate-spin "></div>
      </div>
    );
  }

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;

