import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import './LogInForm.css'
import { useRef, useState } from 'react'
import api from '../../api/axiosConfig'

function LogInForm({type,setIsFormOpen,setIsLogedIn,setUser}) {
  const userName = useRef()
  const password = useRef()
  const [isError,setIsError] = useState(false)
  let errorMsg = ''
  if(type === 'LogIn') {
    errorMsg = 'Either UserName or Password is wrong'
  }
  else {
    errorMsg = 'This username already exists'
  }
  async function getUserData() {
    try {
      const response = await api.post(`api/v1/user/${type}`,{userName:userName.current.value,password:password.current.value})
      setIsLogedIn(true)
      setUser(response.data)
      setIsFormOpen(false)
      localStorage.setItem("userInfo",JSON.stringify(response.data))
    }catch(err) {
      console.log(err)
      setIsError(true)
    }
  }
  return (
    <div className='loginFormWrapper' >
      <div className='loginForm'>
          <h2 className='title' >
            Movie Mania
          </h2>
          <h4 className='title'>
            Welcome !
          </h4>
          <Form>
            <FormGroup className='mb-3' controlId='userForm' >
              <FormLabel>
                User Name
              </FormLabel>
              <FormControl ref={userName}/>
              <FormLabel>
                Password
              </FormLabel>
              <FormControl type='password' ref={password}/>
            </FormGroup>
          </Form>
          <div className='btnGrp'>
            <Button variant='outline-info' className='formBtn'  onClick={()=>getUserData()}>
              {type}
            </Button>
            <Button variant='outline-info' className='formBtn' onClick={()=>setIsFormOpen(false)}>
              Cancel
            </Button>
          </div>
          {
            isError && (
              <div className='errorMsg' >
                {errorMsg}
              </div>
            )
          }
      </div>
    </div>
  )
}

export default LogInForm
