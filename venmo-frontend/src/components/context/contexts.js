import { ethers } from 'ethers'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { createContext, useEffect, useState } from 'react'
import { contractAbi, contractAddress } from '../../utils/constants'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export const TransactionContext = createContext()

const {ethereum} = window
const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionsContract = new ethers.Contract(contractAddress, contractAbi, signer)
    return transactionsContract;
}

export const TransactionProvder = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [addressTo, setAddressTo] = useState('')
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))

    useEffect(() => {
      checkIfWalletIsConnected()
      checkIfTransactionsExist()
    }, [transactionCount ])
    

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert("Please install Metamask")
            }
            const accounts = await ethereum.request({method:"eth_requestAccounts"})
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                getAllTransactions()
            } else {
                console.log("No accounts found")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const connectWallet = async () =>{
        try {
           if (!ethereum) {
            return alert('Please install Metamask')
           } 
           const accounts = await ethereum.request({ method:'eth_requestAccounts' })
           setCurrentAccount(accounts[0])
           window.location.reload()
        } catch (err) {
            console.log(err)
            throw new err('No ethereum object ')
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            if(ethereum) {
                const transactionContract = createEthereumContract();
                const currentTransactionCount = await transactionContract.getTransactionCount();
                localStorage.setItem('transactionCount', currentTransactionCount)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const sendTransaction = async () => {
        try {
            if(ethereum) {
                const transactionContract = createEthereumContract()
                const parsedAmount = ethers.utils.parseEther(amount)
                
                await ethereum.request({
                    method:'eth_sendTransaction',
                    params:[
                        {
                            from: currentAccount,
                            to: addressTo,
                            gas: '0x5208',
                            value: parsedAmount._hex,
                        },
                    ],
                })
                const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount,message)
                setIsLoading(true)
                console.log(`Loading - ${transactionHash.hash}`)
                await transactionHash.wait()
                console.log(`Success - ${transactionHash.hash}`)
                setIsLoading(false)

                const transactionCount = await transactionContract.getTransactionCount()
                setTransactionCount(transactionCount.toNumber())
                window.location.reload()
            } else {
                console.log('no etherum object')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionContract = createEthereumContract()
                const availableTransactions = await transactionContract.getAllTransactions()
                const structuredTransactions = availableTransactions.map((transaction)=>({
                    addressTo:transaction.reciever,
                    addressFrom:transaction.sender,
                    timestamp: timeAgo.format(new Date(transaction.timestamp.toNumber()*1000), 'mini'),
                    message: transaction.message,
                    amount:parseInt(transaction.amount._hex)/10**18,
                }))
                setTransactions(structuredTransactions)
            } else {
                console.log('no ethereum object')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, sendTransaction, sendTransaction, setAddressTo, addressTo, setAmount, amount, message, setMessage, transactions}}>
            {children}
        </TransactionContext.Provider>
    )
}