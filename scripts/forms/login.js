const form =
    document.getElementsByClassName('voltacoin-login-form')[0]

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const address = event.target.elements.address.value
    const password = event.target.elements.password.value

    const response = await axios.post(
        'https://core.voltacoin.repl.co/wallets/auth',
        { address, password }
    )
        .catch(() => false)

    if (!response) {
        const formWarningError =
            document.getElementById('login-form-error-message')

        formWarningError.style.display = 'flex'

        setTimeout(() => {
            formWarningError.style.display = 'none'
        }, 7000)

        return
    }

    const wallet = response.data.data
    localStorage.setItem('token', wallet.token)
    localStorage.setItem('selfAddress', wallet.address)

    const formLoggedInMessage =
        document.getElementById('login-form-success-message')

    formLoggedInMessage.style.display = 'flex'

    setTimeout(() => {
        formLoggedInMessage.style.display = 'none'
    }, 7000)
}, false)