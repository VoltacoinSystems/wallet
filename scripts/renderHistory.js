(async () => {
    const response =
        await axios.get('https://core.voltacoin.repl.co/transactions')
            .catch(() => false)

    if (!response) return

    const transactions =
        response
            ? response.data.data
            : []

    const selfAddress = localStorage.getItem('selfAddress')

    const rawUserTransactions =
        transactions.filter(transaction => 
            transaction.recipient_address === selfAddress 
                || transaction.sender_address === selfAddress
        )

    const userTransactions = 
        rawUserTransactions.map(transaction => {
            transaction.state =
                transaction.sender_address === selfAddress
                    ? 'Outcoming'
                    : 'Incoming'
            
            transaction.sender_address = 
                transaction.sender_address.replace(selfAddress, 'You')

            transaction.recipient_address = 
                transaction.recipient_address.replace(selfAddress, 'You')

            return transaction
        })

    for (const transaction of userTransactions) {
        const transactionHistoryElement =
            document.getElementsByClassName('transaction-history')[0]
        
        const transactionHistoryCardElement = 
            document.createElement('div')

        transactionHistoryCardElement.className = 'transaction-card'
        transactionHistoryCardElement.innerHTML = 
            `<div>
                <p class="transaction-state" type=${transaction.state}>
                    ${transaction.state}
                </p>

                <p> ${transaction.id} </p>

                ${transaction.state === 'Outcoming' ? '' : `<h3> Sender: ${transaction.sender_address} </h3>` }
                ${transaction.state === 'Incoming' ? '' : `<h3> Recipient: ${transaction.recipient_address} </h3>` }
            </div>

            <h1> ⚡️ ${transaction.amount} </h1>`

        transactionHistoryElement
            .appendChild(transactionHistoryCardElement)
    }
})()