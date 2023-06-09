import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { authContext } from '../../providers/AuthProvider/AuthProvider';

const MySelectedClasses = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const { user } = useContext(authContext);
  useEffect(() => {
    // Fetch the classes data from the API
    fetch('http://localhost:5000/carts?email=' + user.email)
      .then((response) => response.json())
      .then((data) => {
        setSelectedClasses(data);
      });
  }, [user.email]);
  return (
    <div>
      <h2>My Selected Classes</h2>
      {selectedClasses.map((classItem) => (
        <Card key={classItem.id}>
          <Card.Body>
            <Card.Title>{classItem.name}</Card.Title>
            <Card.Text>
              Instructor: {classItem.instructor}
              <br />
              price: {classItem.price}
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
