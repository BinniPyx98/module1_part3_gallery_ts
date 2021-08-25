//getGallery main function in file
export async function getGallery(): Promise<void> {
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
    }

    await createGallery(galleryObject);
}

function getPage(): string | number {
    return localStorage.getItem('page') ? localStorage.getItem('page') : 1;
}

function setPage(num: string): void {
    localStorage.setItem('page', num);
}


function getUrl(): string {
    return `https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery?page=${getPage()}`;
}


interface gallery {
    objects: string[];
    total: number;
    page: number;
}

function createGallery(galleryObject: gallery): void {
    clearGallery();
    createImg(galleryObject);
}

function clearGallery(): void {
    let divGallery: HTMLElement = document.getElementById('gallery');

    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}

function createImg(galleryObject: gallery): void {
    let divGallery: HTMLElement = document.getElementById('gallery');
    for (let url of galleryObject.objects) {
        let img: HTMLImageElement = document.createElement('img');
        img.src = url;
        divGallery.appendChild(img);
    }
}

let clickButtonNext = document.getElementById('next')
if (clickButtonNext) {
    clickButtonNext.addEventListener('click', ev => {
        ev.preventDefault()
        let page: number = Number(getPage());

        if (page >= 5) {
            setPage(String(5));
            updateURL(page);
            alert("It's last page");
        } else {
            updateURL(page + 1);
            setPage(String(page + 1));
            (() => getGallery())()
        }
    })

}

//Отслеживаем нажатие на кнопку back
let clickButtonBack = document.getElementById('back')
if (clickButtonBack) {
    clickButtonBack.addEventListener('click', ev => {
        ev.preventDefault()
        let page: number = Number(getPage());

        if (page === 1) {
            updateURL(page);
            setPage(String(1));
            alert("It's first page");
        } else {
            updateURL(page - 1);
            setPage(String(page - 1));
            (() => getGallery())()
        }
    })
}

function updateURL(page: number): void {
    window.history.pushState(window.location.href, null, `gallery?page=${page}`);
}


