import React, { useContext, useEffect, useState } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { authContext } from '../providers/AuthProvider/AuthProvider';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import './Dashboard.css'; // Import custom CSS file for styling

export const Dashboard = () => {


  const navigate = useNavigate();
  const { user, loader,SignOut } = useContext(authContext);
  const [axiosSecure] = UseAxiosSecure();
  const [userRole, setUserRole] = useState(null);


  const signOut=()=>{
    SignOut()
    .then(()=>
        {
          console.log('sign out success');
          navigate('/');
        }
    )
    .catch(error=>console.log(error))
  }

  
  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserRole(res.data.role);
        })
        .catch((err) => console.log(err));
    } else {
      if (!loader) {
        navigate('/login');
      }
    }
  }, [user]);


  if (loader || userRole === null) {
    return <div className='container'>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <Row>
        <Col className="sidebar" sm={3}>
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
            <hr />

            <Link to="/">Home</Link>
            <Link to="/classes">Classes</Link>
            <Link onClick={signOut} to="/about">Logout</Link>

          </Nav>
        </Col>
        <Col sm={9}>
          <h1></h1>
            <div className="dashboard-content">
              <h2> Welcome <strong>{user?.displayName}</strong> to Art and Craft</h2>
              <img style={{width: "170px"}} src={user?.photoURL} alt="" />
            </div>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};


export default Dashboard;