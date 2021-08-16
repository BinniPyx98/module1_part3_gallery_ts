async function LogIn() {
    let result = await control_validation_authorization()
    
    if (result) {
        hidden_auth_form()
        get_gallery()
        setTimeout(reset_gallery, 100000)
    
    }
    
}

function authorization(userEmail, userPassword) {
    let userJsonDate = JSON.stringify({
        email: userEmail,
        password: userPassword
    })
    let response = fetch('https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userJsonDate
    })
    
    return response.then(data => {
        if (data.status === 200) {
            return data.json().then(data => {
                save_token(data)
                return true
            })
        } else {
            alert(`Error, status:${data.status}`)
            return false
        }
        
    }) //add token in localStorage
}

function save_token(token) {
    localStorage.setItem('tokenData', JSON.stringify(token));
}

async function control_validation_authorization() {
    let validationResult = null
    let authorizationResult = null
    let userPassword = document.getElementById('pass').value
    let userEmail = document.getElementById('email').value
    let regexp = /^.+@.+\..+$/igm
    let regexpPass=/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/
    if (regexp.test(userEmail) && regexpPass.test(userPassword)) {
        validationResult = true
        authorizationResult = await authorization(userEmail, userPassword)
    } else {
        alert('некорректные данные')
    }
    
    return validationResult && authorizationResult
}

function removeToken() {
    localStorage.removeItem('tokenData')
}

function remove_gallery() {
    let divGallery = document.getElementById('gallery')
    
    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}

function hidden_auth_form() {
    let authForm = document.getElementById('form')
    authForm.classList.toggle('hidden')
}

function get_gallery() {
    let script = document.createElement('script')
    
    script.src = "gallery/get_gallery.js"
    document.getElementsByTagName('head')[0].appendChild(script);
}

function reset_gallery() {
    removeToken()
    remove_gallery()
    hidden_auth_form()
}

