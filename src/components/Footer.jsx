import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-0">
      <Container fluid>
        <Row className='d-flex align-items-center'>
          <Col className='my-3' md={6} lg={3}>
            <p>&copy; 2023  Smile Care Dental  Clinic. All Rights Reserved.</p>
          </Col>
          <Col className='my-3' md={6} lg={3}>
            <h2>Location</h2>
            <p>San. Bartolome Street</p>
            <p>Barangay 4</p>
            <p>Catbalogan City, Samar</p>
          </Col>
          <Col className='my-3' md={6} lg={3}>
            <h2>Contact Us</h2>
            <p>Phone: 09175025468</p>
            <p>Email: SmileCareDentalClinic@gmail.com</p>
            <p>Hours: Monday - Saturday, 8am - 5pm</p>
          </Col>
          <Col className='my-3' md={6} lg={3}>
            <h2>Follow Us</h2>
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item me-3">
                <Link to="#">
                  <FaFacebook />
                </Link>
              </li>
              <li className="list-inline-item me-3">
                <Link to="#">
                  <FaTwitter />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
