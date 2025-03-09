/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/myContext";
import { toast } from "react-toastify";
import InsightCard from "../components/insightCard";

export default function Insights() {
  const [imList, setImlist] = useState([]);
  const [imToShow, setImToShow] = useState([]);
  const { backendHost, toastOptions } = useContext(MyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const API_CALL = async () => {
      const res = await fetch(backendHost + "/api/admin/getInsights", {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        setImlist(data.data);
        setImToShow(data.data);
        toast.success("Fetched Insights", toastOptions);
        console.log(imList);
      }
    };
    API_CALL();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = imToShow.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-y-5 mt-24 md:mt-5 pt-10">
      {/* Insight List */}
      <div className="flex flex-col md:flex-row flex-wrap w-full gap-x-5 items-center justify-center gap-y-5 px-5 md:px-2">
        {currentItems.map((elem) => (
          <InsightCard
            insight={{ ...elem, imgsrc: backendHost + "/" + elem.imgsrc }}
            key={elem.id}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-5">
        {Array.from({ length: Math.ceil(imToShow.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
