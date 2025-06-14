import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AmountContext = createContext();


export const AmountProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);

  const getAmount = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/balance`);
      setAmount(response.data.amount);
    } catch (error) {
      console.error('Error fetching amount:', error);
    }
  }
  useEffect(() => {
    getAmount()
  }, []);

  return (
    <AmountContext.Provider value={{ amount, getAmount }}>
      {children}
    </AmountContext.Provider>
  );
};

export default AmountContext;