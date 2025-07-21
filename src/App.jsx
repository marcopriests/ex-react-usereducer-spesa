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
    const existingProduct = addedProducts.find(p => p.name === product.name);
    if (!existingProduct) {
      setAddedProducts([
        ...addedProducts,
        { ...product, quantity: 1 }
      ]);
    } else {
      updateProductQuantity(existingProduct);
    }
  }


  const updateProductQuantity = (product) => {
    const updatedProducts = addedProducts.map(p => {
      if (p.name === product.name) {
        return { ...p, quantity: p.quantity + 1 };
      }
      return p;
    });

    setAddedProducts(updatedProducts);
  }

  const removeFromCart = (product) => {
    const p = addedProducts.find(p => p.name === product.name);
    if (p.quantity === 1) {
      const updatedCart = addedProducts.filter(p => p.name !== product.name);
      console.log(updatedCart);
      setAddedProducts(updatedCart);
    } else {
      const updatedProduct = addedProducts.map(p => {
        if (p.name === product.name) {
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      });

      setAddedProducts(updatedProduct);
    }
  }

  const totaleDaPagare = (arr) => {
    const totale = arr.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0)

    return totale;
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
                  <p>{p.price.toFixed(2)} €</p>
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
                    <p>{p.price.toFixed(2)} €</p>
                    <p>{p.quantity}</p>
                    <button className='btn' onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
                  </li>
                )
              })}
            </ul>

            <h4>Totale da pagare: <strong>{totaleDaPagare(addedProducts).toFixed(2)} €</strong></h4>

          </div>
        }
      </div>
    </>
  )
}

export default App
