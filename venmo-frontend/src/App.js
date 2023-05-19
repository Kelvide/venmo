import Navbar from './components/Navbar';
import ActivityCard from './components/activity/ActivityCard';
import TransactionForm from './components/transaction/TransactionForm';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className="App">
     <div className={styles.wrapper}>
      <header>
        <Navbar/>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.activityContainer}>
          <ActivityCard/>
        </div>
        <div className={styles.sideContainer}>
          <TransactionForm/> 
        </div>
      </main>
     </div>
    </div>
  );
}

export default App;
