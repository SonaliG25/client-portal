import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Category() {
  const [auth] = useAuth();
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [newCategory, setNewCategory] = useState(""); // For modal input
  const [selectedCategory, setSelectedCategory] = useState(null); // For viewing category
  const [updateCategory, setUpdateCategory] = useState({ name: "" }); // For updating category
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // For deleting category

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/category/allCategory`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setCategoryNameList(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
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

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleEditCategory = (category) => {
    setUpdateCategory({
      Updateid: category._id,
      name: category.name,
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
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
                      className="form-control form-control-md"
                      placeholder="Search..."
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary btn-md"
                        type="button"
                      >
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#addCategoryModal"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="row m-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <table
                    id="example2"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th className="text-center">Category</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryNameList.length > 0 ? (
                        categoryNameList.map((category) => (
                          <tr key={category._id}>
                            <td className="text-center">{category.name}</td>
                            <td className="text-center">
                              <div className="d-flex justify-content-center">
                                <button
                                  className="m-1 btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#viewCategoryModal"
                                  onClick={() => handleViewCategory(category)}
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
                                  onClick={() => handleEditCategory(category)}
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center">
                            No matching Category found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addCategoryModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Category</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="closeModalButton"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <label>Category Name</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter Category Name"
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddCategory}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Category Modal */}
      <div
        className="modal fade"
        id="viewCategoryModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="viewCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">View Category</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {selectedCategory ? (
                <div>
                  <label>Category:</label>
                  <input
                    className="form-control"
                    value={selectedCategory.name}
                    readOnly
                  />
                </div>
              ) : (
                <p>No category selected.</p>
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
        tabIndex={-1}
        role="dialog"
        aria-labelledby="editCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Category</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="closeEditModalButton"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <label>Category Name</label>
              <input
                type="text"
                value={updateCategory.name}
                onChange={(e) =>
                  setUpdateCategory({
                    ...updateCategory,
                    name: e.target.value,
                  })
                }
                placeholder="Enter New Category Name"
                className="form-control"
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
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Category Modal */}
      <div
        className="modal fade"
        id="deleteCategoryModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="deleteCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Category</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="closeDeleteModalButton"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this category?</p>
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
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
