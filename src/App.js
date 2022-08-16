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
  const [edit, setEdit] = useState(false)

  // FUNCION PARA ENVIAR EL FORMULARIO
  const handleSubmit = e => {
    e.preventDefault()

    const newNote = {
      content: note,
      important: false,
      done: false,
      date: new Date().toLocaleDateString("es-AR"),
      id: allNotes.length + 1
    }

    setAllNotes([...allNotes, newNote])
    setNote("")
  }

  // PARA CAMBIAR EL MANEJO DEL CHANGE
  const handleNoteChange = e => {
    setNote(e.target.value)
  }

  // CAMBIAR LA IMPORTANCIA DE CADA NOTA
  const toggleImportanceOf = (id) => {
    const note = allNotes.find(note => note.id === id)

    const changeNoteImportance = {
      ...note,
      important: note.important
    }

    setAllNotes([...allNotes, changeNoteImportance])
  }



  // PARA ELIMINAR NOTE
  const deleteNote = id => {
    const notes = allNotes.filter(note => note.id !== id)
    setAllNotes(notes)
  }

  // PARA EDITAR NOTE
  const editNote = id => {
    const noteEdit = allNotes.find(note => note.id === id)

    setEdit(true)
    setNote(noteEdit.content)
    const noteEdited = {
      ...noteEdit, 
      content: note
    }

    setNote("")
    setEdit(false)
    setAllNotes([ ...allNotes, noteEdited ])
  }

  // PARA MOSTRAR TODAS LAS NOTAS O SOLO LAS IMPORTANTES
  const showNotes = showAll ? allNotes : allNotes.filter((note) => note.important)

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
      <Button variant="outlined" disabled={isDisabled}>{edit ? "Guardar cambios" : "Guardar Nota"}</Button>
    </Box>

    <Box>
      <Button onClick={() => setShowAll(!showAll)}>Mostrar {showAll ? "importantes" : "todas"}</Button>
      <Button >Mostrar {showAll ? "hechas" : "sin hacer"}</Button>
    </Box>

    <Box>
      <ul>
        {showNotes.map((note) => (
          <Note 
              key={note.id} 
              note={note} 
              deleteNote={() => deleteNote(note.id)} 
              editNote={() => editNote(note.id)} 
              toggleImportance={() => toggleImportanceOf(note.id)} 
          />
        ))}
      </ul>
    </Box>
    </div>
  );
}

export default App;
