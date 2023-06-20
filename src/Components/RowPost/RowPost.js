import React,{useEffect,useState} from 'react'
import './RowPost.css'
import Youtube from 'react-youtube'
import {imageUrl,API_KEY} from '../../Constants/Constants'
import axios from '../../axios'
import App from '../../App'
function RowPost(props) {
 const [movies,setMovies]=useState([])
 const [urlId,setUrlId]=useState('')
  useEffect(()=>{
       axios.get(props.url).then((response)=>{
            console.log(response.data);
            setMovies(response.data.results)
       }).catch(err=>{
        alert(err)
       })
  },[])
  const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const handleMovie=(id)=>{
         console.log(id);
         axios.get(`/movie/${id}/videos?language=en-US&api_key=${API_KEY}`).then(response=>{
          console.log(response.data);
          if(response.data.results.length!==0){
            setUrlId(response.data.results[0])
          }else{
            alert('array empty')
          }
         })
    }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      
      <div className="posters">
      {movies.map((obj)=>
        <img onClick={()=>handleMovie(obj.id)} key={obj.id} className={props.isSmall?'smallPoster':'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="Poster" />

            )}
       </div>
      { urlId && <Youtube videoId={urlId.key} opts={opts}/>}
    </div>
  )
}

export default RowPost
