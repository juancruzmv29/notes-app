import './App.css';
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Note from './components/Note/Note';


// COMPONENTE PRINCIPAL 
function App() {


  const [note, setNote] = useState("")
  const [allNotes, setAllNotes] = useState([])
  const [showAll, setShowAll] = useState([])

  // FUNCION PARA ENVIAR EL FORMULARIO
  const handleSubmit = e => {
    e.preventDefault()

    const newNote = {
      content: note,
      important: false,
      done: false,
      date: new Date(),
      id: allNotes.length + 1
    }

    setAllNotes([...allNotes, newNote])
  }

  const handleNoteChange = e => {
    setNote(e.target.value)
  }

  const toggleImportanceOf = (id) => {}

  const toggleDoneOf = (id) => {}


  const deleteNote = id => {
    const notes = allNotes.filter(note => note.id !== id)
    setAllNotes(notes)
  }

  const editNote = id => {}

  const showNotes = showAll ? allNotes : allNotes.filter((note) => note.important)

  const showDone = showAll ? allNotes : allNotes.filter((note) => note.done) 

  // PARA DESACTIVAR EL BOTON
  const isDisabled = note.length === 0 ? "disabled" : "";

  return (
    <div className="App">
      <h1>App notes</h1>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
      <TextField id="outlined-basic" label="Note" variant="outlined" value={note} onChange={handleNoteChange}/>
      <Button variant="outlined" disabled={isDisabled}>Primary</Button>
    </Box>

    <div>
      <Button onClick={() => setShowAll(!showAll)}>Mostrar {showAll ? "importantes" : "todas"}</Button>
      <Button  >Mostrar {showAll ? "hechas" : "sin hacer"}</Button>
    </div>

    <div>
      <ul>
        {showNotes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
