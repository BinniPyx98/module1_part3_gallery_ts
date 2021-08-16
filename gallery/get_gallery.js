let serverPages=null //содержит кол-во страниц галлереи полученных с сервера

function get_page() {
   
    return localStorage.getItem('page') ? localStorage.getItem('page') : 1
}

function set_page(num) {
    
    localStorage.setItem('page', num)
}
function get_url(){
    return `https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery?page=${get_page()}`
}

async function get_gallery() {
    let token = JSON.parse(localStorage.getItem('tokenData'))
    let resolve = fetch(get_url(), {
        method: "GET",
        headers: {
            'Authorization': token.token
        }
    })
    let galleryObject = null
    
    await resolve.then(data => data.json().then(data => {
        galleryObject = data
        serverPages=galleryObject.total
    }))
    
    create_gallery(galleryObject)
}

function create_gallery(galleryObject) {
    clear_gallery()
    create_img(galleryObject)
}


function clear_gallery(){
    let divGallery = document.getElementById('gallery')
    
    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}
function create_img(galleryObject){
    let divGallery = document.getElementById('gallery')
    for (let url of galleryObject.objects) {
        let img = document.createElement('img')
        img.src = url
        divGallery.appendChild(img)
    }
}




function onClickNext() {
    let page = Number(get_page())
    if (page >= serverPages) {
        set_page(5)
        alert("It's last page")
    } else {
        set_page(page + 1)
        get_gallery()
    }
   // window.location.search+='page=2'
}
function onClickBack() {
    let page = Number(get_page())
    if (page == 1) {
        alert("It's first page")
        set_page(1)
    } else {
        set_page(page - 1)
        get_gallery()
    }
}

get_gallery()