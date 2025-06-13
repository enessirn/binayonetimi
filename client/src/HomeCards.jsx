import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import Aidatlar from './Aidatlar';
import SlotCounter from 'react-slot-counter';
import axios from 'axios';
function HomeCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // fetct bakiye
  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/balance');
      console.log('Balance fetched:', response.data.amount);
      setBalance(response.data.amount);
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0; 
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);
  
  return (
    <>
      <div className='w-full flex md:flex-row flex-col px-4 border border-gray-200 rounded-lg shadow-md bg-white p-4'>
        <div className='lg:w-1/2 w-full p-4 border-r border-gray-200 cursor-pointer rounded hover:bg-gray-50'>
          <h1 className='text-xl font-bold text-center'>Toplam Bakiye:</h1>
          <p className={`text-2xl font-bold text-center ${balance < 0 ? "text-red-600" : "text-green-600"}`}><span className='mt-1 relative top-1'>₺ </span><SlotCounter value={balance} /> </p>
        </div>
        <div className='lg:w-1/2 w-full p-4 border-r border-gray-200 cursor-pointer rounded hover:bg-gray-50' onClick={showModal}>
          <h1 className='text-xl font-bold text-center'>Aidat Durumu:</h1>
          <p className='text-2xl font-bold text-yellow-600 text-center'>11/13</p>
        </div>
      </div>

      <Modal
        title="Aidat Durumu"
        footer={null}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Aidatlar />
      </Modal>
    </>
  );
}

export default HomeCards;
