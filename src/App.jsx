import { useState } from 'react'


function App() {
  const [addedProducts, setAddedProducts] = useState([]);

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const addToCart = (product) => {
    if (!addedProducts.includes(product)) {
      setAddedProducts([
        ...addedProducts,
        {
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ])
    }
  }

  return (
    <>
      <div className='container'>
        <div>
          <h3>Lista spesa</h3>
          <ul>
            {products.map((p, i) => {
              return (
                <li className='list-item' key={i}>
                  <p>{p.name}</p>
                  <p>{p.price}</p>
                  <button className='btn' onClick={() => addToCart(p)}>Aggiungi al carrello</button>
                </li>
              )
            })}
          </ul>
        </div>

        {addedProducts.length != 0
          &&
          <div>
            <h3>Carrello</h3>
            <ul>
              {addedProducts.map((p, i) => {
                return (
                  <li className='list-item' key={i}>
                    <p>{p.name}</p>
                    <p>{p.price}</p>
                    <p>{p.quantity}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        }
      </div>
    </>
  )
}

export default App
