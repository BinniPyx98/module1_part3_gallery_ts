let serverPages = null //содержит кол-во страниц галлереи полученных с сервера

function getPage() {

    return localStorage.getItem('page') ? localStorage.getItem('page') : 1;
}

function setPage(num) {
    localStorage.setItem('page', num);
}

function getUrl() {
    return `https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery?page=${getPage()}`;
}

async function getGallery() {
    let token = JSON.parse(localStorage.getItem('tokenData'));
    let resolve = fetch(getUrl(), {
        method: "GET",
        headers: {
            'Authorization': token.token
        }
    })

    let galleryObject = null;
    let response = await resolve;
    let data = await response.json();

    if (data) {
        galleryObject = data;
        serverPages = data.total;
    }

    createGallery(galleryObject);
}

interface gallery {
    objects: string[];
    total: number;
    page: number;
}

function createGallery(galleryObject: gallery) {
    clearGallery();
    createImg(galleryObject);
}

function clearGallery() {
    let divGallery = document.getElementById('gallery');

    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}

function createImg(galleryObject: gallery) {
    let divGallery = document.getElementById('gallery');
    for (let url of galleryObject.objects) {
        let img = document.createElement('img');
        img.src = url;
        divGallery.appendChild(img);
    }
}

function onClickNext() {
    let page = Number(getPage());
    if (page >= serverPages) {
        setPage(5);
        updateURL(page);
        alert("It's last page");
    } else {
        updateURL(page + 1);
        setPage(page + 1);
        getGallery();
    }


}

function onClickBack() {
    let page = Number(getPage());
    if (page === 1) {
        updateURL(page);
        setPage(1);
        alert("It's first page");


    } else {
        updateURL(page - 1);
        setPage(page - 1);
        getGallery();
    }
}

function updateURL(page) {
    window.history.pushState(window.location.href, null, `gallery?page=${page}`);
}

getGallery()