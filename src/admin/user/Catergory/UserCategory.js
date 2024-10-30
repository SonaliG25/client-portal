import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

function UserCategory() {
  const [auth] = useAuth();
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [isCategoryLoading, setLoading] = useState(true);
  const [value, setValue] = useState(""); // For modal input
  const [newCategory, setNewCategory] = useState(""); // For modal input
  const [selectedCategory, setSelectedCategory] = useState(null); // For viewing category
  const [updateCategory, setUpdateCategory] = useState({ name: "" }); // For updating category
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // For deleting category
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  //   console.log("ok categoryNameList", categoryNameList);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/category/allCategory?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log("gategaryData:", res.data);

      setLoading(false);
      setCategoryNameList(res.data.categories); // Adjust according to your response structure
      setTotalPages(res.data.totalPages); // Adjust according to your response structure
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage <= totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchCategories();
    }
  }, [auth, currentPage, searchQuery]);
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            <div className="col-md-4">
              <h1 className="text-left">Categories</h1>
            </div>
            <div className="col-md-8 d-flex justify-content-end">
              <div className="form-group mb-0 flex-grow-1 mr-3">
                <div className="input-group input-group-md">
                  <input
                    type="search"
                    value={value}
                    onKeyDown={(e) => {
                      setCurrentPage(1);
                      if (e.key === "Enter") {
                        setSearchQuery(value);
                      }
                    }}
                    onChange={handleSearchChange}
                    className="form-control form-control-md"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="row m-2">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isCategoryLoading && categoryNameList?.length
                      ? categoryNameList.map((category) => (
                          <tr key={category._id}>
                            <td>{category.name}</td>
                          </tr>
                        ))
                      : !isCategoryLoading && (
                          <tr>
                            <td colSpan={2}>No Data Found</td>
                          </tr>
                        )}
                    {isCategoryLoading &&
                      Array.from({ length: 3 }).map((_, index) => (
                        <tr key={index}>
                          <td
                            style={{ height: "70px" }}
                            className="line loading-shimmer"
                            colSpan="2"
                          >
                            &nbsp;
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="pagination m-2">
                  <button
                    className="btn btn-primary m-1"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={`page-${index + 1}`}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`btn m-1 ${
                        currentPage === index + 1 ? "bg-primary" : "btn-light"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="btn btn-primary m-1"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserCategory;
