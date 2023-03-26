import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const coinDetails = () => {
    let { symbol } = useParams();
    const priceURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
    const generalURL = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`
    const [fullDetails, setFullDetails] = useState(null);
    
    useEffect(() => {
        getCoinDetails().catch(console.error);
    }, [])

    const getCoinDetails = async() => {
        const priceResponse = await fetch(priceURL)
        const priceJson = priceResponse.json()
        const generalReponse = await fetch(generalURL)
        const generalJson = generalReponse.json()
        setFullDetails({
            "pricing": priceJson.DISPLAY, 
            "info": generalJson.Data
        })
    }

    return (
        <div>
            <h1>HELLO WORLD</h1>
        </div>
    )

}

export default coinDetails