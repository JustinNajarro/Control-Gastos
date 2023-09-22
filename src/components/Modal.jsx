import React, { useState, useEffect } from 'react'
import Mensage from './Mensage'
import CloseBtn from '../img/cerrar.svg'

const Modal = ({setModal, animateModal, setAnimateModal, saveExpense, expenseEdit, setExpenseEdit}) => {

    const [mensage, setMensage] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if( Object.keys(expenseEdit).length > 0) {
            setName(expenseEdit.name)
            setAmount(expenseEdit.amount)
            setCategory(expenseEdit.category)
            setId(expenseEdit.id)
            setDate(expenseEdit.date)
        }
    }, [])

    const closeModal = () => {
        setExpenseEdit({})
        setAnimateModal(false)
        setTimeout(()=> {
            setModal(false)
        }, 500)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if([ name, amount, category].includes('')) {
            setMensage('Todo los campos son obligatorios')

            setTimeout(() => {
                setMensage('')
            },3000)
            return
        }

        saveExpense({name, amount, category, id, date})
        

    }

    return (
        <div className='modal'>
            <div className='close-modal'>
                <img 
                    src={CloseBtn} 
                    alt="close-modal"
                    onClick={closeModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`form ${animateModal ? 'animate' : 'close'}`}>
                <legend>{expenseEdit.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                
                {mensage && <Mensage type='error'>{mensage}</Mensage>}

                <div className='field'>
                    <label htmlFor="name">Nombre Gasto</label>

                    <input 
                        id="name"
                        type="text"
                        placeholder='Añade el nombre del gasto'
                        value={name}
                        onChange={ e => setName(e.target.value)}
                     />
                </div>

                <div className='field'>
                    <label htmlFor="amount">Cantidad</label>

                    <input 
                        id="amount"
                        type="number"
                        placeholder='Añade la cantidad del gasto'
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                     />
                </div>

                <div className='field'>
                    <label htmlFor="category">Categoría</label>

                    <select 
                        id="category"
                        value={category}
                        onChange={ e => setCategory(e.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastosVarios">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                </div>

                <input 
                    type="submit"
                    value={expenseEdit.name ? "Guardar Cambios" : "Añadir Gasto"}
                />
                
            </form>
        </div>
    )
}

export default Modal
