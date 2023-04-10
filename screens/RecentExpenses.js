import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDAys } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] =useState(true)
  const [error, setError] =useState(true)

  const expenseCtx = useContext(ExpensesContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([])

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpense(expenses)
      } catch (error) {
        setError('Could not fetch expenses!')
      }
      setIsFetching(false)
      // setFetchedExpenses(expenses);
    }

    getExpenses()
  }, []);

  function errorHandler() {
    setError(null)
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDAys(today, 7);

    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallbackText="No Recent"
    />
  );
};

export default RecentExpenses;
