import React from "react";
import { useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate("/admin-dashboard/newProduct");
      };
    return (
        <>
         <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            
            <div className="m-2 d-flex  align-items-center">
            <h2 className="py-2 text-center">Products</h2>

              {/* <form className="flex-grow-1 mr-2">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="form-group mb-0">
                      <div className="input-group input-group-lg">
                        <input
                          type="search"
                          className="form-control form-control-lg"
                          placeholder="Search by First Name, Last Name or Phone"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-lg btn-outline-secondary"
                            type="button"
                          >
                            <i className="fa fa-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form> */}

              <button
                onClick={handleAddProduct}
                className="font-weight-bold btn btn-success px-4 py-2"
              >
                Add Product
              </button>
            </div>
            </div>
            </section>
            </div>
            </>
    );
}export default Products;