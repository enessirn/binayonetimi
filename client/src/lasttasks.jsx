import { useEffect, useState } from "react";
import { List, Typography, Modal } from 'antd';
import { PlusOutlined } from "@ant-design/icons"
import { InputNumber, Select, Input, Popconfirm, message } from 'antd';
import axios from "axios";
function LastTasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("gelir");
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (desc.trim() === "" || cost < 0)
      message.error("Lütfen açıklama ve tutar giriniz");
    else {
      await addTransaction(desc, cost, status);
      message.success("İşlem başarıyla eklendi");
      allTransactions(); // yeni eklenen islemi listeye ekle
    }
    // kapanis
    setDesc("");
    setCost(0);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setDesc("");
    setCost(0);
    setIsModalOpen(false);
  };
  const confirm = (e,id) => {
    deleteTransaction(id);
    message.success('Click on Yes');
  };


  // butun islemler
  const allTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/transactions");
      setData(response.data.reverse()); 
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  useEffect(() => {
    allTransactions();
  }, []);

  // data format
  function formatDate(date) {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    return formattedDate;
  }

  // islem ekle
  const addTransaction = async (desc, cost, status) => {
    try {
      const data = {
        id: Date.now(),
        desc,
        cost,
        status,
        date: new Date().toISOString()
      };
      const response = await axios.post("http://localhost:3000/api/transactions-add", data);
      console.log(response.transaction);
      setDesc("");
      setCost(0);
      message.success("İşlem başarıyla eklendi");
      return response.transaction

    } catch (error) {
      console.error("Error adding transaction:", error);
      message.error("İşlem eklenirken bir hata oluştu");
    }
  }


// işlem sil
  const deleteTransaction = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/transactions-delete/${id}`);
      console.log(response.data);
      message.success("İşlem başarıyla silindi");
      allTransactions(); // silinen islemi listeden kaldir
    } catch (error) {
      console.error("Error deleting transaction:", error);
      message.error("İşlem silinirken bir hata oluştu");
    }
  }




  const selectBefore = (
    <Select defaultValue={status} style={{ width: 60 }} onChange={(value) => setStatus(value)}>
      <Option value="gelir">+</Option>
      <Option value="gider">-</Option>
    </Select>
  );
  return (
    <div className="mt-4 shadow-md">

      <button className="w-[80%] text-white font-bold lg:w-1/3 shadow-md rounded-lg my-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors" onClick={showModal}><PlusOutlined /> Yeni işlem ekle </button>

      <List
        header={<div>Son İşlemler</div>}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item key={item?.id} onClick={((e) => console.log(e.currentTarget.getAttribute("data-id")))} data-id={item?.id} className="!cursor-pointer hover:bg-gray-100 transition-colors">
            <Typography.Text className={`${item.status === "gelir" ? "!text-green-500" : "!text-red-500"}  !font-bold min-w-[90px] lg:min-w-[200px]`}>{item.status ? "+ " : "- "}{item.cost} ₺</Typography.Text>
            <Typography.Text className="!text-black !font-regular mx-auto">{item.desc}</Typography.Text>
            <Typography.Text className="!text-gray-400 !font-thin float-right">{String(formatDate(item.date))}</Typography.Text>
            <Popconfirm
              title="İşlemi sil"
              placement="topRight"
              okType="danger"
              description="Bu işlemi silmek istediğine emin misin?"
              onConfirm={(e) => confirm(e,item.id)}
              okText="Evet"
              cancelText="Hayır"
            >
              <button className="!text-red-500 !font-bold hover:!text-red-600 transition-colors ml-5 cursor-pointer">Sil</button>
            </Popconfirm>
          </List.Item>
        )}
      />
      {/* add a transaction */}
      <Modal
        title="Yeni işlem ekle"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="Açıklama" onChange={(e) => setDesc(e.target.value)} value={desc} />
        <p className="text-red-500 my-4">Sol taraftan gelir/gider durumunu seçmeyi unutma</p>
        <p className={`${status === "gelir" ? "text-green-500" : "text-red-500"} font-bold`}>Şuanda {status === "gelir" ? "gelir" : "gider"} ekliyorsunz</p>
        <InputNumber
          addonBefore={selectBefore}
          addonAfter={"₺"}
          placeholder={"101.48 ₺"}
          min={1}
          onChange={(value) => setCost(value)}
          value={cost}
        />
      </Modal>
    </div>
  )
}

export default LastTasks;