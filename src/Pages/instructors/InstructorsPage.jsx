import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './InstructorsPage.css'; // Import the custom CSS file

const InstructorsPage = () => {
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    // Fetch the classes data from the API
    fetch('http://localhost:5000/classes')
      .then((response) => response.json())
      .then((data) => setClassesData(data))
      .catch((error) => console.error(error));
  }, []);

  // Generate instructors' data with class count and unique class names
  const instructorsData = classesData.reduce((instructors, classItem) => {
    const { instructor, name } = classItem;
    const existingInstructor = instructors.find((instructorItem) => instructorItem.name === instructor);

    if (existingInstructor) {
      if (!existingInstructor.classNames.includes(name)) {
        existingInstructor.classNames.push(name);
      }
    } else {
      instructors.push({
        name: instructor,
        classNames: [name],
      });
    }

    return instructors;
  }, []);

  return (
    <div className='container'>
      <h2>Instructors</h2>
      <Row>
        {instructorsData.map((instructor, index) => (
          <Col key={index} sm={6} md={4} lg={3} className='mb-4'>
            <Card className='instructor-card'>
              <Card.Img variant='top' src={instructor.image} alt={instructor.name} className='card-image' />
              <Card.Body>
                <Card.Title className='card-title'>{instructor.name}</Card.Title>
                <Card.Text className='card-email'>Email: {instructor.email}</Card.Text>
                <Card.Text className='card-classes-taken'>Classes Taken: {instructor.classNames.length}</Card.Text>
                <Card.Text className='card-all-classes'>All Classes: {instructor.classNames.join(', ')}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InstructorsPage;
