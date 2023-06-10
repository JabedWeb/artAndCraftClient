import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import './PopularClassesSection.css'; // Import the custom CSS file

const PopularClassesSection = () => {

  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    // Fetch the classes data from the API
    fetch('http://localhost:5000/classes?limit=6')
      .then((response) => response.json())
      .then((data) => setClassesData(data.classes))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='container'>
      <h2 className='text-center'>Popular Classes</h2>
      <Row>
        {classesData.map((classItem) => (
          <Col key={classItem.id} md={3} className="mb-4">
            <Card className="class-card">
              <div className="class-image">
                <Card.Img variant="top" src={classItem.image} />
              </div>
              <Card.Body>
                <Card.Title>{classItem.name}</Card.Title>
                <Card.Text>Instructor: {classItem.instructor}</Card.Text>
                <Card.Text>Students: {classItem.EnrolledStudents}</Card.Text>
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
