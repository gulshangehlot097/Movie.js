const form=document.querySelector("form")
const movieName=document.querySelector("input")

form.onsubmit=(e)=>{
    e.preventDefault()
   fetch(" https://api.themoviedb.org/3/search/movie?api_key=0e1613f3a4888c6b5697ca32a96b17bd&language=en-US&query="+movieName.value+"&page=1&include_adult=false")
    .then((response)=>{return  response.json()})
    .then((result)=>{console.log(result);
        names(result.results)
    })
}
function names(data){
    if(data.length===0){
        const erorr= ("Not Found Plese Try Again")
        document.querySelector("#result").append(erorr)
    }
    else{
    
        const blank=document.querySelector("#result")
        blank.innerHTML=""


       data.forEach((movie)=>{
        const blank1=document.createElement("div");
       
        blank1.classList.add("blankdiv");
         
        const image= document.createElement("img");
      
        image.src=movie.poster_path ?"https://image.tmdb.org/t/p/original" + movie.poster_path:"no-poster-available.jpg";
    
        const head= document.createElement("h1")
       
        head.innerHTML=headName(movie.original_title);
    
         fetch("https://api.themoviedb.org/3/movie/"+movie.id+"/videos?api_key=07f61212877dc265f2a47e6e8d290605&language=en-US")
        .then((response) =>{
            return response.json();
        })
        .then((result)=>{
            console.log(result.results)
            if(result.results.length>0 && findTrailer(result.results)){
                const trailerKey= findTrailer(result.results)
                const anchor= document.createElement("a");
                anchor.href="https://youtube.com/embed" + trailerKey;
                anchor.target="_blank";
                anchor.innerHTML="Play Trailer";
                blank.append(anchor)
               
            }
        })




        blank1.append(image);
        blank1.append(head);
        blank.append(blank1);


       })
    }

   
}
function headName(head){
    if(head.length>35){
        return head.slice(0,35) +"..."
    }
    else{
        return head
    }
}
function findTrailer(data){
     const videoObject =data.find(
        (obj) => obj.site === "youTube" && obj.type === "Trailer"
        );
     if(videoObject === "undefined") return false;
     
     else return videoObject.key;
     
}
