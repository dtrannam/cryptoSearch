import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import CoinInfo from "./Components/coinInfo";
import { Input } from "semantic-ui-react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const cryptoURL = "https://min-api.cryptocompare.com/data/all/coinlist?&api_key="

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchAllCoinData().catch(console.error);
  }, []);


  const fetchAllCoinData = async () => {
    console.log(cryptoURL + API_KEY)
    const response = await fetch(cryptoURL + API_KEY);
    const json = await response.json();
    setList(json)
  };

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <div className="App">
      <div className="whole-page">
        <h1>My Crypto List</h1>
          <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
            />
            <ul className='CoinList'>
              {searchInput.length > 0
                    ? filteredResults.map((coin) => 
                          list.Data[coin].PlatformType === "blockchain" ? 
                          <CoinInfo
                            image={list.Data[coin].ImageUrl}
                            name={list.Data[coin].FullName}
                            symbol={list.Data[coin].Symbol}
                          />
                          : null
                      )
                    : list && Object.entries(list.Data).map(([coin]) => 
                          list.Data[coin].PlatformType === "blockchain" ? 
                          <CoinInfo
                            image={list.Data[coin].ImageUrl}
                            name={list.Data[coin].FullName}
                            symbol={list.Data[coin].Symbol}
                          />
                          : null
                      )}
            </ul>
      </div>
    </div>
  )
}

export default App
