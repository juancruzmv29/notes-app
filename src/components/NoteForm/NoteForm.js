import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Box from '@mui/material/Box';

const initialForm = {
    content: "",
    important: false,
    date: new Date().toLocaleDateString(),
    id: null
}


const NoteForm = ({ createNote, setDataToEdit, updateNote, dataToEdit }) => {

    // ESTADO PARA EL FORMULARIO INICIAL
    const [form, setForm] = useState(initialForm)

    // EFECTO PARA CUANDO HAY DATA TO EDIT
    useEffect(() => {
        if(dataToEdit) {
          setForm(dataToEdit)
        } else {
            setForm(initialForm)
        }
      }, [dataToEdit])

    // PARA CAMBIAR EL MANEJO DEL CHANGE 
    const handleNoteChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // PARA ENVIAR EL FORMULARIO TANTO PARA EDITAR COMO GUARDAR
    const handleSubmit = e => {
        e.preventDefault()

        if(form.id === null) {
            createNote(form)
        } else {
            updateNote(form)
        }

        handleReset()
    }

    // PARA RESETEAR EL FORMULA4RIO
    const handleReset = () => {
        setForm(initialForm)
        setDataToEdit("")
    }

    // PARA DESACTIVAR EL BOTON
    const isDisabled = form.content.length === 0 ? "disabled" : "";

  return (
    <Box
        component="div"
    >
        <form
        onSubmit={handleSubmit}
        >
          <TextField fullWidth label="Note" className='input_note' name='content' value={form.content} onChange={handleNoteChange} />
          <Stack justifyContent="center" spacing={2} marginTop={2} direction="row" >
            <Button fullWidth color='primary' type='submit' disabled={isDisabled} variant="contained" startIcon={<SendIcon/>}>{dataToEdit ? "Guardar cambios" : "Guardar Nota"}</Button>
            <Button fullWidth variant="contained" color="warning" onClick={handleReset} startIcon={<AutorenewIcon/>} >Limpiar input</Button>
          </Stack>
        </form>
    </Box>
  )
}

export default NoteForm