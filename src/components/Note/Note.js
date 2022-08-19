import React from 'react'
import "./Note.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GradeIcon from '@mui/icons-material/Grade';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


// COMPONENTE NOTE
const Note = ({ note, deleteNote, toggleImportance, setDataToEdit }) => {

    const label = note.important ? "not important" : "important"

    const { content, date, id } = note

  return (
    <li>
        <header>{date}</header>                                                                       
        <p>{content}</p>
        <Stack justifyContent="center" direction="row" className='buttons'>
            <Button fullWidth variant='contained' color="error" startIcon={<DeleteIcon/>} onClick={() => deleteNote(id)}>Eliminar</Button>
            <Button fullWidth variant="container" color="info" startIcon={<EditIcon/>} onClick={() => setDataToEdit(note)}>Editar</Button>
            <Button fullWidth startIcon={note.important ? "" : <GradeIcon/>} onClick={toggleImportance}>{label}</Button>
        </Stack>
    </li>
  )
}

export default Note