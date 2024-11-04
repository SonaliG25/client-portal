import React, { useState, navigate, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { CardFooter, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

import { BASE_URL } from "../../utils/routeNames.js";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import { generatePDF } from "./generateProposalPdf.js";

const NewProposal = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [selectedProducts, setSelectedProducts] = useState(() => new Set());

  const [showProductModal, setShowProductModal] = useState(false);

  // Function to open the modal
  const handleShowProductModal = () => setShowProductModal(true);

  // Function to close the modal
  const handleCloseProductModal = () => setShowProductModal(false);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Adjust the number of products per page as needed
  const [searchQuery, setSearchQuery] = useState("");
  // Handle checkbox change
  // Handle checkbox change for each product
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected); // Create a copy of the Set

      if (newSelected.has(productId)) {
        newSelected.delete(productId); // Unselect if already selected
      } else {
        newSelected.add(productId); // Select if not already selected
      }

      return newSelected; // Return the new Set
    });
  };

  // Fetch products from API
  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/product/getProducts?page=${currentPage}&limit=${productsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      setTotalProducts(res.data.total || 0); // Ensure total is a valid number
      console.log("Product Data:", res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination control
  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const editor = useRef(null);
  const editorConfig = {
    minHeight: 400,
    readonly: false,
    toolbarSticky: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "ul",
      "ol",
      "font",
      "fontsize",
      "paragraph",
      "image",
      "link",
      "align",
      "undo",
      "redo",
    ],
    showXPathInStatusbar: false,
    spellcheck: false,
  };

  const [proposalData, setProposalData] = useState({
    emailTo: "",
    title: "",
    content: "",
    products: [],
    grandTotalCurrency: "",
    productTotal: 0,
    grandTotal: 0,
    discountOnGrandTotal: 0,
    finalAmount: 0,
  });
  // Variables to hold the calculated values
  const [productTotal, setProductTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discountOnGrandTotal, setDiscountOnGrandTotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  // Function to calculate totals whenever products change
  const calculateGrandTotals = () => {
    let total = 0;
    let discount = 0;

    proposalData.products.forEach((product) => {
      total += product.total; // Assuming product.total is already calculated based on quantity and unit price
      discount += product.discount; // Add discount to total discount
    });

    setProductTotal(total);
    setGrandTotal(total); // You may want to adjust this if you have other calculations for the grand total
    setDiscountOnGrandTotal(discount);
    setFinalAmount(total - discount); // Adjust if you need to factor in other fees
    // Update proposalData with new values
    setProposalData((prevData) => ({
      ...prevData,
      productTotal: total,
      grandTotal: total,
      discountOnGrandTotal: discount,
      finalAmount: finalAmount,
    }));
  };
  // Effect to recalculate totals whenever proposalData changes

  const handleDownloadPDF = () => {
    generatePDF(proposalData);
  };
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [proposalTemplates, setProposalTemplates] = useState([]);

  const [content, setContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/users", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setUsers(response.data.data);
      console.log("Users", response.data.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  const fetchProposalTemplates = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/proposalTemplate/templates`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setProposalTemplates(res.data.templates);
      console.log("Template : ", res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch users, proposal templates, and products on mount or when `auth` changes
  useEffect(() => {
    fetchUsers();
    fetchProposalTemplates();
    getProduct();
  }, [auth, currentPage, searchQuery]);

  // Separate useEffect for recalculating totals based only on proposalData changes
  useEffect(() => {
    calculateGrandTotals();
  }, [proposalData]);

  const handleTemplateSelect = (templateContent) => {
    setContent(templateContent);
    // setProposalData((prevData) => ({
    //   ...prevData,
    //   content: templateContent,
    // }));
    console.log("Selected TEmplate is : ", content);
    setShowModal(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposalData((prev) => ({ ...prev, [name]: value }));
  };

  // Update function to handle editor content changes
  const handleEditorChange = (newContent) => {
    setProposalData((prevData) => ({
      ...prevData,
      content: newContent,
    }));
  };

  // Calculate the total for each product based on quantity, price, discount, and discountType
  const calculateTotal = (quantity, salePrice, discount, discountType) => {
    console.log(
      "calculateTotal Data : ",
      quantity,
      salePrice,
      discount,
      discountType
    );
    // Parse values to ensure they are numbers
    quantity = parseFloat(quantity) || 0;
    salePrice = parseFloat(salePrice) || 0;
    discount = parseFloat(discount) || 0;

    // Base calculation without discount
    let total = quantity * salePrice;
    console.log("total before discount", total);
    // Apply discount if it’s positive
    if (total > 0) {
      if (discountType === "Fixed" && discount > 0) {
        total -= discount * quantity; // Apply fixed discount per item
        console.log("total on fixted disxount", total);
      } else if (discountType === "Percentage" && discount > 0) {
        total -= total * (discount / 100); // Apply percentage discount
        console.log("total on percentage discount", total);
      }
    }

    // Return total or ensure it doesn’t go below zero
    return total > 0 ? total : 0;
  };
  // Function to handle currency change
  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setProposalData((prevData) => ({
      ...prevData,
      grandTotalCurrency: newCurrency,
    }));
  };
  // / Handle change events to recalculate and update the total for each product
  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...proposalData.products];

    // Update the changed field
    updatedProducts[index][name] = value;

    // Parse values for calculation
    const quantity = parseFloat(updatedProducts[index].quantity) || 1;
    const salePrice = parseFloat(updatedProducts[index].price) || 0;
    const discount = parseFloat(updatedProducts[index].discount) || 0;
    const discountType = updatedProducts[index].discountType;

    // Recalculate total for this product
    updatedProducts[index].total = calculateTotal(
      quantity,
      salePrice,
      discount,
      discountType
    );
    console.log(
      "  updatedProducts[index].total :",
      updatedProducts[index].total
    );
    // Update proposal data
    setProposalData({ ...proposalData, products: updatedProducts });
    console.log("updatedProducts :", updatedProducts);
  };

  const removeProduct = (index) => {
    setProposalData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted proposal:", proposalData);
  };

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <Card className="card card-primary card-outline">
          <CardBody>
            <h5 className="card-header bg-primary text-white">New Proposal</h5>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Email To</Label>
                <Typeahead
                  id="user-selector"
                  options={users}
                  labelKey="email" // Adjust based on your user object, e.g., 'email' or 'name'
                  onChange={(selected) => setSelectedUser(selected[0] || null)}
                  selected={selectedUser ? [selectedUser] : []}
                  placeholder="Choose a user"
                />
              </FormGroup>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={proposalData.title}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              {/* Proposal Template Selection */}
              <Button onClick={() => setShowModal(true)}>
                Select Proposal Template
              </Button>

              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton className="bg-dark">
                  <Modal.Title className="text-white">
                    Select a Proposal Template
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ul className="list-unstyled">
                    {proposalTemplates.map((template) => (
                      <li key={template._id} className="mb-2">
                        <button
                          className="btn btn-secondary btn-block text-left"
                          onClick={() =>
                            handleTemplateSelect(template.description)
                          }
                        >
                          <i className="fas fa-file-alt mr-2"></i>
                          {template.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-dark"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </Modal.Footer>
              </Modal>

              <FormGroup>
                <Label>Content</Label>
                <JoditEditor
                  ref={editor}
                  config={editorConfig}
                  value={proposalData.content}
                  onBlur={(text) => handleEditorChange(text)}
                  //onChange={handleEditorChange}
                />
              </FormGroup>
              <div className="d-flex justify-content-start align-items-center mt-4 mb-4">
                <h5>Choose Currency</h5>
                <div className="col-3">
                  <Input
                    type="select"
                    name="currency"
                    value={proposalData.grandTotalCurrency}
                    onChange={handleCurrencyChange}
                    className="form-control"
                  >
                    <option value="$">$</option>
                    <option value="€">€</option>
                    <option value="₹">₹</option>
                    <option value="£">£</option>
                  </Input>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <h5>Selected Products</h5>
                <Button variant="primary" onClick={handleShowProductModal}>
                  Add Product
                </Button>
              </div>

              {/* Product ModalCOde */}
              <Modal
                show={showProductModal}
                onHide={handleCloseProductModal}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Search Bar */}
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <div className="input-group-append">
                      <Button variant="outline-secondary" onClick={getProduct}>
                        <i className="fa fa-search" />
                      </Button>
                    </div>
                  </div>

                  {/* Scrollable Product List */}
                  <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                    <table className="table table-bordered table-hover">
                      <thead
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "#f8f9fa",
                          zIndex: 1,
                        }}
                      >
                        <tr>
                          <th>Select</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length > 0 ? (
                          products.map((product) => (
                            <tr
                              key={product._id}
                              onClick={() => handleCheckboxChange(product._id)}
                              style={{ cursor: "pointer" }}
                            >
                              <td onClick={(e) => e.stopPropagation()}>
                                <div className="d-flex align-items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedProducts.has(product._id)}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      handleCheckboxChange(product._id);
                                    }}
                                    style={{ marginRight: "10px" }}
                                  />
                                  <img
                                    onError={(e) =>
                                      (e.target.src =
                                        BASE_URL + "/uploads/placeholder.png")
                                    }
                                    className="img-fluid img-cover rounded"
                                    src={BASE_URL + product.imageUrl}
                                    alt="product image"
                                    height={50}
                                    width={50}
                                  />
                                </div>
                              </td>
                              <td>{product.name}</td>
                              <td>{product.category}</td>
                              <td>
                                {product.currency + " " + product.salePrice}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No products found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="outline-secondary"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="align-self-center">
                      Page {currentPage}
                    </span>
                    <Button
                      variant="outline-secondary"
                      onClick={handleNextPage}
                      disabled={
                        currentPage >=
                        Math.ceil(totalProducts / productsPerPage)
                      }
                    >
                      Next
                    </Button>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseProductModal}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      const selectedProductArray = Array.from(
                        selectedProducts
                      ).map((productId) => {
                        const product = products.find(
                          (p) => p._id === productId
                        );
                        return {
                          productId: product._id,
                          name: product.name,
                          category: product.category,
                          price: product.salePrice,
                          total: product.salePrice,
                          discountType: "Fixed",
                          quantity: 1,
                          discount: 0,
                        };
                      });

                      setProposalData((prevData) => ({
                        ...prevData,
                        products: [
                          ...prevData.products,
                          ...selectedProductArray,
                        ],
                      }));

                      console.log("Selected Products:", selectedProductArray);
                      selectedProducts.clear();
                      handleCloseProductModal();
                    }}
                    disabled={selectedProducts.size === 0}
                  >
                    Confirm Selection
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* ENd of Product Modal Code */}
              {proposalData.products.length > 0 ? (
                <div className="table-responsive">
                  <Table bordered hover className="d-none d-md-table">
                    {" "}
                    {/* Hide on small devices */}
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposalData.products.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <div>
                              <strong>{product.name}</strong>
                              <br />
                              <span>{product.category}</span>
                            </div>
                          </td>
                          <td>
                            <Input
                              type="number"
                              name="quantity"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, e)}
                              min="1"
                              className="form-control"
                            />
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <input
                                type="number"
                                className="form-control me-2"
                                name="discount"
                                value={product.discount}
                                onChange={(e) => handleProductChange(index, e)}
                                min="0"
                                placeholder="Discount"
                              />
                              <select
                                className="form-control"
                                name="discountType"
                                value={product.discountType}
                                onChange={(e) => handleProductChange(index, e)}
                              >
                                <option value="Fixed">Fixed</option>
                                <option value="Percentage">Percentage</option>
                              </select>
                            </div>
                          </td>
                          <td>{product.total}</td>

                          <td>
                            <Button
                              color="danger"
                              onClick={() => removeProduct(index)}
                            >
                              X
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* Responsive Card Layout for Small Devices */}
                  <div className="d-md-none">
                    {proposalData.products.map((product, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">
                            <strong>Category:</strong> {product.category}
                          </p>
                          <div className="mb-2">
                            <strong>Quantity:</strong>
                            <Input
                              type="number"
                              name="quantity"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, e)}
                              min="1"
                              className="form-control"
                            />
                          </div>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <div>
                              <strong>Discount:</strong>
                              <input
                                type="number"
                                className="form-control"
                                name="discount"
                                value={product.discount}
                                onChange={(e) => handleProductChange(index, e)}
                                min="0"
                                placeholder="Discount"
                              />
                            </div>
                            <div>
                              <strong>Type:</strong>
                              <select
                                className="form-control"
                                name="discountType"
                                value={product.discountType}
                                onChange={(e) => handleProductChange(index, e)}
                              >
                                <option value="Fixed">Fixed</option>
                                <option value="Percentage">Percentage</option>
                              </select>
                            </div>
                          </div>
                          <p>
                            <strong>Total:</strong> {product.total}
                          </p>
                          <div className="mb-2">
                            <strong>Currency:</strong>
                            <Input
                              type="select"
                              name="currency"
                              value={product.currency}
                              onChange={(e) => handleProductChange(index, e)}
                              className="form-control"
                            >
                              <option value="$">$</option>
                              <option value="€">€</option>
                              <option value="₹">₹</option>
                              <option value="£">£</option>
                            </Input>
                          </div>
                          <Button
                            color="danger"
                            onClick={() => removeProduct(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>No products selected.</p>
              )}

              {/* Display Totals */}
              <div>
                <h5 className="text-left m-3">Totals</h5>

                <div className="card">
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Product Total:</span>
                        <span>
                          {proposalData.grandTotalCurrency}
                          {productTotal}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Grand Total:</span>
                        <span>
                          {proposalData.grandTotalCurrency}
                          {grandTotal}
                        </span>
                      </li>
                      {/* <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Discount on Grand Total:</span>
                        <span className="text-danger">
                          {proposalData.grandTotalCurrency}
                          {discountOnGrandTotal}
                        </span>
                      </li> */}
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Final Amount:</strong>
                        <strong>
                          {proposalData.grandTotalCurrency}
                          {finalAmount}
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Form>
          </CardBody>
          <CardFooter className="d-flex justify-content-end">
            <Button color="primary" onClick={handleDownloadPDF} type="submit">
              Send Proposal
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewProposal;
