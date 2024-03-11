
//import React, {useEffect, useState} from 'react'
//{podcastData}
// export default function PodcastCard () {
//     const  [podcastData, setPodcastData] = useState(null)
    
//     useEffect(() => {
//         fetch('https://podcast-api.netlify.app/shows')
//         .then(res => { 
//             return res.json()
//         })
//         .then(data => {
//             setPodcastData(data)
//         })
//     }, [])
//     console.log(podcastData)

//  const podcast = <div>
//  {podcastData.map((podcast) => (
//      <div key={podcast.id}>
//          <h2>{podcast.title}</h2>
//          <h3>{podcast.description}</h3>
//          <p>{podcast.seasons}</p>
//          <p>{podcast.image}</p>
//          <p>{podcast.genres}</p>
//          <p>{podcast.updated}</p>
//      </div>  
// ))}  
// </div>
//         return (
//           <div> {podcast && <PodcastCard podcastData={podcast}/>} </div>  
//         )
//     }



// function PodcastCard() {
    
//         const  [podcastData, setPodcastData] = useState(null)
//         function Card(props) {
//             return (
//                 <div>
//                           <h2>{props.title}</h2>
//                           <h3>{props.description}</h3>
//                           <p>{props.seasons}</p>
//                           <p>{props.image}</p>
//                           <p>{props.genres}</p>
//                 /         <p>{props.updated}</p>
//                       </div>  
//             )
//         }
    
//     useEffect(() => {
//         fetch('https://podcast-api.netlify.app/shows')
//         .then(res => { 
//             return res.json()
//         })
//         .then(data => {
//             setPodcastData(data)
//         })
//     }, [])

//     const podcast = podcastData.map(item => {
//         return (
//             <Card
//             key={item.id} {...item}/>
//         )
//     })
//     return (
//         <div>{podcast}</div>
//     )
// }

// export default PodcastCard


export default function PodcastCard (props)  {
   
    // const updated = new Date(props.podcastData.updated)
    // console.log(updated)
    // const updatedDate = updated.toDateString()
    // const genreTitle = {
    //     1: "Personal Growth",
    //     2: "True Crime and Investigative Journalism",
    //     3: "History", 
    //     4: "Comedy",
    //     5: "Entertainment",
    //     6: "Business",
    //     7: "Fiction",
    //     8: "News",
    //     9: "Kids and Family"
    // }
    return (
        <div className='preview__display'>
            <div className='preview__content'>
        
        
            <button>
                <h2 className='preview__title'>{props.title}</h2>
                <img className='preview__image' src={props.image} width="150px"/>
                <h3 className='preview__description'>{props.description}</h3>
                <p className='preview__seasons'>Seasons: {props.seasons}</p>
                <p className='preview__genres'>{props.genres}</p>
                {/* <p className='preview__updated'>Last updated: {new Date(props.updated).toDateString()}</p> */}
                <p className='preview__updated'>Last updated: {props.updated}</p>
            </button>  
      
      </div>
      </div>
    )
}




