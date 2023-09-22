import React from 'react' 
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list' 
import 'react-swipeable-list/dist/styles.css'
import { formatDate } from '../helpers'
import IconAhorro from '../img/icono_ahorro.svg'
import IconCasa from '../img/icono_casa.svg'
import IconComida from '../img/icono_comida.svg'
import IconGastos from '../img/icono_gastos.svg'
import IconOcio from '../img/icono_ocio.svg'
import IconSalud from '../img/icono_salud.svg'
import IconSuscripciones from '../img/icono_suscripciones.svg'

const dictionaryIcon = {
    ahorro: IconAhorro,
    comida: IconComida,
    casa: IconCasa,
    gastosVarios: IconGastos,
    ocio: IconOcio,
    salud: IconSalud,
    suscripciones: IconSuscripciones,
}

const Expense = ({expense, setExpenseEdit, deleteExpense}) => {

    const {category, name, amount, id, date} = expense

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
                onClick={ () => setExpenseEdit(expense)}>
                    Editar
            </SwipeAction>
        </LeadingActions>
    )
        
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={ () => deleteExpense(id)}
                destructive = {true}>
                    Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem 
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}>
                <div className='expense shadow'>
                    <div className='content-expense'>
                        <img src={dictionaryIcon[category]} />
                        <div className='description-expense'>
                            <p className='category'>{category}</p>
                            <p className='name-expense'>{name}</p>
                            <p className='date-expense'>
                                Agredado el: {' '}
                                <span>{formatDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='amount-expense'>${amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>

    )
}

export default Expense
