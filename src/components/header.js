import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
const header = () => (
    <div>
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src='../cloudy.png'
                        width="30"
                        height="30"
                        alt="React Bootstrap logo"
                    />
                    <header>Weather App</header>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/">API's</Nav.Link>
                    <Nav.Link href="/">About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
)

export default header;