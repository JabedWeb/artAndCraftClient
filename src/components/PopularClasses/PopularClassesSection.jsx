import React from 'react';
import classesData from '../../assets/classes.json';
import { Card, Col, Row } from 'react-bootstrap';
import './PopularClassesSection.css'; // Import the custom CSS file

const PopularClassesSection = () => {
  const sortedClasses = classesData.sort((a, b) => b.students - a.students);
  const topClasses = sortedClasses.slice(0, 6);

  return (
    <div className='container'>
      <h2 className='text-center'>Popular Classes</h2>
      <Row>
        {topClasses.map((classItem) => (
          <Col key={classItem.id} md={3} className="mb-4">
            <Card className="class-card">
              <div className="class-image">
                <Card.Img variant="top" src={classItem.image} />
              </div>
              <Card.Body>
                <Card.Title>{classItem.name}</Card.Title>
                <Card.Text>Instructor: {classItem.instructor}</Card.Text>
                <Card.Text>Students: {classItem.students}</Card.Text>
                <Card.Text>Available Seats: {classItem.availableSeats}</Card.Text>
                <Card.Text>Price: ${classItem.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularClassesSection;
