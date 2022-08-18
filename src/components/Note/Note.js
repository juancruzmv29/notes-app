import React from 'react'
import "./Note.css"


// COMPONENTE NOTE
const Note = ({ note, deleteNote, toggleImportance, setDataToEdit }) => {

    const label = note.important ? "make not important" : "make important"

    const { content, date, id } = note

  return (
    <li>
        <header>{date}</header>
        <p>{content}</p>
        <div className='buttons'>
            <button onClick={() => deleteNote(id)}>Eliminar</button>
            <button onClick={() => setDataToEdit(content)}>Editar</button>
            <button onClick={toggleImportance}>{label}</button>
        </div>
    </li>
  )
}

export default Note