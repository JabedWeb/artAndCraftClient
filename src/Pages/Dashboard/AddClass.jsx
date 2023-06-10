import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';

const AddClass = () => {
  const { addedToast, wrongToast } = useContext(ToastContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form =e.target;
    const instructor=form.instructorName.value;
    const email=form.instructorEmail.value;
    const name = form.className.value;
    const image = form.classImage.value;
    const total_sets = form.total_seats.value;
    const price = parseInt(form.price.value);

    const newClass = {
      name,
      instructor,
      email,
      image,
      EnrolledStudents: 0,
      availableSeats : total_sets,
      total_sets,
      price,
      status: 'pending'
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
          addedToast();
          console.log('Success:', data);
          // form.reset();
          form.reset();
        })
        .catch((error) => {
          console.error('Error:', error);
          wrongToast();
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

