import { useState, useEffect } from 'react'
import { formatAmount } from '../helpers'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const BudgetControl = ({expenses ,budget, setExpenses, setBudget, setIsValidBudget}) => {
    
    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect(() => {
        const totalSpent = expenses.reduce( (total, expense) =>  expense.amount + total, 0)
        const totalAvailable = budget - totalSpent
        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2)

        setSpent(totalSpent)
        setAvailable(totalAvailable)

        setTimeout(()=>{
            setPercentage(newPercentage)
        },500)
    }, [expenses])

    const handleResetApp = () => {
        const  result = confirm('¿Deseas reiniciar presupuesto y gastis')

        if(result){
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }

    return (
        <div className='container-budget container shadow two-columns'>
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#e00' : '#3b82f6',
                        textColor: '#3b82f6'
                    })}
                    value={percentage}
                    text={`${percentage}% Gastado`}
                />
            </div>

            <div className='content-budget'>
                <button 
                    className='reset-app' 
                    type='button'
                    onClick={handleResetApp}>
                        Resetear App
                </button>
                <p>
                    <span>Presupuesto:</span> {formatAmount(budget)}
                </p>
                <p className= {`${available < 0 ? 'negative' : ''}`} >
                    <span>Disponible:</span> {formatAmount(available)}
                </p>
                <p>
                    <span>Gastado:</span> {formatAmount(spent)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl
