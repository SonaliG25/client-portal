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
        setUsers(response.data);
        console.log("Users", response.data);
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
        setProposalTemplates(res.data);
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
                  onChange={handleEditorChange}
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

              <Button color="primary" onClick={addProduct} className="mr-2">
                Add Product
              </Button>

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
