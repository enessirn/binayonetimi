import { DeleteOutlined } from "@ant-design/icons"
import AidatCard from "./AidatCard"
import axios from "axios"
import { useEffect } from "react";
function Aidatlar({ aidatStatus, setAidatStatus, setResetAidatStatus, resetAidatStatus }) {



  // aidatlari sifirla
  const resetAidats = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/aidats-reset');
      console.log(response.data.message);

      const updatedStatus = aidatStatus.map(item => ({
        ...item,
        status: false,
        date: null
      }));
      setAidatStatus(updatedStatus);
    } catch (error) {
      console.error('Error resetting aidats:', error);
    }
  }

  useEffect(() => {
    if (resetAidatStatus) {
      resetAidats();
    }
    setResetAidatStatus(false);
  }, [resetAidatStatus]);

  return (
    <>
      <button className="py-2 px-4 bg-red-200 rounded font-bold text-red-600 cursor-pointer hover:bg-red-300 transition-colors mb-4" onClick={() => setResetAidatStatus(true)}><DeleteOutlined /> Sıfırla</button>

      {
        aidatStatus.map((item, index) => (
          <AidatCard aidatStatus={aidatStatus} setAidatStatus={setAidatStatus} aidatIndex={index} key={item.id} />
        ))
      }
    </>

  )
}

export default Aidatlar