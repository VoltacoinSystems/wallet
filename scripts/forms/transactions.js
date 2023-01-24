const paymentForm =
    document.getElementsByClassName('voltacoin-transaction-payment-form')[0]

paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const amount = parseInt(event.target.elements.amount.value)
    const to_address = event.target.elements.to_address.value

    console.log(amount, to_address)

    const data = { amount, to_address }

    const response = await axios.post(
        'https://core.voltacoin.repl.co/transactions/pay', data, 
        { 
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
    )
        .catch(() => false)

    if (!response) {
        const formPaymentWarningError =
            document.getElementById('transaction-payment-form-error-message')

        formPaymentWarningError.style.display = 'flex'

        setTimeout(() => {
            formPaymentWarningError.style.display = 'none'
        }, 7000)

        return
    }

    const formPaymentOkMessage =
        document.getElementById('transaction-payment-form-success-message')

    formPaymentOkMessage.style.display = 'flex'

    setTimeout(() => {
        formPaymentOkMessage.style.display = 'none'
    }, 7000)
}, false)