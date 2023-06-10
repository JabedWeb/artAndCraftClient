import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import UseClasses from '../../hooks/UseClasses';

const PopularInstructorsSection = () => {


  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    // Fetch the classes data from the API
    fetch('http://localhost:5000/classes')
      .then((response) => response.json())
      .then((data) => setClassesData(data.popularInstructors))
      .catch((error) => console.error(error));
  }, []);


  return (
    <div className='container'>
      <h2 className='text-center'>Popular Instructors</h2>
      <Row>
        {classesData.map((instructor) => (
          <Col key={instructor.name} sm={6} md={3} className='mb-4'>
            <Card className='class-card'>
              <Card.Img className='class-image' variant='top' src={instructor.image} alt={instructor.name} />
              <Card.Body>
                <Card.Title>{instructor.instructor}</Card.Title>
                <Card.Text>Students: {instructor.totalEnrolledStudents}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularInstructorsSection;
