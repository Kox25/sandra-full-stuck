import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/sandralogo.png';
import './Navbar.css';
import icon from '../assets/usericon.png';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios';
import { useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';




function Navbarr() {

  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const { t } = useTranslation();
  function Logout() {
    const userType = localStorage.getItem('user-type');
    const userId = localStorage.getItem('user-id');

    // Make a POST request to the logout API
    axiosClient.post(`/logout/${userType}/${userId}`)
      .then(response => {
        console.log(response.data.message); // Success message from the backend
        localStorage.clear();
        navigate('/login');
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occur during the API call
      });
  }

  let user = localStorage.getItem('user-name');

  return (
    <Container className='Container'>

      <Navbar className="Nav" expand="md" fixed="top">
        <Container fluid>
          <Navbar.Brand className='sa mt-2' href="/user">
            <div className="brand">
              <div>
                <img
                  src={Logo}
                  alt="Logo"
                  height="30"
                  width="30"
                  className="logoImage"
                />
              </div>
              Sandra
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto mt-2" >

              {
                localStorage.getItem('user-info') ?
                  <>
                    <Nav.Link href="#chatbot" className="l">{t("talktosandra")}</Nav.Link>
                    <Nav.Link href="/doctor" className="l">{t("doctors")}</Nav.Link>
                    <Nav.Link href="#articales" className="l">{t("Articals")}</Nav.Link>
                    <Nav.Link href="#settings" className="l">{t("Settings")}</Nav.Link>
                    <Nav.Link href='/chats' className="l">{t("chats")}</Nav.Link>
                    <Nav.Link href='/posts' className="l">{t("posts")}</Nav.Link>
                    <Nav.Link href="/user" className="l">{t("home")}</Nav.Link>
                    <Nav.Link href="/verfiy" className="l">{t("verfiy")}</Nav.Link>
                    <Nav.Link href="/admin/posts" className='l'>{t("postManage")}</Nav.Link>

                  </>
                  :
                  <>
                    <Nav.Link href='/signup' className="l">Signup</Nav.Link>
                    <Nav.Link href='/signup/doctor' className="l">{t("signupdoctor")}</Nav.Link>
                    <Nav.Link href='/login' className="l">{t("login")}</Nav.Link>

                  </>
              }


              {
                localStorage.getItem('user-info') ?
                  < div className="part ">



                    <Nav.Link >

                      <div className="ml-[500px]">
                        <img
                          src={icon}
                          alt="user"
                          height="30"
                          width="30" />
                        <NavDropdown title={user} className="o">
                          <NavDropdown.Item onClick={Logout} className="o">{t("logout")}</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => navigate('/liked/post')} className="o">{t("savePost")}</NavDropdown.Item>
                          <label className='flex w-20 h-10 bg-gray-300 rounded-full ml-4'
                            onClick={() => setIsSelected(!isSelected)}>
                            {isSelected == false ?
                              <span className='h-9 w-10 bg-white text-bold text-[20px] rounded-full transition-all duration-500'
                                onClick={() => { i18n.changeLanguage("ar") }}><div className='font-mono mt-2 ml-[12px]'>EN</div></span>
                              :
                              <span className='h-9 w-10 bg-rose-300 ml-9 rounded-full transition-all duration-500'
                                onClick={() => { i18n.changeLanguage("en") }}><div className='font-mono text-bold text-[20px] mt-2 ml-[12px]'>AR</div></span>
                            }
                          </label>
                          
                        </NavDropdown>
                      </div>
                    </Nav.Link>
                  </div>
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