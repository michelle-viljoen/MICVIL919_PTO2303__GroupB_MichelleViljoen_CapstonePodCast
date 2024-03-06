import React, {useState} from 'react'
 import { supabase } from '../supabaseClient'
 import { Link, useNavigate } from 'react-router-dom'

const Login = ({setToken}) => {
    let navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "", password: ""
    })

  function handleChange(event) {
       const { name, value, type, checked } = event.target
       setFormData(prevFormData => {
         return {
           ...prevFormData,
          [name]: type === "checkbox" ? checked: value
        }
       })
     }

     async function handleSubmit(event) {
      event.preventDefault()
      try {
       
const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })
        if (error) throw error
        setToken(data)
        navigate('/homepage')
      } catch (error) {
alert(error)
      }
     }

console.log(formData)
console.log(supabase)
return(
  
     <div className="loginPage">
       <h1 className="welcome">Welcome to</h1>
       <img src=".\src\images\3.png" width="300px" className="logoImage" />
      
    <form onSubmit={handleSubmit} className="loginForm">
        <label htmlFor="email">Email</label>
      <input
      placeholder="Email"
      name="email"
      onChange={handleChange}/>
        <label htmlFor="password">Password</label>
      <input
      placeholder="Password"
      name="password"
      type="password"
      onChange={handleChange}/>
      <button type="submit" className="loginButtons">Login</button>
    </form>
  <p className='noAccount'>Don't have an account?</p> <button  className="loginButtons"><Link to='/signup'>Sign Up</Link></button>
  </div>
)
}

export default Login