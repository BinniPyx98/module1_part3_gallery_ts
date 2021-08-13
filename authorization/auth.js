let successfullyAccess = false


 async function LogIn() {
    
    let authForm = document.getElementById('form')
    
    let userPassword = document.getElementById('pass')
    let userEmail = document.getElementById('email')
    let validation = validator(userEmail.value, userPassword.value)
    
      if (validation) {
        let userData = {
            email: userEmail.value,
            password: userPassword.value
        }
        
        let userJsonDate = JSON.stringify(userData)
      successfullyAccess= await authorization(userJsonDate)
        if (successfullyAccess) {
            authForm.classList.add('hidden')

            let script = document.createElement('script')
            script.src = "gallery/get_gallery.js"
            document.getElementsByTagName('head')[0].appendChild(script);

        } else {
            authForm.classList.add('visible')
        }
    } else {
        alert('некорректные данные')
    }
   
    setTimeout(removeToken, 3000)
    
}

  function authorization(userJsonDate) {
   
    let start =  fetch('https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userJsonDate
    })
   return   start.then(data => {
        if (data.status === 200) {
           return  data.json().then(data => {
                saveToken(data)
                doSome(true)
                return true
            })
        } else {
            alert(`Error, status:${data.status}`)
            doSome(false)
    return false
        }
        
    }) //add token in localStorage
      
   
}
function doSome(data){someResult=data}
function saveToken(token) {
    localStorage.setItem('tokenData', JSON.stringify(token));
}

function validator(email, password) {
    let regexp = /^........*$/i // /[\w|\d]+|\d+
    //let regexp = /^\w+@flo.team$/
    if (regexp.test(email) && regexp.test(password)) {
        return true
    } else {
        return false
    }
    
}

function removeToken() {
    let authForm = document.getElementById('form')
    let divGallery = document.getElementById('gallery')
    authForm.classList.add('visible')
    localStorage.removeItem('tokenData')
    
    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}

