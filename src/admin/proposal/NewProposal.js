import React, { useState, navigate, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useNavigate } from "react-router-dom";
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

    fetchUsers();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposalData((prev) => ({ ...prev, [name]: value }));
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
                  id="user"
                  options={users}
                  labelKey="emailTo"
                  // onChange={(selected) => {
                  //   setFormData((prevData) => ({
                  //     ...prevData,
                  //     user: selected[0] || "", // Set selected category or empty string
                  //   }
                  // ));
                  // }}
                  // selected={formData.category ? [formData.category] : []}
                  placeholder="Choose a category"
                />
                <Input
                  type="email"
                  name="emailTo"
                  value={proposalData.emailTo}
                  onChange={handleInputChange}
                  required
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
              <FormGroup>
                <Label>Content</Label>
                <Input
                  type="textarea"
                  name="content"
                  value={proposalData.content}
                  onChange={handleInputChange}
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
