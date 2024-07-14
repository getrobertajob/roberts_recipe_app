// imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

// component to display the form
function FormComponent({ selectedRecord, onFormSubmit, error, setError }) {
  // declare use states
  const [formData, setFormData] = useState({ // form data
                                    title: "",
                                    author: "",
                                    description: "",
                                  });
  const [editMode, setEditMode] = useState(false); // to enable or disable form inputs
  const [isNew, setIsNew] = useState(false); // to toggle between new record or old record for the save function check
  const [color, changeColor] = useState("white"); // to change background color when input is editable
  const [statusEditDelete, setStatusEditDelete] = useState(false); // to enable or disable edit & delete buttons
  useEffect(() => {
    // use effect run when the selected record changes
    // populates form data with the selected record
    // data was passed from table component
    if (selectedRecord) {
      setFormData({
        title: selectedRecord.title || "",
        author: selectedRecord.author || "",
        description: selectedRecord.description || "",
      });
      setEditMode(false);
      setIsNew(false);
      changeColor("white");
      setStatusEditDelete(false);
    }
  }, [selectedRecord]);

  // function to handle when form data has changed
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function to handle when user clicks on new button
  const handleNew = () => {
    setFormData({ 
              title: "", 
              author: "", 
              description: "" 
            });
    setEditMode(true);
    setIsNew(true);
    setStatusEditDelete(true);
    setError({});
    changeColor("rgb(146, 218, 241)");
  };

  // function to handle when user clicks on edit button
  const handleEdit = () => {
    setEditMode(true);
    setError({});
    changeColor("rgb(146, 218, 241)");
  };

  // function to handle when user clicks on delete button
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/records/${selectedRecord.id}/`
      );
      setFormData({ title: "", author: "", description: "" });
      setStatusEditDelete(true);
      setError({});
      alert("Delete was successful");
      onFormSubmit();
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  // function validate form data on user side
  // there is also validation on server side aswell as a backup
  // i like doing both client and server side
  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = { message: "Title is required" };
    if (!formData.author) newErrors.author = { message: "Author is required" };
    if (!formData.description) newErrors.description = { message: "Description is required" };
    return newErrors;
  };

  // function to handle when user clicks on save button
  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      setError({});
      if (isNew) {
        await axios.post(`${process.env.REACT_APP_API_URL}/records/`, formData);
      } else {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/records/${selectedRecord.id}/`, formData);
      }
      setFormData({ 
                title: "", 
                author: "", 
                description: "" 
              });
      setEditMode(false);
      setIsNew(false);
      setStatusEditDelete(true);
      onFormSubmit();
      alert("Save was successful");
      changeColor("white");
    } catch (error) {
      console.error("Error saving record:", error.response.data);
      setError(error.response.data.errors || {});
    }
  };

  return (
    <div className="Form">
      <div className="form-buttons">
        <Button
          variant="primary"
          onClick={handleNew}
        >
          New
        </Button>
        <Button
          variant="info"
          className="editBtn"
          onClick={handleEdit}
          disabled={!selectedRecord?.id || statusEditDelete}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={!selectedRecord?.id || statusEditDelete}
        >
          Delete
        </Button>
        <Button
          variant="success"
          size="lg"
          onClick={handleSave}
          disabled={!editMode}
        >
          Save
        </Button>
      </div>
      <div className="form-fields">
        <label>
          <InputGroup className="inputGroup" size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Recipe Title:</InputGroup.Text>
            <Form.Control
              name="title"
              style={{ backgroundColor: `${color}` }}
              type="text"
              aria-label="Title"
              aria-describedby="inputGroup-sizing-sm"
              value={formData.title}
              onChange={handleChange}
              disabled={!editMode}
            />
          </InputGroup>
          <p className="error-message">{error.title?.message}</p>
        </label>
        <label>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Author:</InputGroup.Text>
            <Form.Control
              name="author"
              style={{ backgroundColor: `${color}` }}
              aria-label="Author"
              aria-describedby="inputGroup-sizing-sm"
              value={formData.author}
              onChange={handleChange}
              disabled={!editMode}
            />
          </InputGroup>
          <p className="error-message">{error.author?.message}</p>
        </label>
        <label>
          <InputGroup>
            <InputGroup.Text>Recipe<br />Description:</InputGroup.Text>
            <Form.Control
              name="description"
              style={{ backgroundColor: `${color}` }}
              as="textarea"
              aria-label="Description"
              value={formData.description}
              onChange={handleChange}
              disabled={!editMode}
              rows="8"
            />
          </InputGroup>
          <p className="error-message">{error.description?.message}</p>
        </label>
      </div>
    </div>
  );
}

export default FormComponent;
