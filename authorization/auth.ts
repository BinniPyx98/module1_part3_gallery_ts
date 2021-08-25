// LogIn является точкой входа
async function LogIn():Promise<void> {

    let result = await control_validation_authorization();

    if (result) {
        hidden_auth_form();
        await get_gallery();
        setTimeout(reset_gallery, 60000);
    }
}

async function authorization(userEmail: string, userPassword: string):Promise<boolean> {
    let userJsonDate = JSON.stringify({
        email: userEmail,
        password: userPassword
    })
    let resolve = fetch('https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userJsonDate
    })
    let response = await resolve;
    if (response.status === 200) {
        let result = await response.json();
        save_token(result);
        return true
    } else {
        let result = await response.json();
        server_error(result)
        return false
    }

}

function save_token(token: string): void {
    localStorage.setItem('tokenData', JSON.stringify(token));
}

function server_error(error: any): void {
    alert(error.errorMessage);
}

function getElement(tagId: string): string | void {
    let Element = <HTMLInputElement>document.getElementById(tagId);
    return Element ? Element.value : alert("don't find tag");
}

async function control_validation_authorization():Promise<boolean> {
    let validationResult = null;
    let authorizationResult = null;
    let regexp = /^.+@.+\..+$/igm;
    let regexpPass = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    let userPassword = getElement('pass');
    let userEmail = getElement('email');

    if (userPassword && userEmail) {
        if (regexp.test(userEmail) && regexpPass.test(userPassword)) {
            validationResult = true;
            authorizationResult = await authorization(userEmail, userPassword);
        } else {
            alert('некорректные данные')
        }
    }
    return validationResult && authorizationResult
}

function removeToken(): void {
    localStorage.removeItem('tokenData');
}

function remove_gallery(): void {
    let divGallery = document.getElementById('gallery');

    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}

function hidden_auth_form(): void {
    let authForm = document.getElementById('form');
    authForm.classList.toggle('hidden');
}

function get_gallery(): void {
    let script = document.createElement('script');
    script.src = "gallery/get_gallery.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}

function reset_gallery(): void {
    removeToken();
    remove_gallery();
    hidden_auth_form();
}
