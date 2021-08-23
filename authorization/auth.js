var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function LogIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield control_validation_authorization();
        if (result) {
            hidden_auth_form();
            get_gallery();
            setTimeout(reset_gallery, 60000);
        }
    });
}
function authorization(userEmail, userPassword) {
    let userJsonDate = JSON.stringify({
        email: userEmail,
        password: userPassword
    });
    let response = fetch('https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userJsonDate
    });
    return response.then(data => {
        if (data.status === 200) {
            return data.json().then(data => {
                save_token(data);
                return true;
            });
        }
        else {
            data.json().then(data => {
                server_error(data);
            });
            return false;
        }
    }); //add token in localStorage
}
function save_token(token) {
    localStorage.setItem('tokenData', JSON.stringify(token));
}
function server_error(error) {
    alert(error.errorMessage);
}
function getElement(tagId) {
    let Element = document.getElementById(tagId);
    return Element ? Element.value : alert("don't find tag");
}
function control_validation_authorization() {
    return __awaiter(this, void 0, void 0, function* () {
        let validationResult = null;
        let authorizationResult = null;
        let regexp = /^.+@.+\..+$/igm;
        let regexpPass = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
        let userPassword = getElement('pass');
        let userEmail = getElement('email');
        if (userPassword && userEmail) {
            if (regexp.test(userEmail) && regexpPass.test(userPassword)) {
                validationResult = true;
                authorizationResult = yield authorization(userEmail, userPassword);
            }
            else {
                alert('некорректные данные');
            }
        }
        return validationResult && authorizationResult;
    });
}
function removeToken() {
    localStorage.removeItem('tokenData');
}
function remove_gallery() {
    let divGallery = document.getElementById('gallery');
    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}
function hidden_auth_form() {
    let authForm = document.getElementById('form');
    authForm.classList.toggle('hidden');
}
function get_gallery() {
    let script = document.createElement('script');
    script.src = "gallery/get_gallery.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}
function reset_gallery() {
    removeToken();
    remove_gallery();
    hidden_auth_form();
}
//# sourceMappingURL=auth.js.map