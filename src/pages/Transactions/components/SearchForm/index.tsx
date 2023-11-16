import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

/**
 * Pq um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer);
 * - Props changed;
 * - Parent rerendered;
 *
 * Qual o fluxo de renderização?
 * 1. O react recria o html da interface daquele componente;
 * 2. Compara a versão do html recriada com a versão anterior;
 * 3. SE mudou alguma coisa, ele reescreve o html na tela;
 *
 * Memo:
 * 0. Hooks changed, Props changed (shallow compare);
 * 0.1. Comparar com a versão anterior dos hooks e props;
 * 0.2. SE mudou algo, ele vai permitir a nova renderização;
 */

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
