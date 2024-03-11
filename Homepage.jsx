import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import PodcastCard  from '../components/PodcastCard'

const Homepage = ({token}) => {
    let navigate = useNavigate

    const  [podcastData, setPodcastData] = useState([])

    useEffect(() => {
        fetch('https://podcast-api.netlify.app/shows')
        .then(res => { 
            if (!res.ok) {
                throw new Error("Something is wrong")
            }
             return res.json()
        })
        .then(data => {
               setPodcastData(data)
             console.log(data)
           
        })
    }, [])


    const podcasts = podcastData.map((item) => {
        
        return (
            <PodcastCard 
            key={item.id}
            {...item}
            />
        )
    })
    
    function handleLogout() {
        sessionStorage.removeItem('token')
        navigate('/') 
    }
   
    return (
        <div className='homepage'>
            <header className="home__header">
            <img src=".\src\images\3.png" width="100px" className="logoImage" />
           <h3 className='welcome'>Welcome back, {token.user.user_metadata.full_name}!</h3> 
           </header>
           <div className="podcastCard">
            {podcasts}
           </div>
            <button onClick={handleLogout}>Logout</button>
            </div>
    )
}

export default Homepage