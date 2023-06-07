import React from 'react';
import instructorsData from '../../assets/instructors.json';
import classesData from '../../assets/classes.json';
import './PopularInstructorsSection.css'; // Import custom CSS file
import { Card, Row, Col } from 'react-bootstrap';

const PopularInstructorsSection = () => {
  // Sort instructors based on the number of students in their classes in descending order
  const sortedInstructors = instructorsData.sort((a, b) => {
    const totalStudentsA = a.classNames.reduce(
      (total, className) =>
        total +
        classesData
          .filter((classItem) => classItem.instructor === a.name && classItem.name === className)
          .reduce((sum, classItem) => sum + classItem.students, 0),
      0
    );

    const totalStudentsB = b.classNames.reduce(
      (total, className) =>
        total +
        classesData
          .filter((classItem) => classItem.instructor === b.name && classItem.name === className)
          .reduce((sum, classItem) => sum + classItem.students, 0),
      0
    );

    return totalStudentsB - totalStudentsA;
  });

  // Get the top 6 instructors
  const topInstructors = sortedInstructors.slice(0, 6);

  return (
    <div className='container'>
      <h2 className='text-center'>Popular Instructors</h2>
      <Row>
        {topInstructors.map((instructor) => (
          <Col key={instructor.id} sm={6} md={3} className="mb-4">
            <Card className="class-card">
              <Card.Img className="class-image" variant="top" src={instructor.image} alt={instructor.name} />
              <Card.Body>
                <Card.Title>{instructor.name}</Card.Title>
                <Card.Text>Students: {getTotalStudents(instructor)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// Helper function to calculate the total number of students for an instructor's courses
const getTotalStudents = (instructor) => {
  let totalStudents = 0;
  instructor.classNames.forEach((className) => {
    const classItem = classesData.find((item) => item.name === className && item.instructor === instructor.name);
    if (classItem) {
      totalStudents += classItem.students;
    }
  });
  return totalStudents;
};

export default PopularInstructorsSection;
