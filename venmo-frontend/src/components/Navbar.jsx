import { ChevronDownIcon } from '@heroicons/react/outline'
import { useContext } from 'react'
import styles from '../styles/Navbar.module.css'
import { shortenAddress } from '../utils/shortenAddress'
import { TransactionContext } from './context/contexts'

const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext)
  return <nav className={styles.navigationContainer}>
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src='../assets/venmo-logo.svg' alt='Venmo Logo' className={styles.logoImage} />
      </div>
      {currentAccount ? (
        <div className={styles.actionsContainer}>
          <p>
            Hello, <span className={styles.accentColor}>{shortenAddress(currentAccount)}!</span>
          </p>
          <ChevronDownIcon className={styles.arrowDownIcon} />
          <div className={styles.avatarContainer}>
            <img src="http://yeeqiang.me/avatar.jpeg" className={styles.avatarImage} alt="" />
          </div>
        </div>
      ) : (
        <button className={styles.connectBtn} onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  </nav>
}

export default Navbar
