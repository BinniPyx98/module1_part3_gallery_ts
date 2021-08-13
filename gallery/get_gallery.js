async function get_gallery() {
    let token = localStorage.getItem('tokenData')
    token = JSON.parse(token)
    let result = fetch('https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery?page=3', {
        method: "GET",
        headers: {
            'Authorization': token.token
        }
    })
    let galleryObject = null
    
    await result.then(data => data.json().then(data => galleryObject = data))
    
    
    create_img_elements()
    
    function create_img_elements() {
        let divGallery=document.getElementById('gallery')
        for (let url of galleryObject.objects) {
            let img = document.createElement('img')
            img.src = url
            divGallery.appendChild(img)
            
            
        }
        
    }
    
}

get_gallery()