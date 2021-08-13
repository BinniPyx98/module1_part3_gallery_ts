function LogIn() {
    
    let userPassword = document.getElementById('pass')
    let userEmail = document.getElementById('email')
    let validation = validator(userEmail.value, userPassword.value)
    
    if (validation) {
        let userData = {
            email: userEmail.value,
            password: userPassword.value
        }
        let userJsonDate = JSON.stringify(userData)
        
        authorization(userJsonDate)
    } else {
        alert('некорректные данные')
    }
    
    setTimeout(removeToken, 600000)
}

function authorization(userJsonDate) {
    let result
    
    result = fetch('https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userJsonDate
    })
    result.then(data => {
        if (data.status === 200) {
            data.json().then(data => {
                saveToken(data)
            })
        } else {
            alert(`Error, status:${data.status}`)
        }
        
    }) //add token in localStorage
    
    
}

function saveToken(token) {
    localStorage.setItem('tokenData', JSON.stringify(token));
}

function validator(email, password) {
    let regexp = /^........*$/i
    
    if (regexp.test(email) && regexp.test(password)) {
        return true
    } else {
        return false
    }
    
}

function removeToken() {
    localStorage.removeItem('tokenData')
    
}