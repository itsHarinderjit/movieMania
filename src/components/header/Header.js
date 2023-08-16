import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Nav , Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import LogInForm from '../logInForm/LogInForm'
import { currentUserContext } from '../../App'

function Header() {
    const [isFormOpen,setIsFormOpen] = useState(false)
    const [isLogedIn,setIsLogedIn] = useState(false)
    const {user,setUser} = useContext(currentUserContext)
    const [type,setType] = useState()
    useEffect(()=> {
        const data = localStorage.getItem("userInfo")
        if(data!=='null' && data!=null) {
            setUser(JSON.parse(data))
            setIsLogedIn(true)
        }
    },[])
  return (
    <>
        <Navbar bg='dark' variant='dark' expand='lg' >
            <Container fluid >
                <Navbar.Brand href='/' style={{'color':'gold'}} >
                    <FontAwesomeIcon icon={faVideoSlash} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className='me-auto my-2 my-lg-0' style={{maxHeight: '100px'}} navbarScroll >
                        <NavLink className={'nav-link'} to={'/'}>Home</NavLink>
                        <NavLink className={'nav-link'} to={'/watchlist'}>Watch List</NavLink>
                    </Nav>
                    {
                        isLogedIn ? (
                            <>
                                <div style={{marginRight:"15px",fontSize:"20px"}} >{user.userName}</div>
                                <Button variant='outline-info' onClick={()=>{
                                    setIsLogedIn(false)
                                    setUser(null)
                                    localStorage.setItem("userInfo",null)
                                }} >Log Out</Button>
                            </>
                        ) : (
                            <>
                                <Button variant='outline-info' className='me-2' onClick={()=>{
                                    setIsFormOpen(true)
                                    setType('LogIn')
                                }} >Login</Button>
                                <Button variant='outline-info' onClick={()=>{
                                    setIsFormOpen(true)
                                    setType('Register')
                                }} >Register</Button>
                            </>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {
            isFormOpen && <LogInForm type={type} setIsFormOpen={setIsFormOpen} setIsLogedIn={setIsLogedIn} setUser={setUser} />
        }
    </>
  )
}

export default Header
