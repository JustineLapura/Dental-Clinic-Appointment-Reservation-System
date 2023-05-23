import React, { useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import TimeScheduleContext from '../TimeScheduleContext';

export const AdminTimeSchedule = () => {
  const { schedule, handleScheduleUpdate, handleDayClosed } = useContext(TimeScheduleContext)

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <h3 className='my-4'>Edit Schedule</h3>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ].map((day, index) => {
              const daySchedule = schedule.find((item) => item.day === day);
              const startTime = daySchedule ? daySchedule.startTime : "";
              const endTime = daySchedule ? daySchedule.endTime : "";

              return (
                <Form.Group className="my-2" as={Row} key={index}>
                  <Form.Label className='fw-bold' column sm={2}>
                    {day}
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      className='text-center fs-5'
                      type="time"
                      value={startTime}
                      onChange={(e) =>
                        handleScheduleUpdate(day, e.target.value, endTime)
                      }
                    />
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      className='text-center fs-5'
                      type="time"
                      value={endTime}
                      onChange={(e) =>
                        handleScheduleUpdate(day, startTime, e.target.value)
                      }
                    />
                  </Col>
                  <Col sm={2}>
                    <Form.Check
                      type="checkbox"
                      label="Closed"
                      checked={!startTime && !endTime}
                      onChange={() => handleDayClosed(day)}
                    />
                  </Col>
                </Form.Group>
              );
            })}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminTimeSchedule