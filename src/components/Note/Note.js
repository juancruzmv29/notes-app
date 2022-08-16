import React from 'react'
import "./Note.css"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


// COMPONENTE NOTE
const Note = ({ note, deleteNote, editNote, toggleImportance }) => {

    const label = note.important ? "make not important" : "make important"

    const { content, date, id } = note

  return (
    <li>
        <header>{date}</header>
        <p>{content}</p>
        <Stack direction="row" spacing={.5} className='buttons'>
            <Button onClick={() => deleteNote(id)}>Eliminar</Button>
            <Button onClick={() => editNote(id)}>Editar</Button>
            <Button onClick={toggleImportance}>{label}</Button>
        </Stack>
    </li>
  )
}

export default Note