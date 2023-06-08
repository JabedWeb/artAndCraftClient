import React, { useState } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';

const MyClasses = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      className: 'Art 101',
      status: 'approved',
      totalEnrolledStudents: 10,
      feedback: '',
    },
    {
      id: 2,
      className: 'Painting Basics',
      status: 'denied',
      totalEnrolledStudents: 0,
      feedback: 'Class content needs improvement',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleUpdateClick = (classId) => {
    const selected = classes.find((classItem) => classItem.id === classId);
    setSelectedClass(selected);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedClass(null);
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Simulating API call to update class information
    const updatedClasses = classes.map((classItem) => {
      if (classItem.id === selectedClass.id) {
        return selectedClass;
      }
      return classItem;
    });
    setClasses(updatedClasses);
    // Close the modal
    handleModalClose();
  };

  return (
    <div>
      <h2>My Classes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Status</th>
            <th>Total Enrolled Students</th>
            <th>Feedback</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem.id}>
              <td>{classItem.className}</td>
              <td>{classItem.status}</td>
              <td>{classItem.totalEnrolledStudents}</td>
              <td>{classItem.status === 'denied' ? classItem.feedback : '-'}</td>
              <td>
                {classItem.status === 'denied' ? (
                  <button disabled>Update</button>
                ) : (
                  <button onClick={() => handleUpdateClick(classItem.id)}>Update</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="className">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter class name"
                value={selectedClass ? selectedClass.className : ''}
                onChange={(e) =>
                  setSelectedClass({ ...selectedClass, className: e.target.value })
                }
              />
            </Form.Group>
            {/* Add other form fields for updating class information */}
            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyClasses;
