import { useContext } from 'react';
import { Avatar, Card, Flex } from 'antd';
import axios from 'axios';
import AmountContext from './context/AmountContext';
import TransactionContext from './context/TransactionContext';
function AidatCard({ aidatStatus, setAidatStatus, aidatIndex }) {
  const tarih = new Date();
  const year = tarih.getFullYear();
  const month = tarih.getMonth() + 1;
  const day = tarih.getDate();
  const formattedDate = `${day}/${month}/${year}`;
  const { getAmount } = useContext(AmountContext);
  const { fetchTransactions } = useContext(TransactionContext);

  const aidatPaid = () => {
    const updatedAidatStatus = [...aidatStatus];
    updatedAidatStatus[aidatIndex].status = true;
    updatedAidatStatus[aidatIndex].date = formattedDate;
    setAidatStatus(updatedAidatStatus);

    // api
    axios.post(`http://localhost:3000/api/aidats/${aidatStatus[aidatIndex].id}/ver`, {
      id: aidatStatus[aidatIndex].id,
      date: formattedDate
    });

    // guncelle bakiye
    getAmount();
    fetchTransactions();

  };

  const isPaid = aidatStatus[aidatIndex].status;

  return (
    <div>
      <Flex gap="middle" align="start" vertical>
        <Card style={{ width: "100%" }}>
          <Card.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${aidatIndex}`} />}
            title={aidatStatus[aidatIndex].name}
            description={
              <>
                {isPaid && <p>{formattedDate}</p>}
                <p className="font-bold">
                  Ödeme Durumu:<span className={`${isPaid ? "text-green-600" : "text-red-500"} !font-regular`}>
                    {isPaid ? "Ödendi!" : "Ödenmedi"}
                  </span>
                </p>
              </>
            }
          />
          {!isPaid && (
            <button
              className="w-1/4 rounded-full cursor-pointer float-right bg-blue-200 mt-2 py-2 hover:bg-blue-300 text-md"
              onClick={aidatPaid}
            >
              Öde
            </button>
          )}
        </Card>
      </Flex>
    </div>
  );
}

export default AidatCard;
