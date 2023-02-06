import { useState } from 'react'
import './App.css'

import subsFilters from './hooks/subscriptions-core/filters.json'
import subsActions from './hooks/subscriptions-core/actions.json'
// import squareFilters from './hooks/square/filters.json'
// import squareActions from './hooks/square/actions.json'
import bundlesFilters from './hooks/bundles/filters.json'
import bundlesActions from './hooks/bundles/actions.json'
import wcpayFilters from './hooks/wcpay/filters.json'
import wcpayActions from './hooks/wcpay/actions.json'
import wcsFilters from './hooks/wcs/filters.json'
import wcsActions from './hooks/wcs/actions.json'
;[...subsFilters.hooks, ...subsActions.hooks].forEach(
  (hook) => (hook.repo = '🍎 woocommerce-subscriptions-core')
)
// ;[...squareFilters.hooks, ...squareActions.hooks].forEach(
//   (hook) => (hook.repo = 'woocommerce-square')
// )
;[...wcsFilters.hooks, ...wcsActions.hooks].forEach(
  (hook) => (hook.repo = '♻️ woocommerce-subscriptions')
)
;[...bundlesFilters.hooks, ...bundlesActions.hooks].forEach(
  (hook) => (hook.repo = '📦 woocommerce-product-bundles')
)
;[...wcpayFilters.hooks, ...wcpayActions.hooks].forEach(
  (hook) => (hook.repo = '💰 woocommerce-payments')
)

const filters = [
  ...subsFilters.hooks,
  ...wcsFilters.hooks,
  ...bundlesFilters.hooks,
  ...wcpayFilters.hooks,
]
const actions = [
  ...subsActions.hooks,
  ...wcsActions.hooks,
  ...bundlesActions.hooks,
  ...wcpayActions.hooks,
]
const hooks = [...filters, ...actions]

function App() {
  const [search, setSearch] = useState('woocommerce_product_get_price')

  const filteredHooks = hooks.filter((hook) => {
    if (search === '') return false
    if (hook.file.toLowerCase().startsWith('test')) return false
    if (hook.file.toLowerCase().startsWith('release')) return false
    return hook.name.toLowerCase() === search.toLowerCase()
  })

  return (
    <div className="App">
      <h1>Woo Hooks Explorer</h1>
      <input
        type="text"
        placeholder="Search for a hook"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredHooks.map((hook, index) => (
        <div key={`${hook.name}${index}`} className="card">
          <p>
            <strong className="title">{hook.repo}</strong>
          </p>
          <p>{hook.file}</p>
          <p>
            Priority: <strong>{hook.priority || '🤷'}</strong>
          </p>
        </div>
      ))}
    </div>
  )
}

export default App
