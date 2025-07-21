import { useState, useReducer } from 'react'


function App() {
  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

  function cartReducer(state, action) {
    switch (action.type) {
      case 'ADD_ITEM':
        const existingProduct = state.find(p => p.name === action.payload.name);
        if (existingProduct) {
          action.payload.quantity = existingProduct.quantity + 1;
        } else {
          return [...state, { ...action.payload, quantity: 1 }];
        }

      case 'UPDATE_QUANTITY':
        if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
          return state;
        }
        return state.map(p => p.name === action.payload.name ? { ...p, quantity: action.payload.quantity } : p);

      case 'REMOVE_ITEM':
        const p = state.find(p => p.name === action.payload);
        if (p.quantity === 1) {
          return state.filter(p => p.name !== action.payload);;
        }
        const updatedProduct = state.map(p => {
          if (p.name === action.payload) {
            return { ...p, quantity: p.quantity - 1 };
          }
          return p;
        });

        return updatedProduct;
        break;

      default:
        return state;
    }
  }

  // const updateProductQuantity = (name, quantity) => {
  //   if (quantity < 1 || isNaN(quantity)) {
  //     return;
  //   }
  //   setAddedProducts(curr => curr.map(p => p.name === name ? { ...p, quantity } : p));
  // }
  //   const removeFromCart = (product) => {
  //   const p = addedProducts.find(p => p.name === product.name);
  //   if (p.quantity === 1) {
  //     const updatedCart = addedProducts.filter(p => p.name !== product.name);
  //     console.log(updatedCart);
  //     setAddedProducts(updatedCart);
  //   } else {
  //     const updatedProduct = addedProducts.map(p => {
  //       if (p.name === product.name) {
  //         return { ...p, quantity: p.quantity - 1 };
  //       }
  //       return p;
  //     });

  //     setAddedProducts(updatedProduct);
  //   }
  // }
  // const addToCart = (product) => {
  //   const existingProduct = addedProducts.find(p => p.name === product.name);
  //   if (existingProduct) {
  //     updateProductQuantity(existingProduct.name, existingProduct.quantity + 1);
  //     return;
  //   }
  //   setAddedProducts(curr => [...addedProducts, { ...product, quantity: 1 }]);
  // };

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const totaleDaPagare = addedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  return (
    <>
      <div className='container'>
        <div>
          <h3>Prodotti tra cui scegliere</h3>
          <ul>
            {products.map((p, i) => {
              return (
                <li className='list-item' key={i}>
                  <p>{p.name} ({p.price.toFixed(2)} €)</p>
                  <button className='btn add-cart' onClick={() => dispatchCart({ type: 'ADD_ITEM', payload: p })}>Aggiungi al carrello</button>
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

                    <p>
                      <input type="number" value={p.quantity} onChange={e => dispatchCart({ type: 'UPDATE_QUANTITY', payload: { name: p.name, quantity: parseInt(e.target.value) } })} />
                      <span>x {p.name} ({p.price.toFixed(2)} €)</span>
                    </p>

                    <button className='btn remove-cart' onClick={() => dispatchCart({ type: 'REMOVE_ITEM', payload: p.name })}>Rimuovi dal carrello</button>
                  </li>
                )
              })}
            </ul>

            <h4>Totale da pagare: <strong>{totaleDaPagare.toFixed(2)} €</strong></h4>

          </div>
        }
      </div>
    </>
  )
}

export default App