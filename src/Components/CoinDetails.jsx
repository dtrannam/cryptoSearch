import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetails = () => {
    let { symbol } = useParams();
    symbol = symbol.toUpperCase()
    const priceURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
    const generalURL = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`
    const [fullDetails, setFullDetails] = useState(null);
    
    useEffect(() => {
        getCoinDetails().catch(console.error);
    }, [])

    useEffect(() => {
        console.log(fullDetails)
    }, [fullDetails])

    const getCoinDetails = async() => {
        const priceResponse = await fetch(priceURL)
        const priceJson = await priceResponse.json()
        const generalReponse = await fetch(generalURL)
        const generalJson = await generalReponse.json()
        setFullDetails({
            "pricing": priceJson.DISPLAY[symbol]["USD"],
            "info": generalJson.Data[symbol]
        })

    }

    return (
        <div>
            {fullDetails ? (
                <div> 
                    <h1>{fullDetails["info"].FullName}</h1>
                    <p>Founded: {fullDetails["info"].AssetLaunchDate}</p>
                    <p>{fullDetails["info"].Description}</p>
                    <img src={`https://www.cryptocompare.com${fullDetails["info"].ImageUrl}`} alt="Coin Image"/>
                    <table>
                        <thead>
                            <tr>
                                <th>Details</th>
                                <th>Pricing</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Price</td>
                                <td>{fullDetails["pricing"]["PRICE"]}</td>
                            </tr>
                            <tr>
                                <td>Change Percentage of Day</td>
                                <td>{fullDetails["pricing"]["CHANGEPCTDAY"]}</td>
                            </tr>
                            <tr>
                                <td>Change Amount of Day</td>
                                <td>{fullDetails["pricing"]["CHANGEDAY  "]}</td>
                            </tr>
                            <tr>
                                <td>Market Cap</td>
                                <td>{fullDetails["pricing"]["MKTCAP"]}</td>
                            </tr>
                            <tr>
                                <td>Total Supply</td>
                                <td>{fullDetails["pricing"]["SUPPLY"]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            )
            

            
            : (<h1>Loading</h1>)}
        </div>
    )

}

export default CoinDetails