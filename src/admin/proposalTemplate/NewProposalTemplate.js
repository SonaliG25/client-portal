import React, { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Container,
  Row,
  Col,
} from "reactstrap";
import { BASE_URL } from "../../utils/endPointNames";

function NewProposalTemplate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [content, setContent] = useState("");
  const [titleValid, setTitleValid] = useState(null); // for validation
  const [descriptionValid, setDescriptionValid] = useState(null); // for validation
  const editor = useRef(null);
  const [auth] = useAuth();
  const navigate = useNavigate();

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

  const validateFields = () => {
    let valid = true;

    if (title === "") {
      setTitleValid(false);
      valid = false;
    } else {
      setTitleValid(true);
    }

    if (description === "") {
      setDescriptionValid(false);
      valid = false;
    } else {
      setDescriptionValid(true);
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    // navigate(-1)
    e.preventDefault();
    toast.success("Templete Added Suceessfully");
    if (!validateFields()) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/proposalTemplate/new`,
        {
          title,
          description,
          status,
          createdAt,
          updatedAt,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(res);
      navigate(-1);
      // navigate("/admin-dashboard/proposaltemplete");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <Container fluid>
            <Row className="mb-2">
              <Col xs="12" sm="6">
                <h1 className="text-dark">Add Proposal Template</h1>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="content">
          <Container>
            <Row>
              <Col md="12">
                <Card>
                  <div className="card-header">
                    <h3 className="card-title">New Template</h3>
                  </div>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label htmlFor="inputname">Title</Label>
                        <Input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          id="title"
                          className="form-control"
                          required
                          invalid={titleValid === false}
                          valid={titleValid === true}
                        />
                        <FormFeedback invalid>Title is required</FormFeedback>
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="inputDescription">Description</Label>
                        <JoditEditor
                          ref={editor}
                          config={editorConfig}
                          value={description}
                          onBlur={(newContent) => setDescription(newContent)}
                        />
                        {descriptionValid === false && (
                          <FormFeedback className="d-block">
                            Description is required
                          </FormFeedback>
                        )}
                      </FormGroup>

                      <Button
                        type="submit"
                        color="success"
                        className="btn-block"
                      >
                        Submit
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}

export default NewProposalTemplate;
