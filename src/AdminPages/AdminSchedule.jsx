import { Container, Row, Col, Table, Button } from 'react-bootstrap'; // Importing necessary components from React Bootstrap

const AdminSchedule = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center mt-4">
        <Col md={10}>
          <h1 className="text-center mb-4">Admin Schedule</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Patient Name</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dr. John Doe</td>
                <td>May 15, 2023</td>
                <td>10:00am</td>
                <td>John Smith</td>
                <td>johnsmith@example.com<br />123-456-7890</td>
                <td>Confirmed</td>
                <td>
                  <Button variant="primary">Edit</Button>{' '}
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>Dr. Jane Doe</td>
                <td>May 15, 2023</td>
                <td>11:00am</td>
                <td>Jane Smith</td>
                <td>janesmith@example.com<br />123-456-7890</td>
                <td>Pending</td>
                <td>
                  <Button variant="primary">Edit</Button>{' '}
                  <Button className='mx-1 mt-1' variant="danger">Delete</Button>
                </td>
              </tr>
              {/* Add more rows dynamically */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSchedule;
