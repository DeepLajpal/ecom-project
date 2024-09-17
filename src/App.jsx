import Header from './components/Header'
import { Outlet } from "react-router-dom";
import styles from "./styles/App.module.scss";

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.appContent}>
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App