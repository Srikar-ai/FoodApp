const maindiv=document.querySelector('.food-container');


document.getElementById('text-box').addEventListener("keyup",(event)=>{
    if (event.keyCode==13){
        event.preventDefault();
        document.getElementById('btn').click();
    }
})

// fetch the content from the search bar (Done)
document.getElementById('btn').addEventListener('click',(event)=>{

    event.preventDefault();
    let count=maindiv.childElementCount;
    if(count>0){
        RemovePrevDivs();
    }
    let t=document.getElementById("text-box").value;
    getquery(t);
    document.getElementById('text-box').value='';
});


ApiKey='4a5b12ec6f3d4159b4b160e8808f4601';// get the api key (Done)
getquery=(t)=>{
    url='https://api.spoonacular.com//recipes/complexSearch?query='+t+'&addRecipeInformation=true&apiKey='+ApiKey;
    fetch(url)// url is required for processing the data
    .then((response)=>response.json())
    .then((data)=>ManipulateData(data))
}

ManipulateData=(data)=>{
    const arr=data.results;
    arr.forEach(element => {
            const title=element.title;
            const summary=element.summary;
            const image=element.image;
            // document.getElementById('img1').src=image;
            // document.getElementById('heading').innerText=title;
            // document.getElementById('descrip').innerHTML=summary;

            // //created main card div
            const carddiv=document.createElement('div');
            // //add style for the card 
            carddiv.classList.add('card');
            // //create img div 



            const imagediv=document.createElement('div');
            // //create img div style
            imagediv.classList.add('image');
            // //create img tag 
            var x=document.createElement("img");
            x.setAttribute('src',image);
            x.setAttribute('alt','image');
            // //append the img tag to imagediv
            imagediv.appendChild(x);
            // //append the image dic to card div
            carddiv.appendChild(imagediv);
            // //create heading div for heading
            const heading=document.createElement('div');
            // //add style 
            heading.classList.add('text-heading');
            // //change the innerhtml to title
            heading.innerHTML=title;
            // //append the heading to carddiv
            carddiv.appendChild(heading);
            // // create a div for description 
            const desc=document.createElement('div');
            // // add style  class
            desc.classList.add('description');
            // // assign the summary to desc
            desc.innerHTML=summary;
            // //append the desc to carddiv
            carddiv.appendChild(desc);
            // // added each card to main container
            maindiv.appendChild(carddiv);
 });

}

RemovePrevDivs=()=>{
    while (maindiv.firstChild){maindiv.removeChild(maindiv.firstChild);}
}
