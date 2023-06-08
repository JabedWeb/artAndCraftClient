import React from 'react';
import { Card } from 'react-bootstrap';

const MyEnrolledClasses = () => {
  const enrolledClasses = [
    {
      id: 1,
      className: 'Class 3',
      instructor: 'Instructor 3',
    },
    {
      id: 2,
      className: 'Class 4',
      instructor: 'Instructor 4',
    },
  ];

  return (
    <div>
      <h2>My Enrolled Classes</h2>
      {enrolledClasses.map((classItem) => (
        <Card key={classItem.id}>
          <Card.Body>
            <Card.Title>{classItem.className}</Card.Title>
            <Card.Text>Instructor: {classItem.instructor}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MyEnrolledClasses;
