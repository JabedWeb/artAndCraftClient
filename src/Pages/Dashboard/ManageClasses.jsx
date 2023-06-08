import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch the classes data from the API
    fetch('http://localhost:5000/classes')
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error(error));
  }, []);

  const [selectedClass, setSelectedClass] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleApprove = (classId) => {
    const updatedClasses = classes.map((cls) => {
      if (cls.id === classId) {
        return { ...cls, status: 'approved' };
      }
      return cls;
    });
    setClasses(updatedClasses);
  };

  const handleDeny = (classId) => {
    const updatedClasses = classes.map((cls) => {
      if (cls.id === classId) {
        return { ...cls, status: 'denied' };
      }
      return cls;
    });
    setClasses(updatedClasses);
  };

  const handleSendFeedback = () => {
    // Handle sending feedback to the instructor here
    // You can use the feedback state to get the feedback message
    setShowModal(false);
  };

  const openModal = (classId) => {
    const selectedClass = classes.find((cls) => cls.id === classId);
    setSelectedClass(selectedClass);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
    setFeedback('');
  };

  return (
    <div>
      <h2>Manage Classes</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Class Image</th>
            <th>Class Name</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id} className='align-middle'>
              <td>{/* Add class image here */}</td>
              <td>{cls.className}</td>
              <td>{cls.instructor}</td>
              <td>{cls.email}</td>
              <td>{cls.availableSeats}</td>
              <td>{cls.price}</td>
              <td>{cls.status}</td>
              <td className='d-flex flex-column'>
                {cls.status === 'pending' && (
                  <>
                    <Button variant="success" onClick={() => handleApprove(cls.id)}>
                      Approve
                    </Button>
                    <Button className='my-1' variant="danger" onClick={() => handleDeny(cls.id)}>
                      Deny
                    </Button>
                    <Button variant="primary" onClick={() => openModal(cls.id)}>
                      Send Feedback
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="feedback">
            <Form.Label>Feedback</Form.Label>
            <Form.Control as="textarea" rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendFeedback}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageClasses;
