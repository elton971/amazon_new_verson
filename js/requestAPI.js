// vou tratarde todos pedidos de API
import{ preecher }from './index.js';

import{slide}from './index.js';

var apiKey = "bf02fd65c2c07a76c53443c464e8703d";

var arrayIMG = [];

export const requisitar = (page) => {
  URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      getVideo(data);
    })
    .catch((error) => console.error(error));
};

function videoRequisar(idFilme) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${idFilme}/videos?api_key=${apiKey}`
  );
}

let youtube = "";
const getVideo = async (dadosFilme) => {
  for (let i = 0; i < dadosFilme.results.length; i++) {
      const video = await videoRequisar(dadosFilme.results[i].id);
      const videoData = await video.json();
      
        if(videoData.results[0] !== undefined){
          arrayIMG.push(dadosFilme.results[i].backdrop_path);
          youtube=videoData.results[0].key;
          // console.log(youtube);
          preecher(dadosFilme.results[i], i,youtube);
        }
        else{
          arrayIMG.push(dadosFilme.results[i].backdrop_path);
          preecher(dadosFilme.results[i], i,youtube);
        }
  }
   slide(arrayIMG);
};
