import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', image: 'user1.jpg', role: 'student' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', image: 'user2.jpg', role: 'student' },
    { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', image: 'user3.jpg', role: 'student' },
  ]);

  const handleMakeInstructor = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: 'instructor' } : user
      )
    );
  };

  const handleMakeAdmin = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: 'admin' } : user
      )
    );
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.image} alt={user.name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="primary"
                  disabled={user.role === 'instructor' || user.role === 'admin'}
                  onClick={() => handleMakeInstructor(user.id)}
                >
                  Make Instructor
                </Button>
                <Button
                  variant="danger"
                  disabled={user.role === 'admin'}
                  onClick={() => handleMakeAdmin(user.id)}
                >
                  Make Admin
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
