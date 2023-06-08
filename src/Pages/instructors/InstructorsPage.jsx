import React from 'react';
import instructorsData from '../../assets/instructors.json';
import { Card, Row, Col } from 'react-bootstrap';
import './InstructorsPage.css'; // Import the custom CSS file

const InstructorsPage = () => {
  return (
    <div className='container'>
      <h2>Instructors</h2>
      <Row>
        {instructorsData.map((instructor) => (
          <Col key={instructor.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="instructor-card">
              <Card.Img variant="top" src={instructor.image} alt={instructor.name} className="card-image" />
              <Card.Body>
                <Card.Title className="card-title">{instructor.name}</Card.Title>
                <Card.Text className="card-email">Email: {instructor.email}</Card.Text>
                <Card.Text className="card-classes-taken">Classes Taken: {instructor.classesTaken}</Card.Text>
                <Card.Text className="card-class-names">Classes: {instructor.classNames.join(', ')}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InstructorsPage;
