import { createContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

import axios from 'axios';

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await axios('http://localhost:3000/api/transactions');
      console.log('Transactions fetched:', response.data);
      setTransactions(response.data.reverse());
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loading, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionContext;