import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import UseClasses from '../../hooks/UseClasses';

const PopularInstructorsSection = () => {
  // const [classesData, setClassesData] = useState([]);

  // useEffect(() => {
  //   // Fetch the classes data from the API
  //   fetch('http://localhost:5000/classes')
  //     .then((response) => response.json())
  //     .then((data) => setClassesData(data))
  //     .catch((error) => console.error(error));
  // }, []);

  const [classesData, loading] = UseClasses();

  // Generate instructors' data based on the classes' data and calculate total students
  const instructorsData = classesData.reduce((instructors, classItem) => {
    const { instructor } = classItem;
    const existingInstructor = instructors.find((instructorItem) => instructorItem.name === instructor);

    if (existingInstructor) {
      existingInstructor.classNames.push(classItem.name);
      existingInstructor.totalStudents += classItem.EnrolledStudents;
    } else {
      instructors.push({
        name: instructor,
        classNames: [classItem.name],
        totalStudents: classItem.EnrolledStudents,
      });
    }

    return instructors;
  }, []);

  // Sort instructors based on the total number of students in descending order
  const sortedInstructors = instructorsData.sort((a, b) => b.totalStudents - a.totalStudents);

  // Get the top 6 instructors
  const topInstructors = sortedInstructors.slice(0, 6);

  return (
    <div className='container'>
      <h2 className='text-center'>Popular Instructors</h2>
      <Row>
        {topInstructors.map((instructor) => (
          <Col key={instructor.name} sm={6} md={3} className='mb-4'>
            <Card className='class-card'>
              <Card.Img className='class-image' variant='top' src={instructor.image} alt={instructor.name} />
              <Card.Body>
                <Card.Title>{instructor.name}</Card.Title>
                <Card.Text>Students: {instructor.totalStudents}</Card.Text>
                <Card.Text>Classes: {instructor.classNames.join(', ')}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularInstructorsSection;
