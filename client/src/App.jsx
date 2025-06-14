import { useEffect, useState } from "react";
import HomeCards from "./HomeCards"
import LastTasks from "./lasttasks"
import Loading from './Loading.jsx'
import axios from 'axios'
function App() {

  const [ready, setReady] = useState(false);
  const getReady = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ok`);
      console.log(response.data);
      setReady(true);
    } catch (error) {
      console.error('Error checking server readiness:', error);
    }
  }
  useEffect(() => {
    getReady();
  }, [])

  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const currentYear = new Date().getFullYear();
  return (
    <>
      {
        ready === false ? <Loading /> : (
          <div>
            <div className="w-full border-b-2 border-gray-200 p-4">
              <h1 className="text-center font-bold text-xl">Sirinler Sitesi Aidat Yönetimi</h1>
            </div>
            <div className="card-list w-full px-8">
              <div className="border-b-2 border-gray-400 w-full flex flex-row justify-between my-8">
                <p className="text-md lg:text-2xl text-gray-600 font-bold">Namık Şirin</p>
                <h1 className='text-md lg:text-2xl font-bold text-gray-600'>{currentDay} {months[currentMonth]} {currentYear}</h1>
              </div>

              <HomeCards />

              <LastTasks /></div>

          </div>
        )
      }



    </>
  )
}

export default App
