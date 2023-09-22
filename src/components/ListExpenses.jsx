import React from 'react'
import Expense from './Expense'

const ListExpenses = ({expenses, setExpenseEdit, deleteExpense, filter, filteredExpenses}) => {
  return (
    <div className='list-expense container'>
        

        { filter ? (
          <>
          <h2>{filteredExpenses.length ? 'Gastos' : 'No hay Gastos en esta categoría'}</h2>
          {filteredExpenses.map(expense => (
            <Expense 
                key = {expense.id}
                expense = {expense}
                setExpenseEdit = {setExpenseEdit}
                deleteExpense = {deleteExpense}
            />
          ))}
          </>
        ) : (
          <>
          <h2>{expenses.length ? 'Gastos' : 'No hay Gastos aún'}</h2>
          {expenses.map( expense => (
            <Expense 
                key = {expense.id}
                expense = {expense}
                setExpenseEdit = {setExpenseEdit}
                deleteExpense = {deleteExpense}
            />
          ))}
          </>
        )
        }
    </div>
  )
}

export default ListExpenses
