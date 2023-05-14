import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-0">
      <Container fluid>
        <Row className='d-flex align-items-center'>
          <Col className='my-3' md={6} lg={3}>
            <p>&copy; 2023  Private  Dental  Clinic. All Rights Reserved.</p>
          </Col>
          <Col className='my-3' md={6} lg={3}>
            <h2>Location</h2>
            <p>123 Main Street</p>
            <p>Suite 100</p>
            <p>City, State ZIP</p>
          </Col>
          <Col className='my-3' md={6} lg={3}>
            <h2>Contact Us</h2>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@privatedentalclinic.com</p>
            <p>Hours: Monday - Friday, 8am - 5pm</p>
          </Col>
          <Col className='my-3' md={6} lg={3}>
            <h2>Follow Us</h2>
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item me-3">
                <a href="#">
                  <FaFacebook />
                </a>
              </li>
              <li className="list-inline-item me-3">
                <a href="#">
                  <FaTwitter />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
