import Header from './components/Header'
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className='appContainer'>
      <div className='appContent'>
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}

export default App