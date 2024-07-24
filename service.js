import React, { useState } from 'react';
import Header from '../Header';
import { Button, Container, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './service.css';

function Service() {
  const [show, setShow] = useState(false);
  const [showNewStartup, setShowNewStartup] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState({});
  const [userName, setUserName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [startups, setStartups] = useState([
    {
      name: "TechWave",
      description: "TechWave is revolutionizing the AI landscape with its cutting-edge machine learning algorithms.",
      image: "/images/green.jpeg",
      donationPhoto: "/images/donate-green.jpeg" // Example photo for donate button
    },
    {
      name: "NextGen Health",
      description: "NextGen Health leverages advanced technologies to create personalized healthcare solutions.",
      image: "/images/med.jpeg",
      donationPhoto: "/images/donate-med.jpeg" // Example photo for donate button
    },
    {
      name: "GreenEnergy Innovators",
      description: "GreenEnergy Innovators is committed to creating a sustainable future through renewable energy solutions.",
      image: "/images/ai.jpeg",
      donationPhoto: "/images/donate-ai.jpeg" // Example photo for donate button
    }
  ]);

  const [newStartupName, setNewStartupName] = useState('');
  const [newStartupDescription, setNewStartupDescription] = useState('');
  const [newDonationGoal, setNewDonationGoal] = useState('');

  const handleDonateClick = (startup) => {
    setSelectedStartup(startup);
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const handleCloseNewStartup = () => setShowNewStartup(false);

  const handleSubmitNewStartup = () => {
    const newStartup = {
      name: newStartupName,
      description: newStartupDescription,
      image: "https://dummyimage.com/150x150/000000/ffffff&text=" + newStartupName.replace(" ", "+"),
      donationGoal: newDonationGoal,
    };
    setStartups([...startups, newStartup]);
    // Clear input fields
    setNewStartupName('');
    setNewStartupDescription('');
    setNewDonationGoal('');
    handleCloseNewStartup();
  };

  return (
    <div className="service">
      <Header />
      <header className="App-header">
       
        <Button variant="success" className="add-startup-button" onClick={() => setShowNewStartup(true)}>+</Button>
        
        <Container>
          <Row>
            {startups.map((startup, index) => (
              <Col key={index} md={4} className="mb-4 col">
                <Card className="card">
                  <Card.Img 
                    variant="top"
                    src={startup.image}
                    alt={startup.name}
                    className="mx-auto mt-3"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <Card.Body className="card-body">
                    <div>
                      <Card.Title>{startup.name}</Card.Title>
                      <Card.Text>{startup.description}</Card.Text>
                      <Card.Text>Donation Goal: {startup.donationGoal}</Card.Text>
                    </div>
                    <Button className="donateButton" onClick={() => handleDonateClick(startup)}>
                      <img 
                        src="/images/coin.png" // URL to your coin image
                        alt="Donate"
                        className="coin-icon"
                      />
                      Donate
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        <Modal show={showNewStartup} onHide={handleCloseNewStartup}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Startup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNewStartupName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter startup name" 
                  value={newStartupName} 
                  onChange={(e) => setNewStartupName(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="formNewStartupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  placeholder="Enter startup description" 
                  value={newStartupDescription} 
                  onChange={(e) => setNewStartupDescription(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="formNewDonationGoal">
                <Form.Label>Donation Amount Goal</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Enter donation goal" 
                  value={newDonationGoal} 
                  onChange={(e) => setNewDonationGoal(e.target.value)} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseNewStartup}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitNewStartup}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Donate to {selectedStartup.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="formDonationAmount">
                <Form.Label>Donation Amount</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Enter amount" 
                  value={donationAmount} 
                  onChange={(e) => setDonationAmount(e.target.value)} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </header>
    </div>
  );
}

export default Service;
