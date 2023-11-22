import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './sandralogo.png';
import './Navbar2.css';
import icon from './usericon.png';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




function Navbarr() {

  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate('/login')
  }


  let user = localStorage.getItem('user-name');
  return (
    <Container>
      <Navbar className='Nav' data-bs-theme="dark" expand="lg" fixed="top" >
        <Container fluid>
          <Navbar.Brand href="/user">
            Sandra{' '}
            <img
              src={Logo}
              alt="Logo"
              height="40"
              width="40"
              className='logoImage'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">

              {
                localStorage.getItem('user-info') ?
                  <>
                    <Nav.Link href="#chatbot">Talk to Sandra</Nav.Link>
                    <Nav.Link href="/doctor">Doctors</Nav.Link>
                    <Nav.Link href="/articles">Articals</Nav.Link>
                    <Nav.Link href="#settings">Settings</Nav.Link>

                    <Nav.Link href="/user">Home</Nav.Link>
                  </>
                  :
                  <>
                    <Nav.Link href='/signup'>Signup</Nav.Link>
                    <Nav.Link href='/signup/doctor'>Signup Doctor</Nav.Link>
                    <Nav.Link href='/login'>Login</Nav.Link>

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
    </Container>
  );
}

export default Navbarr;