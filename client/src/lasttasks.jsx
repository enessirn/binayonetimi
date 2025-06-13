import React,{useState} from "react";
import { Divider, List, Typography, Button, Modal  } from 'antd';
import {PlusOutlined} from "@ant-design/icons"
import { Cascader, InputNumber, Select, Space,Input } from 'antd';
function LastTasks() {
	 const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
	const[status,setStatus] = useState(true)
const data = [
	{desc: "Temizlik Malzemesi", cost: "200", status:false},
	{desc: "Ali Kemal Şirin Aidat", cost: "200", status:true},
	{desc: "Asansör Aylık Bakım", cost: "750", status:false},
];
const selectBefore = (
  <Select defaultValue="add" style={{ width: 60 }}>
    <Option value="add">+</Option>
    <Option value="minus">-</Option>
  </Select>
);
	return(
		<div className="mt-4 shadow-md">

			<button className="w-[80%] text-white font-bold lg:w-1/3 shadow-md rounded-lg my-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors" onClick={showModal}><PlusOutlined /> Yeni işlem ekle </button>

    <List
      header={<div>Son İşlemler</div>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Typography.Text className={`${item.status ? "!text-green-500" : "!text-red-500"} !font-bold`}>{item.status ? "+ " : "- "}{item.cost} ₺</Typography.Text> 
          <Typography.Text className="!text-black !font-regular mx-auto">{item.desc}</Typography.Text>
          <Typography.Text className="!text-gray-400 !font-thin float-right">12-06-2025</Typography.Text>
        </List.Item>
      )}
    />

    <Modal
        title="Yeni işlem ekle"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      	<Input placeholder="Açıklama" />
      	<p className="text-red-500 my-4">Sol taraftan kar/zarar durumunu seçmeyi unutma</p>
<InputNumber addonBefore={selectBefore} addonAfter={"₺"} defaultValue={100.45} placeHolder={"101.48 ₺"} />
      </Modal>
		 </div>
		)
}

export default LastTasks;