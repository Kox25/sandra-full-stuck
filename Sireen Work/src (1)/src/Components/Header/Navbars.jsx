import React, { Component } from "react";
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from '../assets/sandralogo.png';
import './Navbar.css';
import { Search } from "react-bootstrap-icons";
import { LinkContainer } from 'react-router-bootstrap';



class Navbars extends Component {
  render() {
    return (
      <div className="nav">
        <Navbar expand="lg" fixed="top" >
          <Container>
            <Navbar.Brand ><img title="logo" className="logosandra" src={Logo} alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="linka" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mo-auto tomargin" >
                <LinkContainer to="/">


                  <Nav.Link className="active linka">Home</Nav.Link>
                </LinkContainer>
                {
                  localStorage.getItem('user-info') ?
                    <>

                      <NavDropdown title="Pages" id="basic-nav-dropdown" className="linka">

                        <NavDropdown.Item className="decor" href="#chatboot">Talk To Sandra</NavDropdown.Item>
                        <NavDropdown.Item className="decor" href="#reservation">Book an Appointment
                        </NavDropdown.Item>
                        <NavDropdown.Item className="decor" href="#shareus">Put comment To Sahre</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link className="linka" href="#Signin">
                        <Search className="Search" />
                      </Nav.Link>
                    </>
                    :
                    <>
                      <Nav.Link className="linka" href="#Signin">Sign In</Nav.Link>
                      <NavDropdown title="Services" id="basic-nav-dropdown">
                        <NavDropdown.Item className="decor" href="#singin">SignUp</NavDropdown.Item>
                        <NavDropdown.Item className="decor" href="#contactus">Contact Us</NavDropdown.Item>
                        <NavDropdown.Item className="decor" href="#feedback">Feedback</NavDropdown.Item>
                      </NavDropdown>
                    </>
                }

                {
                  localStorage.getItem('user-info') ?
                    <>
                      <Nav.Link>
    
                        <div className='userInfo'>
                          <img
                            src={icon}
                            alt='user'
                            height='30'
                            width='30' />
                        </div>
                      </Nav.Link>
                      <NavDropdown title={user}>
                        <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    </>
                    :
                    null
                }
    
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}


export default Navbars; 