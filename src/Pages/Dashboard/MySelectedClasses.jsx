import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { authContext } from '../../providers/AuthProvider/AuthProvider';
import UseCart from '../../hooks/UseCart';

const MySelectedClasses = () => {
  
  const { user } = useContext(authContext);

  const [cart, isLoading] = UseCart();

  return (
    <div>
      <h2>My Selected Classes</h2>
      {cart.map((classItem) => (
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
