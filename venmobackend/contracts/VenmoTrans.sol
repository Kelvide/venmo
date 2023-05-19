// SPDX-License-Identifier: MIT

pragma experimental ABIEncoderV2;
pragma solidity >=0.5.8;

contract VenmoTrans {
    uint256 transactionCount;

    event Transfer(
        address from,
        address reciever,
        uint amount,
        string message,
        uint timestamp
    );

    struct TransactionStruct {
        address sender;
        address reciever;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransactionStruct[] transactions;

    function addToBlockchain(
        address payable reciever,
        uint amount,
        string memory message
    ) public {
        transactionCount += 1;
        transactions.push(
            TransactionStruct(
                msg.sender,
                reciever,
                amount,
                message,
                block.timestamp
            )
        );

        emit Transfer(msg.sender, reciever, amount, message, block.timestamp);
    }

    function getAllTransactions()
        public
        view
        returns (TransactionStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint) {
        return transactionCount;
    }
}
