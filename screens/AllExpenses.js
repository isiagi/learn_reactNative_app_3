
import { useContext } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"


const AllExpenses = () => {
  const expenseCtx = useContext(ExpensesContext)

  return (
    <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod={'total'} fallbackText="No Recent Found" />
  )
}

export default AllExpenses