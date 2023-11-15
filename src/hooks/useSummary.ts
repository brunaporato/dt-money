import { useContext } from 'react'
import { TransactionContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactions } = useContext(TransactionContext)

  // reduzir o array de transactions a um objeto { income: number, outcome: number, total: number }
  // acc = objeto inicial
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }
      return acc
    },
    { income: 0, outcome: 0, total: 0 },
  )

  return summary
}
