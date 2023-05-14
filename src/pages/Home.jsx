import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";

function Home() {
    const isLoggedin = localStorage.getItem("isLoggedin")
    const darkMode = useOutletContext()
    const navigate = useNavigate()
    
    function logout() {
        localStorage.removeItem("isLoggedin")
        navigate("/login")
    }

    function bookAppointment() {
        return isLoggedin ? navigate("/appointments") : navigate("/login")
    }
    return (
        <div className={`pb-5 ${darkMode ? "bg-dark text-light" : null}`}>
            <header>
                <Container className='d-flex flex-column justify-content-start align-items-end p-3'>
                    {isLoggedin && <Button className="btn-danger" onClick={logout}>Logout</Button>}
                    <Button className="btn-primary fw-bold mt-2" onClick={bookAppointment}>Book an Appointment</Button>
                </Container>
            </header>
            <main>
                <Container className='my-5 py-5'>
                    <Row>
                        <Col md={6} className='d-flex flex-column justify-content-center align-items-center py-3'>
                            <h1>Welcome to the Dental Clinic</h1>
                            <p>We provide high-quality dental care for patients of all ages. Our experienced dentists and staff are committed to making your visit a comfortable and stress-free experience.</p>
                            <Button className="btn-primary fw-bold" onClick={() => navigate("/about")}>Learn More</Button>
                        </Col>
                        <Col md={6}>
                            <img className="rounded-circle" width={300} src="https://media.giphy.com/media/gLxFsED6Id9C20MGwN/giphy.gif" alt="Dentist" />
                        </Col>
                    </Row>
                </Container>
                <div className='px-5 my-5 mx-0 container-fluid'>
                    <h2 className='my-5'>Our Services</h2>
                    <Row className="text-dark">
                        <Col md={4}>
                            <Card className='m-2'>
                                <Card.Img variant="top" src="https://greenwoodsdental.com/wp-content/uploads/2020/02/what-to-do-after-my-laser-dentistry-teeth-cleaning.jpg" alt="Dental Cleaning" />
                                <Card.Body>
                                    <h3 className="text-primary">General Dentistry</h3>
                                    <ul className="list-unstyled">
                                        <li><FaCheck className="text-success me-2" />Regular Checkups and Cleanings</li>
                                        <li><FaCheck className="text-success me-2" />Fillings and Crowns</li>
                                        <li><FaCheck className="text-success me-2" />Root Canal Therapy</li>
                                        <li><FaCheck className="text-success me-2" />Tooth Extractions</li>
                                        <li><FaCheck className="text-success me-2" />Dental Implants</li>
                                    </ul>
                                    <Button variant="primary fw-bold">Learn More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className='m-2'>
                                <Card.Img variant="top" src="https://smileeverydaydentistry.com/bc/wp-content/uploads/shutterstock_319728569.jpg" alt="Teeth Whitening" />
                                <Card.Body>
                                    <h3 className="text-primary">Cosmetic Dentistry</h3>
                                    <ul className="list-unstyled">
                                        <li><FaCheck className="text-success me-2" />Teeth Whitening</li>
                                        <li><FaCheck className="text-success me-2" />Porcelain Veneers</li>
                                        <li><FaCheck className="text-success me-2" />Invisalign Clear Braces</li>
                                        <li><FaCheck className="text-success me-2" />Dental Bonding</li>
                                        <li><FaCheck className="text-success me-2" />Gum Contouring</li>
                                    </ul>
                                    <Button variant="primary fw-bold">Learn More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className='m-2'>
                                <Card.Img variant="top" src="https://tse4.mm.bing.net/th?id=OIP.W_EOXCl5a333SXIPY_C_BAHaE8&pid=Api&P=0" alt="Tooth Filling" />
                                <Card.Body>
                                    <h3 className="text-primary">Emergency Dentistry</h3>
                                    <ul className="list-unstyled">
                                        <li><FaCheck className="text-success me-2" />Toothache Relief</li>
                                        <li><FaCheck className="text-success me-2" />Chipped or Broken Teeth</li>
                                        <li><FaCheck className="text-success me-2" />Lost or Knocked-out Teeth</li>
                                        <li><FaCheck className="text-success me-2" />Repair of Broken Dentures</li>
                                    </ul>
                                    <Button variant="primary fw-bold">Learn More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </main>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h1>Welcome to Our Private Dental Clinic</h1>
                        <p>
                            We are a state-of-the-art dental clinic located in the heart of the city. Our highly skilled team of dentists, hygienists, and assistants provide a full range of dental services for patients of all ages, including preventative care, cosmetic treatments, and emergency services.
                        </p>
                        <p>
                            Our clinic is equipped with the latest technology and we use the highest quality materials to ensure that our patients receive the best possible care. We are committed to providing a comfortable and relaxing environment for all our patients, and we take great pride in our friendly and professional service.
                        </p>
                        <p>
                            If you have any questions or would like to schedule an appointment, please do not hesitate to contact us. We look forward to hearing from you soon!
                        </p>
                        <Button className='fw-bold' onClick={() => navigate("/admin")}>Contact Us</Button>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default Home;