import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [inputCurrency, setInputCurrency] = useState(0);
  const [outputCurrency, setOutputCurrency] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/` + from + `.json`)
      .then(res => res.json())
      .then(data => {
        const currencyKeys = Object.keys(data[from]);
        const currencyInfo = data[from][to]
        setCurrencies(currencyKeys);
        setOutputCurrency((currencyInfo * inputCurrency).toFixed(4))
        document.querySelector(".list-a").value = from.toUpperCase();
        document.querySelector(".list-b").value = to.toUpperCase();

      })
  }, [inputCurrency, outputCurrency, from, to])

  function swap() {
    let list_a = document.querySelector(".list-a").value.toLowerCase();
    let list_b = document.querySelector(".list-b").value.toLowerCase();
    setFrom(to);
    document.querySelector(".list-a").value = to.toUpperCase();

    setTo(from);
    document.querySelector(".list-b").value = from.toUpperCase();

  }

  return (
    <>
      <div className="container">
        <div className="main-container">
          <h1 className="heading">Currency Converter</h1>
          <br />
          <div className="first-container">
            <p className="from">FROM</p>
            <div className="input-box">
              <input type="text" placeholder='Enter a number' className="from-currency" onChange={(e) => setInputCurrency(e.target.value)} />
              <select name="currency-list" id="" className='currency-list list-a' onChange={(e) => setFrom(e.target.value.toLowerCase())}>
                {currencies.map((value) => <option key={value}>{value.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          <div className="swap-button">
            <input type="button" value="Swap" onClick={swap} />
          </div>
          <div className="second-container">
            <p className="to">TO</p>
            <div className="input-box">
              <input type="text" className="to-currency" value={outputCurrency} disabled />
              <select name="currency-list" id="" className='currency-list list-b' onChange={(e) => setTo(e.target.value.toLowerCase())}>
                {currencies.map((value) => <option key={value}>{value.toUpperCase()}</option>)}
              </select>
            </div>


          </div>

        </div>
      </div>
    </>
  )
}

export default App
