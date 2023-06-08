import React, { useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import ManageClasses from '../Pages/Dashboard/ManageClasses';
import MyEnrolledClasses from '../Pages/Dashboard/MyEnrolledClasses';
import Myclasses from '../Pages/Dashboard/Myclasses';
import MySelectedClasss from '../Pages/Dashboard/MySelectedClasss';

export const Dashboard = () => {
  // State to store the user role
  const [userRole, setUserRole] = useState('student'); // Replace 'student' with the actual user role

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
                  </>
                )}
                {userRole === 'instructor' && (
                  <Nav.Item>
                    <Nav.Link eventKey="my-classes">My Classes</Nav.Link>
                  </Nav.Item>
                )}
                {userRole === 'admin' && (
                  <Nav.Item>
                    <Nav.Link eventKey="manage-classes">Manage Classes</Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {userRole === 'student' && (
                  <>
                    <Tab.Pane eventKey="my-selected-classes">
                      <MySelectedClasss />
                    </Tab.Pane>
                    <Tab.Pane eventKey="my-enrolled-classes">
                      <MyEnrolledClasses />
                    </Tab.Pane>
                  </>
                )}
                {userRole === 'instructor' && (
                  <Tab.Pane eventKey="my-classes">
                    <Myclasses />
                  </Tab.Pane>
                )}
                {userRole === 'admin' && (
                  <Tab.Pane eventKey="manage-classes">
                    <ManageClasses />
                  </Tab.Pane>
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};
