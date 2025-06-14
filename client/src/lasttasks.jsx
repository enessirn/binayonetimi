import { useEffect, useState, useContext } from "react";
import { List, Typography, Modal, InputNumber, Select, Input, Popconfirm, message } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import TransactionContext from "./context/TransactionContext";
import AmountContext from './context/AmountContext';
const { Option } = Select;


function LastTasks() {
  // context
  const { fetchTransactions, transactions } = useContext(TransactionContext);
  const { getAmount } = useContext(AmountContext);
  // state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("gelir");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState(0);
  const [loading, setLoading] = useState(false);

  // Modal açma
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Modal kapama
  const handleCancel = () => {
    resetForm();
  };

  // Modal onay
  const handleOk = async () => {
    if (desc.trim() === "" || cost <= 0) {
      message.error("Lütfen geçerli bir açıklama ve tutar giriniz");
      return;
    }

    await addTransaction(desc, cost, status);

  };

  // Formu sıfırla
  const resetForm = () => {
    setDesc("");
    setCost(0);
    setIsModalOpen(false);
  };

  // Yeni işlem ekle
  const addTransaction = async (desc, cost, status) => {
    try {
      const newData = {
        id: Date.now(),
        desc,
        cost,
        status,
        date: new Date().toISOString()
      };
      await axios.post("http://localhost:3000/api/transactions-add", newData);
      fetchTransactions();
      resetForm();
      getAmount();
      message.success("İşlem başarıyla eklendi");
    } catch (error) {
      console.error("İşlem eklenirken hata:", error);
      message.error("İşlem eklenirken bir hata oluştu");
    }
  };

  // İşlem sil
  const deleteTransaction = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/transactions-delete/${id}`);
      message.success("İşlem başarıyla silindi");
      fetchTransactions();
      getAmount();

    } catch (error) {
      console.error("İşlem silinirken hata:", error);
      message.error("İşlem silinirken bir hata oluştu");
    }
    finally {
      setLoading(false);
    }
  };

  // Tarih formatı
  const formatDate = (date) => {
    return new Date(date).toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Select ön eki
  const selectBefore = (
    <Select value={status} style={{ width: 60 }} onChange={(value) => setStatus(value)}>
      <Option value="gelir">+</Option>
      <Option value="gider">-</Option>
    </Select>
  );

  return (
    <div className="mt-4 shadow-md">

      <button
        className="w-[80%] text-white font-bold lg:w-1/3 shadow-md rounded-lg my-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors"
        onClick={showModal}
      >
        <PlusOutlined /> Yeni işlem ekle
      </button>

      <List
        header={<div>Son İşlemler</div>}
        bordered
        dataSource={transactions}
        renderItem={item => (
          <List.Item key={item.id} className="!cursor-pointer hover:bg-gray-100 transition-colors">
            <Typography.Text className={`${item.status === "gelir" ? "!text-green-500" : "!text-red-500"} !font-bold min-w-[90px] lg:min-w-[200px]`}>
              {item.status === "gelir" ? "+ " : "- "}{item.cost} ₺
            </Typography.Text>
            <Typography.Text className="!text-black !font-regular mx-auto">{item.desc}</Typography.Text>
            <Typography.Text className="!text-gray-400 !font-thin float-right">
              {formatDate(item.date)}
            </Typography.Text>
            {
              item.deleted !== false ?
                <Popconfirm
                  title="İşlemi sil"
                  description="Bu işlemi silmek istediğine emin misin?"
                  onConfirm={() => deleteTransaction(item.id)}
                  okText="Evet"
                  cancelText="Hayır"
                  okType="danger"
                  disabled={loading}
                >
                  <button disabled={loading} className="!text-red-500 !font-bold hover:!text-red-600 transition-colors ml-5 cursor-pointer">
                    Sil
                  </button>
                </Popconfirm> : null
            }

          </List.Item>
        )}
      />

      <Modal
        title="Yeni işlem ekle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable
      >
        <Input
          placeholder="Açıklama"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <p className="text-red-500 my-4">Sol taraftan gelir/gider durumunu seçmeyi unutma</p>
        <p className={`${status === "gelir" ? "text-green-500" : "text-red-500"} font-bold`}>
          Şuanda {status === "gelir" ? "gelir" : "gider"} ekliyorsunuz
        </p>
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
  );
}

export default LastTasks;
