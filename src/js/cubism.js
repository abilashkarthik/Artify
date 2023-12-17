import {createApi} from 'unsplash-js';

const unsplash = createApi({
  accessKey :'Ztmul06dsRBKHluo-Y2fK6oahYcCHqUQY-3XLIMRzsM',
});

const main = document.getElementById('gallery-container');

// Create an array to store the image data
const imageData = [];

const YOUR_ACCESS_KEY ='Ztmul06dsRBKHluo-Y2fK6oahYcCHqUQY-3XLIMRzsM';

async function searchUnsplash(searchQuery) {
  const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${YOUR_ACCESS_KEY}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
      throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
}



function openPopup(){
  console.log("called");
  document.getElementById('modal-popup').style.display='block';
}



async function fetchResults(searchQuery) {
  try {
      const results = await searchUnsplash(searchQuery);
      console.log(results.results);
      const photos = results.results
      
      photos.map((result) => {

        let iconid=1;

        let div = document.createElement("div");
        div.className="gallery";

      let elem = document.createElement("img");
      elem.src= result.urls.small;

      const icon = document.createElement("i");
      icon.className = "fa fa-heart-o";
      icon.setAttribute("id", "likeButton"+iconid);
      div.appendChild(elem);
      div.appendChild(icon);

      elem.addEventListener('click', function() {
        document.getElementById('modal-popup').style.display='block';
        let elem = document.createElement("img");
        elem.src= result.urls.small;

        const icon = document.createElement("i");
        icon.className = "fa fa-heart-o";
        icon.setAttribute("id", "likeButton"+iconid);
        document.getElementById('modal-popup-content').appendChild(elem);
        document.getElementById('modal-popup-content').appendChild(icon);
      })

      main.appendChild(div);

      });

      const elements = document.getElementsByClassName("fa fa-heart-o");
      console.log(elements);

      for (const element of elements) {
        element.addEventListener('click', () => {
            element.style.color='red';
            const parentElement = element.parentNode;
            const otherElement = parentElement.getElementsByTagName('img');
            otherElement[0].classList.add("selected");
            addtoFavourites();
        });
      }

      // Get the selected images
   
    
    
  } catch(err) {
      console.log(err);
      alert('Failed to search Unsplash');
  }
} 




function addtoFavourites(){
  const selectedImages = document.querySelectorAll('.selected');
  console.log(selectedImages);
// Loop through the selected images and store the image data
selectedImages.forEach(image => {
  const blob = new Blob([image]);
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    imageData.push(dataUrl);
    console.log(imageData);
  };
  reader.readAsDataURL(blob);
});

// Store the image data in localstorage
localStorage.setItem('imageData', JSON.stringify(imageData));
}





// Add an event listener to the window object for the `load` event.
window.addEventListener("load", function() {
  // Call the function that you created in step 1.
  fetchResults('Cubism Art');
});

let modal = document.getElementById('modal-popup');

window.onclick= function(event){
  if (event.target ==modal){
    modal.style.display='none';
    const div=document.getElementById('modal-popup-content');
    const imgs = div.querySelectorAll('img');

   imgs.forEach(img => img.remove());
  }
}

const closeButton = document.getElementById('closebutton');

closeButton.addEventListener('click',() =>{
  document.getElementById('modal-popup').style.display='none';
  const div=document.getElementById('modal-popup-content');
    const imgs = div.querySelectorAll('img');

   imgs.forEach(img => img.remove());
});



    





