import getSymbolFromCurrency from "currency-symbol-map";
import { createContext, useEffect, useState } from "react";

export const path = createContext()

const PathProvider = ({ children }) => {
    const [title, settitle] = useState('Welcome')
    const [transactions, settransactions] = useState([])
    const [currencycodes, setcurrencycodes] = useState('INR')
    const [currencySymbol, setcurrencySymbol] = useState(getSymbolFromCurrency('INR'))

    useEffect(()=>{
        const savedCodes = localStorage.getItem('Currencycode')

        if(savedCodes){
            setcurrencycodes(savedCodes)
            setcurrencySymbol(localStorage.getItem('Currencysymbol'))
        }
    },[])
    return <path.Provider value={{ title, settitle, transactions, settransactions, currencycodes, setcurrencycodes, currencySymbol, setcurrencySymbol }}>
        {children}
    </path.Provider>
}

export default PathProvider