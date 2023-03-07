import React, { Fragment } from "react";
import Table from "react-bootstrap/Table";

const Index = () => {
  return (
    <Fragment>
      <div className="wallet-withdraw-line">
        <div>
          <h6>Name -</h6>
          <h6>Coins -</h6>
        </div>
        <div>
          <h6>Admin User</h6>
          <h6>1000.00</h6>
        </div>
        <div>
          <button>Withdraw</button>
        </div>
      </div>
      <div className="wallet-table">
        <Table striped>
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Transaction ID</th>
              <th>Debit</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Referal Amount Recieved </td>
              <td>0.00</td>
              <td>50.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Referal Amount Recieved </td>
              <td>0.00</td>
              <td>50.00</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Referal Amount Recieved </td>
              <td>0.00</td>
              <td>50.00</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Referal Amount Recieved </td>
              <td>0.00</td>
              <td>50.00</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Referal Amount Recieved </td>
              <td>0.00</td>
              <td>50.00</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Referal Amount Recieved </td>
              <td>0.00</td>
              <td>50.00</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default Index;
