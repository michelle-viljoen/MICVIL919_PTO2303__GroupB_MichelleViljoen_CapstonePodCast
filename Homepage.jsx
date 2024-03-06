import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = ({token}) => {
    let navigate = useNavigate()
    function handleLogout() {
        sessionStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div className='homepage'>
            <header className="home__header">
            <img src=".\src\images\3.png" width="100px" className="logoImage" />
           <h3 className='welcome'>Welcome back, {token.user.user_metadata.full_name}</h3> 
           </header>
            <button onClick={handleLogout}>Logout</button>
            </div>
    )
}

export default Homepage