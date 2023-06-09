import React, { useContext, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './ClassesPage.css'; // Import custom CSS file
import { authContext } from '../../providers/AuthProvider/AuthProvider';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';
import { useNavigate } from 'react-router-dom';
import UseClasses from '../../hooks/UseClasses';

const ClassesPage = () => {
  const navigate = useNavigate();
  const { addedToast, wrongToast } = useContext(ToastContext);
  const { user } = useContext(authContext);


  const [classesData, loading] = UseClasses();
  const handleAddToCart = item => {
    const { name, image, price, _id ,instructor} = item;
    console.log(item);
    if(user && user.email){
        const cartItem = {classItemId: _id, name,instructor, image, price, email: user.email}
        fetch('http://localhost:5000/carts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
              addedToast();
            }
        })
    }
    else{
      wrongToast();
      navigate('/login');
    }
}


  return (
    <div className='container'>
      <h2>Approved Classes</h2>
      <Row>
      {classesData.map((classItem) => (
      <Col key={classItem.id} sm={6} md={4} lg={3} className="mb-4">
        <Card className={classItem.availableSeats === 0 ? 'class-card sold-out' : 'class-card'}>
          <Card.Img variant="top" src={classItem.image} alt={classItem.name} />
          <Card.Body>
            <Card.Title>{classItem.name}</Card.Title>
            <Card.Text>Instructor: {classItem.instructor}</Card.Text>
            <Card.Text>Available Seats: {classItem.availableSeats}</Card.Text>
            <Card.Text>Price: ${classItem.price}</Card.Text>
            <Button onClick={() => handleAddToCart(classItem)}  disabled={classItem.availableSeats === 0 || classItem.isLoggedUserAdmin} variant="primary">
              {classItem.availableSeats === 0 ? 'Sold Out' : 'Select'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
      ))}
        </Row>
    </div>
  );
};


export default ClassesPage;
