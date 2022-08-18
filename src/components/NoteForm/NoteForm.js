import React, { useState, useEffect } from 'react'


const initialForm = {
    content: "",
    important: false,
    date: new Date().toLocaleDateString(),
    id: null
}


const NoteForm = ({ createNote, setDataToEdit, updateNote, dataToEdit }) => {

    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        if(dataToEdit) {
          setDataToEdit(dataToEdit)
        }
      }, [dataToEdit])

    // PARA CAMBIAR EL MANEJO DEL CHANGE
    const handleNoteChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(form.id === null) {
            createNote(form)
        } else {
            updateNote(form.content)
        }
    }

    // PARA DESACTIVAR EL BOTON
    const isDisabled = form.content.length === 0 ? "disabled" : "";

  return (
    <form
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        >
          <input id="outlined-basic" label="Nota" className='input_note' variant="outlined" name='content' value={form.content} onChange={handleNoteChange}/>
          <button variant="outlined" type='submit' disabled={isDisabled} className="button_note">{dataToEdit ? "Guardar cambios" : "Guardar Nota"}</button>
    </form>
  )
}

export default NoteForm