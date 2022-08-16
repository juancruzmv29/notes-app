import './App.css';
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Note from './components/Note/Note';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// COMPONENTE PRINCIPAL 
const App = () => {

  
  const [note, setNote] = useState("")
  const [allNotes, setAllNotes] = useState([])
  const [showAll, setShowAll] = useState([])
  const [edit, setEdit] = useState(false)
  const MySwal = withReactContent(Swal)

  /*
  useEffect(() => {
    let notesFromLS = JSON.parse(window.localStorage.getItem("notes"))

    if(notesFromLS) {
      setAllNotes(notesFromLS)
    }
  }, [])
  */


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
    MySwal.fire({
      position: "bottom-end",
      icon: "success",
      title: "Tu nota ha sido guardada",
      showConfirmButton: false,
      timer: 1300
    })
    setNote("")
  }

  const handleResetNotes = () => {
    setAllNotes([])
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
      <Box
        component="div"
        className='container'
      >
        <h1 className='title'>App notes</h1>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          className="box_input"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField id="outlined-basic" label="Nota" className='input_note' variant="outlined" value={note} onChange={handleNoteChange}/>
          <Button variant="outlined" type='submit' disabled={isDisabled} className="button_note">{edit ? "Guardar cambios" : "Guardar Nota"}</Button>
        </Box>

        <Box className='container_buttons'>
          <Button onClick={() => setShowAll(!showAll)}>Mostrar {showAll ? "importantes" : "todas"}</Button>
          <Button >Mostrar {showAll ? "hechas" : "sin hacer"}</Button>
          <Button onClick={handleResetNotes} >Resetear notas</Button>
        </Box>

        <Box>
          <ul className='notes_list'>
            {showNotes.map((note) => (
              <Note 
                  key={note.id} 
                  note={note} 
                  deleteNote={deleteNote} 
                  editNote={editNote} 
                  toggleImportance={() => toggleImportanceOf(note.id)} 
              />
            ))}
          </ul>
        </Box>
    </Box>
  </div>
  );
}

export default App;
