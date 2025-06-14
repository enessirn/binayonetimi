import HomeCards from "./HomeCards"
import LastTasks from "./lasttasks"

function App() {
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran","Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="w-full border-b-2 border-gray-200 bg-white p-4">
        <h1 className="text-center font-bold text-xl">Sirinler Sitesi Aidat Yönetimi</h1>
      </div>
      <div className="card-list w-full px-8">
        <div className="border-b-2 border-gray-400 w-full flex flex-row justify-between my-8">
           <p className="text-xl lg:text-2xl text-gray-600 font-bold">Namık Şirin, hoş geldin!</p>
           <h1 className='text-xl lg:text-2xl font-bold text-gray-600'>{currentDay} {months[currentMonth]} {currentYear}</h1>
        </div>
       
        <HomeCards />

        <LastTasks />
      </div>

    </>
  )
}

export default App
