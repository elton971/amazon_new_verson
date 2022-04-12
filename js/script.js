var apiKey = "bf02fd65c2c07a76c53443c464e8703d";

//  <a href="https://seriesflix4k.com/filmes/assistir-${name}/"></a>

var main = document.querySelectorAll(".main .center")[0];
var back = document.querySelectorAll(".back")[0];
var next = document.querySelectorAll(".next")[0];
let cont = 1;

const requisitar = (page) => {
  URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      preecher(data);
    })
    .catch((error) => console.error(error));
};
let youtube="";
preecher = (data) => {
  
  data.results.map((i, j) => {
    if (j > 15) return;
    if (j == 0) {
      main.innerHTML += `

            <div class="banner__principal" style="background-image:url(https://image.tmdb.org/t/p/original/${i.backdrop_path})">
            </div>
            `;
    } else {
      if (j == 1) {
        // youtube=  getVideo(i.id, j);
        // youtube.then(value => console.log(value))
        
        main.innerHTML += `
                    
                    <h2><span>Assista o melhor filme</span></h2>
                    <div class="card__movie">
                    <img class="clica" data-you="https://www.youtube.com/watch?v=${youtube}" data-name="${i.title}" data-descri="${i.overview}" data-img="https://image.tmdb.org/t/p/w500${i.backdrop_path}" data-poster="https://image.tmdb.org/t/p/w500${i.poster_path}" src="https://image.tmdb.org/t/p/w500${i.backdrop_path}"/>
                        <div class="card__movie__info">
                            <h3>${i.title}</h3>
                            <p>${i.release_date}<p>
                       </div>
                       <div class="star__icon">
                       <i class="fa-solid fa-star" id="star"></i><span id="star">${i.vote_average}</span> 
                       </div
                       
                    <div>
                `;
             
      } else {
        // youtube=  getVideo(i.id, j);
        // youtube.then(value => console.log(value))
        
        main.innerHTML += `
                    <div class="card__movie">
                        <img class="clica"  data-you="https://www.youtube.com/watch?v=${youtube}"  data-name="${i.title}" data-descri="${i.overview}" data-img="https://image.tmdb.org/t/p/w500${i.backdrop_path}" data-poster="https://image.tmdb.org/t/p/w500${i.poster_path}"  src="https://image.tmdb.org/t/p/w500${i.backdrop_path}"/>
                        <div class="card__movie__info">
                            <h3>${i.title}</h3>
                            <p>${i.release_date}<p>
                       </div>
                       <div class="star__icon">
                            <i class="fa-solid fa-star" id="star"></i><span id="star">${i.vote_average}</span>
                       </div
                    <div>

                `;
          
      }
    }
  });
};

next.addEventListener("click", () => {
  timesout();
  main.innerHTML = "";
  requisitar(cont + 1);
  cont++;
});
back.addEventListener("click", () => {
  timesout();
  if (cont <= 1) {
    alert("Ja nao ha paginas");
  } else {
    main.innerHTML = "";
    requisitar(cont - 1);
    cont--;
  }
});

pop__out = document.querySelector(".pop__out");

aparecerPop = (nome, descricao, img, poster) => {
  pop__out.innerHTML = `
    <div   style=" background-image:url(${poster});"class="pop__out__content">
        <div class="pop__out__content_info">
            <div class="info__movie">
                <img src="${img}" alt="" srcset="">
            </div>

            <div  class="info__movie_sipose">
                <h1>Nome:${nome}</h1>
                <h1>Sinopse<h1>
                <p id="sinopse">${descricao}</p>
                <div class="button__info">
                    <a href="https://seriesflix4k.com/filmes/assistir-${nome}/">Assistir</a>
                    <a href="https://seriesflix4k.com/filmes/assistir-${nome}/">Trailer</a>
                </div>
            </div>

        </div>
        
    </div>
    `;
};

const timesout = () =>
  setTimeout(() => {
    var clicar = document.querySelectorAll(".clica");
    clicar.forEach((card) => {
     
      card.addEventListener("click", (Event) => {
        console.log("oi");
        aparecerPop(
          card.getAttribute("data-name"),
          card.getAttribute("data-descri"),
          card.getAttribute("data-img"),
          card.getAttribute("data-poster")
        );
        pop__out.style.display = "flex";
      });
    });
  }, 1000);

pop__out.addEventListener("click", (e) => {
  if (e.target.className == "pop__out") {
    pop__out.style.display = "none";
  }
});

// const videoRequisar = (dadosFilme, ind) => {
//   URL = `https://api.themoviedb.org/3/movie/${dadosFilme}/videos?api_key=${apiKey}`;
//  return  fetch(URL)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.results[ind]) {
        
//         data.results[ind].key;
//       }
//     })
//     .catch((error) => console.error(error));
//   };

function videoRequisar(dadosFilme) {
  return fetch(`https://api.themoviedb.org/3/movie/${dadosFilme}/videos?api_key=${apiKey}`);
  
} 

 const getVideo= async(dadosFilme,ind)=>
{
  try{
    const videosRespose = await videoRequisar(dadosFilme);
    const videos = await videosRespose.json();
    
    if(videos.results[0])
    {
      return videos.results[0].key;
    }
    else{
      return "";
    }
  }catch(err){console.log(err)};
}
requisitar(cont);
timesout();
