import { createContext, useState, useEffect } from 'react';

const AmountContext = createContext();


export const AmountProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);

  const getAmount = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/balance');
      const data = await response.json();
      setAmount(data.amount);
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