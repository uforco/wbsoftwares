import { useState } from "react";
// import { IoMdSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";
import OrderDetails from "../OrderDetails/OrderDetails";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get("phone"); // "01998769191"
  const orderId = queryParams.get("orderid"); // "01998769191"

  const [searchTerm, setSearchTerm] = useState({
    form_no: orderId ? orderId : "",
    phone_no: phone ? phone : "",
  });

  const [searchResults, setSearchResults] = useState({formid: "233333"});

  const handleSearch = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    // Handle the search logic here
    const response = await fetch(`https://itder.com/api/search-purchase-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    const data = await response.json();
    setSearchResults(data);
  };

  if (searchResults) {
    return <OrderDetails data={searchResults} ></OrderDetails>;
  }

  return (
    <div className="min-h-screen flex flex-col gap-1 text-text_40px font-bold items-center justify-center">
      <h1 className="w-[600px] mx-auto">Search here</h1>
      <form
        onSubmit={handleSearch}
        className=" h-full flex flex-col gap-10 text-text_40px font-bold items-center justify-center "
      >
        <div className="h-[36px] relative  text-lg col-span-4 w-[600px] mx-auto">
          <p>Form Number</p>
          <input
            type="text"
            name="form_no"
            placeholder="form_no"
            value={searchTerm.form_no}
            onChange={(e) =>
              setSearchTerm({ ...searchTerm, form_no: e.target.value })
            }
            className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
          />
        </div>
        <div className="h-[36px] relative  text-lg col-span-4 w-[600px] mx-auto">
          <p>Phone Number</p>
          <input
            type="text"
            name="phone_no"
            placeholder="phone_no"
            value={searchTerm.phone_no}
            onChange={(e) =>
              setSearchTerm({ ...searchTerm, phone_no: e.target.value })
            }
            className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
          />
        </div>
        <button
          type="submit"
          className="col-span-4 text-white w-[600px] mx-auto border mt-3 p-2 bg-[#06284a] hover:bg-[#06284a]/90 "
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
