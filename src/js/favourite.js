

// Show the images in the page
const main = document.getElementById('gallery-container');

const imageData = localStorage.getItem('imageSrc');


console.log(imageData);

window.addEventListener("load", function() {
    // Call the function that you created in step 1.
    
   for(let i=0;i<imageData.length;i++){
    let div = document.createElement("div");
    div.className="gallery";

      let elem = document.createElement("img");
      //const img = new Image();
      elem.src = imageData;
      // elem.src=img;
     
      main.appendChild(div);
      main.appendChild(elem);

      }
   });
  

    

