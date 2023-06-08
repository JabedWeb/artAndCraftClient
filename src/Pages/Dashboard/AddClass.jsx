import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddClass = ({ loggedInInstructor }) => {
  const [className, setClassName] = useState('');
  const [classImage, setClassImage] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const classData = {
      className,
      classImage,
      instructorName: "Jabed",
      instructorEmail: "jabedhasan231@gmail.com",
      totalSeats,
      price,
      status: 'pending',
    };

    try {
      const response = await fetch('https://example.com/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (response.ok) {
        // Class successfully added, perform any necessary actions
        console.log('Class added successfully');
      } else {
        // Handle API error or validation errors
        console.log('Error adding class');
      }
    } catch (error) {
      // Handle network or server error
      console.log('Error:', error.message);
    }

    // Reset form fields
    setClassName('');
    setClassImage('');
    setTotalSeats(0);
    setPrice(0);
  };

  return (
    <div>
      <h2>Add a Class</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="className">
          <Form.Label>Class Name</Form.Label>
          <Form.Control type="text" value={className} onChange={(e) => setClassName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="classImage">
          <Form.Label>Class Image</Form.Label>
          <Form.Control type="text" value={classImage} onChange={(e) => setClassImage(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="instructorName">
          <Form.Label>Instructor Name</Form.Label>
          <Form.Control type="text" value='NAME' readOnly />
        </Form.Group>

        <Form.Group controlId="instructorEmail">
          <Form.Label>Instructor Email</Form.Label>
          <Form.Control type="email" value='email' readOnly />
        </Form.Group>

        <Form.Group controlId="TotalSeats">
          <Form.Label>Total Seats</Form.Label>
          <Form.Control type="number" value={totalSeats} onChange={(e) => setTotalSeats(Number(e.target.value))} />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Class
        </Button>
      </Form>
    </div>
  );
};

export default AddClass;

