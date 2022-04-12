import { requisitar } from "./requestAPI.js";

var main = document.querySelectorAll(".main .center")[0];
var back = document.querySelectorAll(".back")[0];
var next = document.querySelectorAll(".next")[0];
var pop__out = document.querySelector(".pop__out");
var cont=1;

export const preecher = (i,j,youtube) => {
  
    
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
          timesout();
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
                      <hr class="linha">
                  `;
               
        } else {
          // youtube=  getVideo(i.id, j);
          // youtube.then(value => console.log(value))
          timesout();
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
                      <hr class="linha">
  
                  `;
            
        }
      }
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



const aparecerPop = (nome, descricao, img, poster,you) => {
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
                    <a href="${you}">Trailer</a>
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
          card.getAttribute("data-poster"),
          card.getAttribute("data-you")
        );
        pop__out.style.display = "flex";
      });
    });
  }, 3000);

pop__out.addEventListener("click", (e) => 
{
  if (e.target.className == "pop__out") {
    pop__out.style.display = "none";
  }
});