import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import ListExpenses from './components/ListExpenses';
import Filter from './components/Filter';
import { generateId } from './helpers';
import IconNewExpenses from './img/nuevo-gasto.svg'

function App() {

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );

  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  
  const [expenseEdit, setExpenseEdit] = useState({})

  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])
  
  useEffect(()=> {
    if( Object.keys(expenseEdit).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimateModal(true)
      },300)
    }
  },[expenseEdit])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if(filter) {
      const filteredExpenses = expenses.filter( expense => expense.category === filter)
      setFilteredExpenses(filteredExpenses)
      
    }
  },[filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0

    if(budgetLS > 0){
      setIsValidBudget(true)
    }
  }, [])

  const handleNewExpense = () => {
    setModal(true)
    setExpenseEdit({})
    setTimeout(() => {
      setAnimateModal(true)
    },300)
  }
  
  const saveExpense = expense => {
    if(expense.id){
      const expensesUpdates = expenses.map( stateExpense => stateExpense.id === expense.id ? expense : stateExpense)
      setExpenses(expensesUpdates)
      setExpenseEdit({})
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense])
    }
    
    setAnimateModal(false)
    setTimeout(()=> {
        setModal(false)
    }, 500)
  }

  const deleteExpense = id => {
    const expensesUpdates = expenses.filter( expense => expense.id !== id);
    setExpenses(expensesUpdates)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
          expenses = {expenses}
          setExpenses = {setExpenses}
          budget = {budget}
          setBudget = {setBudget}
          isValidBudget = {isValidBudget}
          setIsValidBudget = {setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filter
              filter = {filter}
              setFilter = {setFilter}  
            />
            <ListExpenses 
              expenses = {expenses}
              setExpenseEdit = {setExpenseEdit}
              deleteExpense = {deleteExpense}
              filter = {filter}
              filteredExpenses = {filteredExpenses}
            />
          </main>
        <div className='new-expense'>
          <img 
            src= {IconNewExpenses}
            alt="icon new expenses"
            onClick={handleNewExpense}
          />
        </div>
        </>
      )}
      {modal && 
      <Modal 
        setModal = {setModal}
        animateModal = {animateModal}
        setAnimateModal = {setAnimateModal}
        saveExpense = {saveExpense}
        expenseEdit = {expenseEdit}
        setExpenseEdit = {setExpenseEdit}>
      </Modal>}
    </div>
  )
}

export default App
