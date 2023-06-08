import React, { useContext, useEffect, useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import ManageClasses from '../Pages/Dashboard/ManageClasses';
import MyEnrolledClasses from '../Pages/Dashboard/MyEnrolledClasses';
import MyClass from '../Pages/Dashboard/MyClasses';
import ManageUsers from '../Pages/Dashboard/ManageUsers';
import AddClass from '../Pages/Dashboard/AddClass';
import MySelectedClasses from '../Pages/Dashboard/MySelectedClasses';
import MyPayments from '../Pages/Dashboard/MyPayments';
import { authContext } from '../providers/AuthProvider/AuthProvider';

export const Dashboard = () => {

    const {user}=useContext(authContext);
  // State to store the user role
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch the user role from the API by the user.email
      fetch(`http://localhost:5000/users?email=${user.email}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserRole(data[0].role);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <>
      <div className="container mt-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey={userRole === 'admin' ? 'manage-classes' : 'my-classes'}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {userRole === 'student' && (
                  <>
                    <Nav.Item>
                      <Nav.Link eventKey="my-selected-classes">My Selected Classes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="my-enrolled-classes">My Enrolled Classes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="my-payemnts">My Payments</Nav.Link>
                    </Nav.Item>
                  </>
                )}
                {userRole === 'instructor' && (
                    <>
                    <Nav.Item>
                      <Nav.Link eventKey="add-class">Add Class</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="my-classes">My Classes</Nav.Link>
                    </Nav.Item>

                    </>
                )}
                {userRole === 'admin' && (
                 <>
                  <Nav.Item>
                    <Nav.Link eventKey="manage-classes">Manage Classes</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="manage-users">Manage Users</Nav.Link>
                  </Nav.Item>
                 </>
                )}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {userRole === 'student' && (
                  <>
                    <Tab.Pane eventKey="my-selected-classes">
                      <MySelectedClasses />
                    </Tab.Pane>
                    <Tab.Pane eventKey="my-enrolled-classes">
                      <MyEnrolledClasses />
                    </Tab.Pane>
                    <Tab.Pane eventKey="my-payemnts">
                      <MyPayments />
                    </Tab.Pane>
                  </>
                )}
                {userRole === 'instructor' && (
                  <>
                  <Tab.Pane eventKey="add-class">
                    <AddClass />
                  </Tab.Pane>
                  <Tab.Pane eventKey="my-classes">
                    <MyClass />
                  </Tab.Pane>

                  </>
                )}
                {userRole === 'admin' && (
                 <>
                  <Tab.Pane eventKey="manage-classes">
                    <ManageClasses />
                  </Tab.Pane>
                  <Tab.Pane eventKey="manage-users">
                    <ManageUsers />
                  </Tab.Pane>
                 </>
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};
