import React from 'react';
import classesData from '../../assets/classes.json';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './ClassesPage.css'; // Import custom CSS file

const ClassesPage = () => {
  const renderClasses = () => {
    return classesData.map((classItem) => (
      <Col key={classItem.id} sm={6} md={4} lg={3} className="mb-4">
        <Card className={classItem.availableSeats === 0 ? 'class-card sold-out' : 'class-card'}>
          <Card.Img variant="top" src={classItem.image} alt={classItem.name} />
          <Card.Body>
            <Card.Title>{classItem.name}</Card.Title>
            <Card.Text>Instructor: {classItem.instructor}</Card.Text>
            <Card.Text>Available Seats: {classItem.availableSeats}</Card.Text>
            <Card.Text>Price: ${classItem.price}</Card.Text>
            <Button disabled={classItem.availableSeats === 0 || classItem.isLoggedUserAdmin} variant="primary">
              {classItem.availableSeats === 0 ? 'Sold Out' : 'Select'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <div className='container'>
      <h2>Approved Classes</h2>
      <Row>{renderClasses()}</Row>
    </div>
  );
};

export default ClassesPage;
