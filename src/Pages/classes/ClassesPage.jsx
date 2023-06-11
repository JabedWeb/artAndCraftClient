import React, { useContext, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './ClassesPage.css'; // Import custom CSS file
import { authContext } from '../../providers/AuthProvider/AuthProvider';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';
import { useNavigate } from 'react-router-dom';
import UseClasses from '../../hooks/UseClasses';
import UseCart from '../../hooks/UseCart';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const ClassesPage = () => {
  const navigate = useNavigate();
  const { addedToast, wrongToast,wrongPurchase } = useContext(ToastContext);
  const { user,loader } = useContext(authContext);
  const [classesData,isLoading,refetch] = UseClasses();
  //const [cart, , reft] = UseCart();
  const [axiosSecure] = UseAxiosSecure();

  const handleAddToCart = item => {

    const { name, image, price, _id ,instructor} = item;


    if(user && user.email){
      // if(cart.length > 0){
      //       const isCart = cart.find(item => item.classItemId === _id);
      //       if(isCart){
      //       wrongPurchase();
      //       }
      // }
        const cartItem = {classItemId: _id, name,instructor, image, price, email: user.email}
        axiosSecure.post('/carts', cartItem)
        .then(res => res.data)
        .then(data => {
          if(data.insertedId){
            //reft();
            axiosSecure.patch('/classes/'+_id, {
              availableSeats: item.availableSeats - 1,
              EnrolledStudents: item.EnrolledStudents + 1,
            })
            .then(res =>{ res.data
              refetch();
              addedToast();
            }
            )
            .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    }else{
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
