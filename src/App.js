import './App.css';
import React, { useState, useEffect } from 'react'
import Note from './components/Note/Note';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NoteForm from './components/NoteForm/NoteForm';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Alert } from './components/Alert/Alert';

const notesList = [
  {
    content: "Hola",
    important: false,
    date: new Date().toLocaleDateString(),
    id: 1
  },
  {
    content: "Chau",
    important: false,
    date: new Date().toLocaleDateString(),
    id: 2
  }
]

const alertMessages = [
  {
    color: "error",
    message: "Nota eliminada correctamente"
  },
  {
    color: "success",
    message: "Nota añadida correctamente"
  },
  {
    color: "primary",
    message: "Nota editada correctamente"
  }
]

// COMPONENTE PRINCIPAL 
const App = () => {

  const [allNotes, setAllNotes] = useState(notesList)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [showAll, setShowAll] = useState([])
  const [openDelete, setOpenDelete] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openEdited, setOpenEdited] = useState(false)

  const MySwal = withReactContent(Swal)

  useEffect(() => {
    let initialNotes = JSON.parse(window.localStorage.getItem("notes"))
    if(initialNotes) {
      setAllNotes(initialNotes)
    }
  }, [])
  

   // PARA EDITAR NOTE
   const updateNote = (note) => {
    // Nos traemos la data, si el elemento.id coincide con el id
    let newNote = allNotes.map((el) => el.id === note.id ? note : el)
    // Actualizamos el estado de las notas con la nueva nota a aeditar
    setAllNotes(newNote)
    setOpenEdited(true)
    setTimeout(() => {
      setOpenEdited(false)
    }, 2000);
  }
  
  // PARA CREAR UNA NOTA
  const createNote = note => {
    note.id = allNotes.length + 1
    // Agregamos la nota con todas las demas
    setAllNotes([...allNotes, note])
    setOpenSuccess(true)
    setTimeout(() => {
      setOpenSuccess(null)
    }, 2000);
    window.localStorage.setItem(JSON.stringify("notes", note))
  }

  // PARA ELIMINAR NOTE
  const deleteNote = id => {    
    // Constante con las notas actualizadas, eliminamos la que no corresponde
    const updateNotes = allNotes.filter(note => note.id !== id)
    setAllNotes(updateNotes)
    setOpenDelete(true)
    setTimeout(() => {
      setOpenDelete(false)
    }, 2000);
  }

  // PARA RESETEAR TODO EL ARREGLO DE LAS NOTAS
  const handleResetNotes = () => {
    setAllNotes([])
  }


  // CAMBIAR LA IMPORTANCIA DE CADA NOTA
  /*const toggleImportanceOf = (id) => {
    let note = allNotes.find(note => note.id === id)

    const changeNoteImportance = {
      ...note,
      important: !note.important
    }

    note = changeNoteImportance
  }*/
 
  // PARA MOSTRAR TODAS LAS NOTAS O SOLO LAS IMPORTANTES
  const showNotes = showAll ? allNotes : allNotes.filter((note) => note.important)

  return (
    <div className="App">
      <Container
        className='container'
        maxWidth="sm"
      >
        <h1 className='title'>App notes</h1>

        <NoteForm createNote={createNote} updateNote={updateNote} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />

        <Stack justifyContent="center" spacing={2} marginY={2} direction="row" className='container_buttons'>
          <Button variant='contained' fullWidth startIcon={showAll ? <GradeIcon/> : <ListAltIcon/>} onClick={() => setShowAll(!showAll)}>Mostrar {showAll ? "importantes" : "todas"}</Button>
          <Button variant='contained' fullWidth startIcon={<RestartAltIcon/>} onClick={handleResetNotes} >Resetear notas</Button>
        </Stack>

        <div>
          <ul className='notes_list'>
            {showNotes.map((note) => (
              <Note 
                  key={note.id} 
                  note={note} 
                  deleteNote={deleteNote}
                  setDataToEdit={setDataToEdit}
                  /*toggleImportance={() => toggleImportanceOf(note.id)}*/ 
              />
            ))}
          </ul>
        </div>
    </Container>
    {openSuccess && <Alert severity={alertMessages[1].color} message={alertMessages[1].message} />}
    {openDelete && <Alert severity={alertMessages[0].color} message={alertMessages[0].message} />}
    {openEdited && <Alert severity={alertMessages[2].color} message={alertMessages[2].message} />}
  </div>
  );
}

export default App;
