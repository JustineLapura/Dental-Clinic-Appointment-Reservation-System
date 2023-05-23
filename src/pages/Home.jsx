import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ServicesContext from '../ServicesContext';
import Dentist from ".././images/Dentist.gif"
import dentalChair from ".././images/dentalChair.gif"
import AppointmentContext from '../AppointmentContext';
import pointFinger from ".././images/pointFinger.gif"


function Home() {
    const { services } = useContext(ServicesContext)
    const { setDate, setTime, setService } = useContext(AppointmentContext)
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

    function bookServiceAppointment(service) {
        setDate("")
        setTime("")
        setService(service)
        return isLoggedin ? navigate("/appointments") : navigate("/login")
    }

    return (
        <div className={`pb-5 ${darkMode ? "bg-dark text-light" : null}`}>
            <header>
                <Container className='position-relative d-flex flex-column justify-content-start align-items-end pb-5 pe-4'>
                    {isLoggedin && <Button className="btn-danger" onClick={logout}>Logout</Button>}
                    <Button className="btn-primary fw-bold mt-2" onClick={bookAppointment}>Book an Appointment</Button>
                    <img className='position-absolute end-0 top-45 ' width={60} src={pointFinger} alt="" />
                </Container>
            </header>
            <main>
                <Container className='my-5 py-5'>
                    <Row>
                        <Col md={7} className='d-flex flex-column justify-content-center align-items-center py-3'>
                            <h1 className="display-4 fw-bold">Welcome to</h1>
                            <h1 className="display-5 fw-bold">Smile Care Dental Clinic</h1>
                            <p className='lead my-2'>We provide high-quality dental care for patients of all ages. Our experienced dentists and staff are committed to making your visit a comfortable and stress-free experience.</p>
                            <Button className="btn-primary fw-bold" onClick={() => navigate("/about")}>Learn More</Button>
                        </Col>
                        <Col md={5} className='d-flex justify-content-center align-items-center'>
                                <img className="rounded-circle" width={250} src={Dentist} alt="Dentist" />
                                <img className="rounded" width={250} src={dentalChair} alt="Dentist" />
                        </Col>
                    </Row>
                </Container>
                <div className='my-5 container-fluid'>
                    <h1 className="text-center mb-5">Our Dental Services</h1>
                    <div className="d-flex overflow-auto">
                        <Row className="flex-nowrap text-dark p-5">
                            {services.map(service => {
                                return (
                                    <Col key={service.id} lg={4} md={6} className="mb-4 w-25">
                                        <Card className="h-100 bg-light">
                                            <Card.Body>
                                                <h3 className="text-primary">{service.name}</h3>
                                                <h6 className="my-4">{service.description}</h6>
                                                <p className="">Price: <span className="fw-normal">P{service.price}</span></p>
                                                <Button variant="primary" onClick={() => bookServiceAppointment(service.name)}>Book this service</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
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