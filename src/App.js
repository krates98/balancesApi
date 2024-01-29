import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mexcData, setMexcData] = useState([]);
  const [kucoinData, setKucoinData] = useState([]);
  const [bitmartData, setBitmartData] = useState([]);

  useEffect(() => {
    fetch("http://139.59.32.99:3000/mexc")
      .then((response) => response.json())
      .then((data) => setMexcData(data));

    fetch("http://139.59.32.99:3000/kucoin")
      .then((response) => response.json())
      .then((data) => setKucoinData(data));

    fetch("http://139.59.32.99:3000/bitmart")
      .then((response) => response.json())
      .then((data) => setBitmartData(data));
  }, []);

  return (
    <div className="App">
      <h2>Mexc Data</h2>
      {mexcData.map((client) => (
        <div key={client.clientName}>
          <p>Client Name: {client.clientName}</p>
          {client.balances.map((balance) => (
            <p key={balance.asset}>
              Asset: {balance.asset}, Balance:{" "}
              {parseFloat(balance.free) + parseFloat(balance.locked)}
            </p>
          ))}
        </div>
      ))}

      <h2>Kucoin Data</h2>
      {kucoinData.map((account) => (
        <div key={account.accountLabel}>
          <p>Client Name: {account.accountLabel}</p>
          {Object.entries(account.balances).map(([asset, balance]) => (
            <p key={asset}>
              Asset: {asset}, Balance: {balance}
            </p>
          ))}
        </div>
      ))}

      <h2>Bitmart Data</h2>
      {bitmartData.map((asset) => (
        <div key={asset.name}>
          <p>Client Name: Bobc Bitmart</p>
          <p>
            Asset: {asset.name}, Balance: {asset.balance}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
