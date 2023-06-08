import React from 'react';
import { Table } from 'react-bootstrap';

const MyPayments = () => {
  const paymentHistory = [
    {
      id: 1,
      paymentDate: '2022-01-01',
      amount: 100,
    },
    {
      id: 2,
      paymentDate: '2022-02-01',
      amount: 150,
    },
  ];

  return (
    <div>
      <h2>Payment History</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyPayments;
