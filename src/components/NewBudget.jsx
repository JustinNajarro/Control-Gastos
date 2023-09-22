import {useState} from 'react'
import Mensage from './Mensage'

const NewBudget = ({budget, setBudget, setIsValidBudget}) => {

    const [mensage, setMensage] = useState('')

    const handleBudget = (e) => {
        e.preventDefault();

        if(!budget || budget < 0){
            setMensage('No es un presupuesto valido');
            return
        } 

        setMensage('') 
        setIsValidBudget(true)
    }

    return (

        <div className='container-budget container shadow'>
            <form onSubmit={handleBudget} className='form'>
                <div className='field'>
                    <label>Definir Presupuesto</label>
                    <input 
                        className='new-budget' 
                        type='number' 
                        placeholder='Añade tu Presupuesto'
                        value={budget}
                        onChange={e => setBudget( Number(e.target.value))}  
                    />
                </div>
                <input type="submit" value='Añadir'/>
                {mensage && <Mensage type='error'>{mensage}</Mensage>}
            </form>
        </div>
  )
}

export default NewBudget
