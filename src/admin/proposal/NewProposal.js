import React, { useState, navigate, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
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

const NewProposal = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products

  const [showProductModal, setShowProductModal] = useState(false);

  // Function to open the modal
  const handleShowProductModal = () => setShowProductModal(true);

  // Function to close the modal
  const handleCloseProductModal = () => setShowProductModal(false);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Adjust the number of products per page as needed
  const [searchQuery, setSearchQuery] = useState("");
  // Handle checkbox change
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        // If already selected, remove it
        return prevSelected.filter((id) => id !== productId);
      } else {
        // If not selected, add it
        return [...prevSelected, productId];
      }
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

  // Call getProduct on component mount and when search query changes
  useEffect(() => {
    getProduct();
  }, [currentPage, searchQuery]);

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
    products: [
      {
        id: "",
        quantity: 1,
        discount: 0,
        total: 0,
        discountType: "Fixed",
        currency: "USD",
      },
    ],
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [proposalTemplates, setProposalTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Users
  useEffect(() => {
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

    fetchProposalTemplates();
    fetchUsers();
  }, [auth]);

  const handleTemplateSelect = (templateContent) => {
    setProposalData((prevData) => ({
      ...prevData,
      content: templateContent,
    }));
    console.log("Selected TEmplate is : ", proposalData.content);
    setShowModal(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setProposalData((prevData) => ({
      ...prevData,
      content,
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...proposalData.products];
    updatedProducts[index][name] = value;
    setProposalData((prev) => ({ ...prev, products: updatedProducts }));
  };

  const addProduct = () => {
    setProposalData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          id: "",
          quantity: 1,
          discount: 0,
          total: 0,
          discountType: "Fixed",
          currency: "USD",
        },
      ],
    }));
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
                  onBlur={(text)=>handleEditorChange(text)}
                  //onChange={handleEditorChange}
                />
              </FormGroup>

              <h6 className="mt-4">Selected Products</h6>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th>Discount Type</th>
                    <th>Currency</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proposalData.products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <Input
                          type="text"
                          name="id"
                          value={product.id}
                          onChange={(e) => handleProductChange(index, e)}
                          required
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          name="quantity"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, e)}
                          min="1"
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          name="discount"
                          value={product.discount}
                          onChange={(e) => handleProductChange(index, e)}
                          min="0"
                        />
                      </td>
                      <td>${product.total}</td>
                      <td>
                        <Input
                          type="select"
                          name="discountType"
                          value={product.discountType}
                          onChange={(e) => handleProductChange(index, e)}
                        >
                          <option value="Fixed">Fixed</option>
                          <option value="Percentage">Percentage</option>
                        </Input>
                      </td>
                      <td>
                        <Input
                          type="select"
                          name="currency"
                          value={product.currency}
                          onChange={(e) => handleProductChange(index, e)}
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="INR">INR</option>
                        </Input>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => removeProduct(index)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Open Product Modal */}
              <Button variant="primary" onClick={handleShowProductModal}>
                Add Product
              </Button>
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

                  {/* Product List */}
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Select</th>{" "}
                        {/* Add a header for the select column */}
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedProducts.includes(product.id)}
                                onChange={() =>
                                  handleCheckboxChange(product.id)
                                }
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
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
                      console.log("Selected Products:", selectedProducts); // Replace with your action
                    }}
                    disabled={selectedProducts.length === 0}
                  >
                    Confirm Selection
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* ENd of Product Modal Code */}
              <div className="mt-4">
                <p>
                  Product Total: $
                  {/* Calculate and display product total here */}
                </p>
                <p>
                  Grand Total: ${/* Calculate and display grand total here */}
                </p>
                <p>
                  Discount on Grand Total: $
                  {/* Calculate and display discount on grand total here */}
                </p>
                <p>
                  Final Amount: ${/* Calculate and display final amount here */}
                </p>
              </div>

              <Button color="success" type="submit">
                Submit Proposal
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default NewProposal;

// <Modal
//                 show={showProductModal}
//                 onHide={handleCloseProductModal}
//                 size="lg"
//               >
//                 <Modal.Header closeButton>
//                   <Modal.Title>Products</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   {/* Search Bar */}
//                   <div className="input-group mb-3">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Search products..."
//                       value={searchQuery}
//                       onChange={handleSearchChange}
//                     />
//                     <div className="input-group-append">
//                       <Button variant="outline-secondary" onClick={getProduct}>
//                         <i className="fa fa-search" />
//                       </Button>
//                     </div>
//                   </div>

//                   {/* Product List */}
//                   <Select
//                     isMulti
//                     options={products.map((product) => ({
//                       value: product._id, // Use the product ID as the value
//                       label: product.name, // Display product name
//                     }))}
//                     onChange={(selectedOptions) => {
//                       setSelectedProducts(selectedOptions); // Store selected products
//                     }}
//                     placeholder="Select products..."
//                   />

//                   {/* Pagination Controls */}
//                   <div className="d-flex justify-content-between mt-3">
//                     <Button
//                       variant="outline-secondary"
//                       onClick={handlePreviousPage}
//                       disabled={currentPage === 1}
//                     >
//                       Previous
//                     </Button>
//                     <span className="align-self-center">
//                       Page {currentPage}
//                     </span>
//                     <Button
//                       variant="outline-secondary"
//                       onClick={handleNextPage}
//                       disabled={
//                         currentPage >=
//                         Math.ceil(totalProducts / productsPerPage)
//                       }
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={handleCloseProductModal}>
//                     Close
//                   </Button>
//                   <Button
//                     variant="primary"
//                     onClick={() => {
//                       // Handle the selected products here
//                       const updatedProducts = selectedProducts.map(
//                         (option) => ({
//                           id: option.value,
//                           quantity: 1, // Default quantity
//                           discount: 0, // Default discount
//                           total: products.find(
//                             (product) => product._id === option.value
//                           ).price,
//                           discountType: "Fixed",
//                           currency: "USD",
//                         })
//                       );

//                       // Update the proposal data with the selected products
//                       setProposalData((prev) => ({
//                         ...prev,
//                         products: [...prev.products, ...updatedProducts],
//                       }));

//                       // Clear selected products and close modal
//                       setSelectedProducts([]);
//                       handleCloseProductModal();
//                     }}
//                     disabled={selectedProducts.length === 0}
//                   >
//                     Save Products
//                   </Button>
//                 </Modal.Footer>
//               </Modal>
