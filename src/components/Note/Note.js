import React from 'react'

// COMPONENTE NOTE
const Note = ({ note, deleteNote, editNote, toggleImportance }) => {

    const label = note.important ? "make not important" : "make important"

    const { content, date } = note

  return (
    <li>
        <header>{date}</header>
        <p>{content}</p>
        <div>
            <button onClick={deleteNote}>Eliminar</button>
            <button onClick={editNote}>Editar</button>
            <button onClick={toggleImportance}>{label}</button>
        </div>
    </li>
  )
}

export default Note