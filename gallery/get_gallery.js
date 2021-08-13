let page = null
localStorage.getItem('page') ? page = localStorage.getItem('page') : page = 1
let url = `https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery?page=${page}`

function get_page() {
    localStorage.getItem('page') ? page = localStorage.getItem('page') : page = 1
    return page
}

function set_page(num) {
    
    localStorage.setItem('page', num)
    page = num
    url = `https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery?page=${page}`
    
}


async function get_gallery() {
    let token = localStorage.getItem('tokenData')
    token = JSON.parse(token)
    let result = fetch(url, {
        method: "GET",
        headers: {
            'Authorization': token.token
        }
    })
    let galleryObject = null
    
    await result.then(data => data.json().then(data => galleryObject = data))
    
    
    create_img_elements()
    
    function create_img_elements() {
        let divGallery = document.getElementById('gallery')
        
        while (divGallery.firstChild) {
            divGallery.removeChild(divGallery.firstChild);
        }
        
        
        for (let url of galleryObject.objects) {
            let img = document.createElement('img')
            img.src = url
            divGallery.appendChild(img)
            
        }
        
    }
    
}

function onClickNext() {
    let page1 = Number(get_page())
    if (page >= 5) {
        set_page(5)
    } else {
        set_page(page1 + 1)
        get_gallery()
    }
}

function onClickBack() {
    let page1 = Number(get_page())
    if (page == 1) {
        set_page(1)
    } else {
        set_page(page1 - 1)
        get_gallery()
    }
}

get_gallery()