import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddClass = () => {


  const handleSubmit = (e) => {
    e.preventDefault();

    const form =e.target;
    const name=form.instructorName.value;
    const email=form.instructorEmail.value;
    const className = form.className.value;
    const classImage = form.classImage.value;
    const totalSeats = form.total_seats.value;
    const price = form.price.value;

    const newClass = {
      name,
      email,
      className,
      classImage,
      totalSeats,
      price
    };

      fetch('http://localhost:5000/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    

  return (
    <div>
      <h2>Add a Class</h2>
      <Form onSubmit={handleSubmit}>
        
      <Form.Group controlId="instructorName">
          <Form.Label>Instructor Name</Form.Label>
          <Form.Control type="text" name='instructorName' />
        </Form.Group>

        <Form.Group controlId="instructorEmail">
          <Form.Label>Instructor Email</Form.Label>
          <Form.Control type="email" name='instructorEmail'/>
        </Form.Group>


        <Form.Group controlId="className">
          <Form.Label>Class Name</Form.Label>
          <Form.Control type="text" name='className' />
        </Form.Group>

        <Form.Group controlId="classImage">
          <Form.Label>Class Image</Form.Label>
          <Form.Control type="text" name='classImage'  />
        </Form.Group>


        <Form.Group controlId="TotalSeats">
          <Form.Label>Total Seats</Form.Label>
          <Form.Control type="number" name='total_seats' />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name='price' />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Class
        </Button>
      </Form>
    </div>
  );
};

export default AddClass;

