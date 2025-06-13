import { Avatar, Card, Flex } from 'antd';
import {DeleteOutlined} from "@ant-design/icons"
function Aidatlar() {
  const tarih = new Date();
  const year = tarih.getFullYear();
  const month = tarih.getMonth() + 1;
  const day = tarih.getDate();
  const formattedDate = `${day}/${month}/${year}`;
  return (
    <div>
      <button className="py-2 px-4 bg-red-200 text-black rounded font-bold text-red-600 cursor-pointer hover:bg-red-300 transition-colors mb-4"><DeleteOutlined /> Sıfırla</button>
      <Flex gap="middle" align="start" vertical>
        <Card style={{ width: "100%" }}>
          <Card.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
            title="Namık Şirin"
            description={
              <>
                <p>{formattedDate}</p>
                <p>Ödeme Durumu: <span className='text-red-500'>Ödenmedi</span></p>
              </>
            }
          />
          <button className='w-full cursor-pointer bg-gray-100 mt-4 py-4 rounded hover:bg-gray-200 text-xl'>Aidat ödediyse tıkla!</button>
        </Card>

      </Flex>
      <Flex gap="middle" align="start" vertical>
        <Card style={{ width: "100%" }}>
          <Card.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
            title="Enes Şirin"
            description={
              <>
                <p>{formattedDate}</p>
                <p>Ödeme Durumu: <span className='text-green-500'>Ödendi</span></p>
              </>
            }
          />
        </Card>

      </Flex>

    </div>
  )
}

export default Aidatlar