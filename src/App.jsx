import { useState } from 'react'


function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  return (
    <>
      <ul>
        {products.map((p, i) => {
          return (
            <li key={i}>
              <h3>{p.name} - <span>{p.price}</span></h3>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
