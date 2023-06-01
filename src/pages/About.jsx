import React from "react";
import {Row, Col, Image } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useOutletContext } from "react-router-dom";
import GoodTooth from ".././images/GoodTooth.gif"
import "animate.css";


const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const About = () => {
  const darkMode = useOutletContext()
  return (
    <div className={`p-5 ${darkMode ? "bg-dark text-light" : null }`}>
      <h1 className="text-center mb-5 fw-bold">About Us</h1>
      <Row>
        <Col lg={6} className="mb-4">
          <Image className="rounded animate__animated animate__backInLeft" src={GoodTooth} fluid />
        </Col>
        <Col lg={6} className="mb-4">
          <h2 className="text-primary mb-3">Who We Are</h2>
          <p className="lead mb-4">
            We are a private dental clinic dedicated to providing the highest
            quality dental care to our patients. Our experienced team of
            dentists and staff are committed to delivering personalized and
            compassionate treatment to help our patients achieve optimal oral
            health and beautiful smiles.
          </p>
          <h2 className="text-primary mb-3">Our Mission</h2>
          <p className="lead mb-4">
            Our mission is to provide exceptional dental care in a comfortable
            and welcoming environment. We strive to build long-lasting
            relationships with our patients and to empower them with the
            knowledge and tools to maintain healthy smiles for life.
          </p>
          <h2 className="text-primary mb-3">Our Values</h2>
          <ul className="list-unstyled mb-4">
            <li>- Patient-centered care</li>
            <li>- Compassion and empathy</li>
            <li>- Professionalism and expertise</li>
            <li>- Continuous learning and improvement</li>
            <li>- Honesty and transparency</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-primary mb-3">Visit Us</h2>
          <p className="lead mb-4">
            We are conveniently located in the heart of San Francisco. Please
            feel free to contact us to schedule an appointment or to ask any
            questions you may have.
          </p>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
          <p className="mt-3">
            San Bartolome St, Brgy. 4 <br/>
            Catbalogan City <br />
            Philippines <br />
            Phone: 09175025468
          </p>
        </Col>
      </Row>
    </div>  );
};

export default About;
