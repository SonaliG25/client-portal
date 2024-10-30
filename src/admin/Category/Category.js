import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Category() {
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

  const handleAddCategory = async () => {
    const categoryExists = categoryNameList.some(
      (category) => category.name.toLowerCase() === newCategory.toLowerCase()
    );

    if (categoryExists) {
      setErrorMessage("Category already exists");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/category/new`,
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setNewCategory("");
      setErrorMessage("");
      fetchCategories(); // Refresh categories
      document.getElementById("closeModalButton").click(); // Close modal
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/category/${updateCategory.Updateid}`,
        { name: updateCategory.name },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      fetchCategories();
      document.getElementById("closeEditModalButton").click(); // Close modal
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/category/${deleteCategoryId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      fetchCategories();
      setDeleteCategoryId(null);
      document.getElementById("closeDeleteModalButton").click(); // Close modal
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openAddCategoryModal = () => {
    setNewCategory("");
    setErrorMessage("");
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
    <>
      <div className="content-wrapper">
        {/* Content Header */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-between my-3">
              <div className="col-md-4 col-sm-12 mb-2">
                <h1 className="text-left">Categories</h1>
              </div>
              <div className="col-md-8 col-sm-12 d-flex flex-wrap align-items-center">
                {/* Search Input */}
                <div className="form-group mb-0 flex-grow-1 mr-2 my-2">
                  <div className="input-group input-group-md">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-control form-control-md"
                      placeholder="Search..."
                    />
                  </div>
                </div>
                {/* Add Category Button */}
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#addCategoryModal"
                  onClick={openAddCategoryModal}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row m-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!isCategoryLoading && categoryNameList?.length
                            ? categoryNameList.map((category) => (
                                <tr key={category._id}>
                                  <td>{category.name}</td>
                                  <td className="text-center">
                                    <div className="d-flex justify-content-center">
                                      <button
                                        className="m-1 btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#viewCategoryModal"
                                        onClick={() =>
                                          setSelectedCategory(category)
                                        }
                                      >
                                        View
                                      </button>
                                      <button
                                        className="m-1 btn btn-danger"
                                        data-toggle="modal"
                                        data-target="#deleteCategoryModal"
                                        onClick={() =>
                                          setDeleteCategoryId(category._id)
                                        }
                                      >
                                        Delete
                                      </button>
                                      <button
                                        className="m-1 btn btn-dark"
                                        data-toggle="modal"
                                        data-target="#editCategoryModal"
                                        onClick={() =>
                                          setUpdateCategory({
                                            Updateid: category._id,
                                            name: category.name,
                                          })
                                        }
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : !isCategoryLoading && (
                                <tr>
                                  <td colSpan={2}>No Data Found</td>
                                </tr>
                              )}
                          {isCategoryLoading &&
                            Array.from({ length: 5 }).map((_, index) => (
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
                    </div>
                    {/* Pagination Controls */}
                    <div className="pagination m-2 d-flex flex-wrap">
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
                            currentPage === index + 1
                              ? "bg-primary"
                              : "btn-light"
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
          </div>
        </section>
      </div>

      {/* Add Category Modal */}
      <div
        className="modal fade"
        id="addCategoryModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCategoryModalLabel">
                Add Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="closeModalButton"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Category Modal */}
      <div
        className="modal fade"
        id="viewCategoryModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="viewCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewCategoryModalLabel">
                View Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {selectedCategory ? (
                <div>
                  <h5>Name: {selectedCategory.name}</h5>
                  {/* Add more details here if needed */}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      <div
        className="modal fade"
        id="editCategoryModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editCategoryModalLabel">
                Edit Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={updateCategory.name}
                onChange={(e) =>
                  setUpdateCategory({ ...updateCategory, name: e.target.value })
                }
                placeholder="Enter new category name"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="closeEditModalButton"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Category Modal */}
      <div
        className="modal fade"
        id="deleteCategoryModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteCategoryModalLabel">
                Delete Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this category?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="closeDeleteModalButton"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
