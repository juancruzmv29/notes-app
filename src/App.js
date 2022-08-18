import './App.css';
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Note from './components/Note/Note';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NoteForm from './components/NoteForm/NoteForm';

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


// COMPONENTE PRINCIPAL 
const App = () => {

  const [allNotes, setAllNotes] = useState(notesList)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [showAll, setShowAll] = useState([])
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    
  }, [])
  

   // PARA EDITAR NOTE
   const updateNote = (data) => {
    let newNote = allNotes.map((el) => el.id === data.id ? data : el)
    setAllNotes(newNote)
  }

  const createNote = data => {
    data.id = allNotes.length + 1
    setAllNotes([...allNotes, data])
  }

  // PARA ELIMINAR NOTE
  const deleteNote = id => {
    
    const updateNotes = allNotes.filter(note => note.id !== id)
    setAllNotes(updateNotes)
  }

  // PARA RESETEAR TODO EL ARREGLO DE LAS NOTAS
  const handleResetNotes = () => {
    setAllNotes([])
  }


  // CAMBIAR LA IMPORTANCIA DE CADA NOTA
  const toggleImportanceOf = (id) => {
    const note = allNotes.find(note => note.id === id)

    const changeNoteImportance = {
      ...note,
      important: !note.important
    }

    setAllNotes([...allNotes, changeNoteImportance])
  }
 
  // PARA MOSTRAR TODAS LAS NOTAS O SOLO LAS IMPORTANTES
  const showNotes = showAll ? allNotes : allNotes.filter((note) => note.important)

  return (
    <div className="App">
      <div
        className='container'
      >
        <h1 className='title'>App notes</h1>

        <NoteForm createNote={createNote} updateNote={updateNote} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />

        <div className='container_buttons'>
          <button onClick={() => setShowAll(!showAll)}>Mostrar {showAll ? "importantes" : "todas"}</button>
          <button onClick={handleResetNotes} >Resetear notas</button>
        </div>

        <div>
          <ul className='notes_list'>
            {showNotes.map((note) => (
              <Note 
                  key={note.id} 
                  note={note} 
                  deleteNote={deleteNote} 
                  updateNote={updateNote}
                  toggleImportance={() => toggleImportanceOf(note.id)} 
              />
            ))}
          </ul>
        </div>
    </div>
  </div>
  );
}

export default App;
