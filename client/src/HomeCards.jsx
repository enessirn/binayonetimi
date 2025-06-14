import { useEffect, useState, useContext } from 'react';
import { Modal } from 'antd';
import Aidatlar from './Aidatlar';
import SlotCounter from 'react-slot-counter';
import axios from 'axios';
import AmountContext from './context/AmountContext';
function HomeCards() {
  const { amount, getAmount } = useContext(AmountContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [aidatStatus, setAidatStatus] = useState([]);
  const[resetAidatStatus, setResetAidatStatus] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // aidat durumu
  const fetchAidatStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/aidat-status');
      console.log('Aidat status fetched:', response.data);
      setAidatStatus(response.data);
    } catch (error) {
      console.error('Error fetching aidat status:', error);
    }
  };
  const aidatVerenler = aidatStatus.filter(item => item.status === true).length;

  useEffect(() => {
    console.log('Aidat verenler:', aidatVerenler);
    getAmount();
    fetchAidatStatus();
  }, []);
  useEffect(() => {
    if (resetAidatStatus) {
      fetchAidatStatus();
    }
  }, [resetAidatStatus]);

  return (
    <>
      <div className='w-full flex md:flex-row flex-col px-4 border border-gray-200 rounded-lg shadow-md bg-white p-4'>
        <div className='lg:w-1/2 w-full p-4 border-r border-gray-200 cursor-pointer rounded hover:bg-gray-50'>
          <h1 className='text-xl font-bold text-center'>Toplam Bakiye:</h1>
          <p className={`text-2xl font-bold text-center ${amount < 0 ? "text-red-600" : "text-green-600"}`}><span className='mt-1 relative top-1'>₺ </span><SlotCounter value={amount} /> </p>
        </div>
        <div className='lg:w-1/2 w-full p-4 border-r border-gray-200 cursor-pointer rounded hover:bg-gray-50' onClick={showModal}>
          <h1 className='text-xl font-bold text-center'>Aidat Durumu:</h1>
          <p className='text-2xl font-bold text-yellow-600 text-center'>{aidatVerenler}/{aidatStatus.length}</p>
        </div>
      </div>

      <Modal
        title="Aidat Durumu"
        footer={null}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Aidatlar aidatStatus={aidatStatus} setAidatStatus={setAidatStatus} setResetAidatStatus={setResetAidatStatus} resetAidatStatus={resetAidatStatus} />
      </Modal>
    </>
  );
}

export default HomeCards;
