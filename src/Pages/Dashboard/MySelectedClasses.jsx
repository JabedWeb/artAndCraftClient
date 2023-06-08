import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MySelectedClasses = () => {
  const selectedClasses = [
    {
      id: 1,
      className: 'Class 1',
      instructor: 'Instructor 1',
      status: 'Pending',
    },
    {
      id: 2,
      className: 'Class 2',
      instructor: 'Instructor 2',
      status: 'Approved',
    },
  ];

  return (
    <div>
      <h2>My Selected Classes</h2>
      {selectedClasses.map((classItem) => (
        <Card key={classItem.id}>
          <Card.Body>
            <Card.Title>{classItem.className}</Card.Title>
            <Card.Text>
              Instructor: {classItem.instructor}
              <br />
              Status: {classItem.status}
            </Card.Text>
            <Button variant="danger">Delete</Button>
            <Button variant="primary">Pay</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MySelectedClasses;
