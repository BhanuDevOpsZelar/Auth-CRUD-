import './App.css';
import Auth from './components/Auth';
import { db } from './firebase-Config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { TextField, Checkbox, InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { async } from '@firebase/util';

function App() {

  const [movies, setMovies] =useState([]);

  const [newMovieTitle, SetnewMovieTitle] = useState("");
  const [relaseDate, setReleaseDate]= useState(0);
  const[isReceivedOscar, setIsReceivedOscar] = useState(true);
  const [newMoviteTitle, setNewMovieTitle] = useState("")
  const movieCollectionRef = collection(db, "movies")

  const deleteMovie= async(id)=>{
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
  }
  const updateMovie = async(id)=>{
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: newMoviteTitle});
  }

  const onSubmitMovie = async()=>{
    try{
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
         releaseDate: relaseDate,
         receivedAnOscar: isReceivedOscar,
      } )
    } catch(err){
      console.error(err)
    }
    alert("Moive data submitted")
  }
  useEffect(()=>{
    const getMovieList = async ()=>{
      try{
        const data = await getDocs(movieCollectionRef)
        const filteredData = data.docs.map((doc)=> ({...doc.data(), id: doc.id}))
        setMovies(filteredData);
      } catch(err){
        console.error(err)
      }
    }
    getMovieList()
  }, [])

  return (
    <div className="App">
      <Auth />

      <h1>Movie Data Submission</h1>
<Box mt={4}>
<TextField type="text"  placeholder='title' onChange={(e)=>{SetnewMovieTitle(e.target.value)}}/>
</Box>
<Box mt={1}>
<TextField type="number" placeholder='releaseDate' onChange={(e)=> setReleaseDate(Number(e.target.value))}/>
</Box>
<Box>
      <Checkbox type="checkbox" checked={isReceivedOscar} onChange={(e)=>{setIsReceivedOscar(e.target.checked)}}/>
      
      <label> Received An Oscar</label>
      </Box>
      <Button variant='contained' onClick={onSubmitMovie}>Submit Movie</Button>

      <Box mt={10}>
        <h1>Reading Movie List</h1>
      </Box>
      {movies.map((movie, key)=>(
        <div key={key}>
          <h1 style={{color:movie.receivedAnOscar ? "green" : "red" }}>{movie.title} </h1>
          <p>Release Date:{movie.releaseDate} </p>
          <Button onClick={()=> deleteMovie(movie.id)}>Delete Movie</Button>
          <TextField onChange={(e)=> setNewMovieTitle(e.target.value)}/> 
          <Button onClick={()=> updateMovie(movie.id)}> Update Movie</Button>
        </div>
      ))}
    </div>
  );
}

export default App;
