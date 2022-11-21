import { useContext } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import {ExpensesContext} from '../store/expenses-context'
import { getDateMinusDAys } from "../util/date"


const RecentExpenses = () => {
  const expenseCtx = useContext(ExpensesContext)

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date() 
    const date7DaysAgo = getDateMinusDAys(today, 7)

    return expense.date > date7DaysAgo
  })
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod={'Last 7 Days'}/>
  )
}

export default RecentExpenses