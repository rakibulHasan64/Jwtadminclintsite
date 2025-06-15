import { Outlet } from "react-router-dom"
import Naver from "./componet/home/Naver"
import Footer from "./componet/home/Footer"


function App() {

  return (
    <>
      <Naver />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
