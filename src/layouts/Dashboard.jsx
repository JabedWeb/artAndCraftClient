import React, { useContext, useEffect, useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { authContext } from '../providers/AuthProvider/AuthProvider';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

export const Dashboard = () => {
  const navigate = useNavigate();

  const {user,loader}=useContext(authContext);
  const [axiosSecure]=UseAxiosSecure();
  // State to store the user role
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    console.log(user);
    if (user) {
      console.log("I am in dashboard");
      // Fetch the user role from the API by the user.email
      axiosSecure.get(`/users/${user.email}`)
        .then((res) => {
          console.log(res.data);
          setUserRole(res.data.role);
        })
        .catch((err) => console.log(err));
    }
    else{
      if(!loader){
        navigate('/login');
        console.log("I am in dashboard else");
      }
    }
  }, [user]);

  
  if (loader || userRole === null) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
<div className="container mt-5">
    <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          {userRole === 'student' && (
            <>
              <Link to="/dashboard/selectedClass">Selected Class</Link>
              <Link to="/dashboard/enrolledClass">Enrolled Class</Link>
              <Link to="/dashboard/PaymentList">Payment History</Link>
            </>
          )}
          {userRole === 'instructor' && (
            <>
             <Link to="/dashboard/addClass">Add Class</Link>
              <Link to="/dashboard/myClasses">My Class</Link>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <Link to="/dashboard/manageUsers">Manage Users</Link>
              <Link to="/dashboard/manageClasses">Manage Classes</Link>
            </>
          )}
        </Nav>
      </Col>
      <Col sm={9}>
        <Outlet></Outlet>
      </Col>
    </Row>
</div>
    </>
  );
};
