
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');


let url = 'https://api.lyrics.ovh';
const getLyrics = async (term) => {
  result.innerHTML=""
  more.innerHTML = '';

  const responsive = await fetch(`${url}/suggest/${term}`)
  const data = await responsive.json()
  
  data.total <= 0 ? alert("not found") : console.log(data);

  showData(data)


}


const showData = (songs) => {
  
  const  ulSong=document.createElement("ul")
 ulSong.classList.add("songs")

  songs.data.forEach(item => {
const liSong=document.createElement("li")
    liSong.innerHTML= 
   ` <div id="cover-lr" class="cover-lr"><img src="${item.album["cover_big"]}"></div><span style="max-width: 300px;"><strong>${item.artist.name}</strong> - ${item.title}</span>
    <div id="preview-container" class="preview-container">
    <div class="volume-icons-container">
      <span class="vol-icon fa fa-volume-low"></span>
      <input id="volume" class="volume" type="range" value="20" min="0" max="100">
    </div>
    <button id="play" class=" play action-btn action-btn-big">
      <i class="fas fa-play"></i>
    </button>
  </div>
  <audio id="audio" class="audio">
    <source data-id="${item.id}" src="${item.preview}">
  </audio> 
      <button class="btn" onclick="getGenusLyrics('${item.artist.name}','${item.title}'),load(event)" 
      >Get Lyrics</button>
      `
      ulSong.append(liSong)
  })
 
  result.append(ulSong)

resultTrim(result)

}

  const resultTrim=(result)=>{


const liResult= result.childNodes[0].children

for(let song of liResult){

  let valVloume = 0.20
  let inputVal = 20


  const playBtn=song.childNodes[4].querySelector(".play")
  const volumeInput=song.childNodes[4].childNodes[1].querySelector(".volume")
  const audioPreview= song.childNodes[6]
  const volIcons=song.childNodes[4].querySelector(".vol-icon")
 const volumeContainer=song.childNodes[4].querySelector(".volume-icons-container")
 

 volumeInput.value = inputVal
 audioPreview.volume = valVloume
// const aa=console.log(song.childNodes[4]);
  playBtn.onclick=()=>{
    const isPlaying= volumeContainer.classList.contains("active")
  console.log(isPlaying);
    if (isPlaying) {
      pauseSong()
    }else{
     stopplay()
     playSong()
    
    
    }
  }


  const playSong = () => {

    volumeContainer.classList.add("active")
    playBtn.classList.add("show")
    playBtn.querySelector("i.fas").classList.remove('fa-play')
    playBtn.querySelector("i.fas").classList.add('fa-pause')
    
    audioPreview.play()

  }
  
  const pauseSong = () => {

    volumeContainer.classList.remove("active")
    playBtn.classList.remove("show")
    playBtn.querySelector("i.fas").classList.add('fa-play')
    playBtn.querySelector("i.fas").classList.remove('fa-pause')
 
    audioPreview.pause()

  }



  
const stopplay=()=>{


  for(let palybutton of liResult){
    
    const au=palybutton.childNodes[6]
    const playIcons=palybutton.childNodes[4].childNodes[3].querySelector("i.fas")
    const volumeContainerRemove=palybutton.childNodes[4].querySelector(".volume-icons-container")
   const removeShow =palybutton.childNodes[4].querySelector(".play")

 if (volumeContainerRemove.classList.contains("active")) {
  au.pause()
  au.currentTime=0
  
 }
   
   
  
    volumeContainerRemove.classList.remove("active")
    removeShow.classList.remove("show")
    playIcons.classList.add('fa-play')
    playIcons.classList.remove('fa-pause')
    volumeContainer.classList.remove("active")
    playBtn.querySelector("i.fas").classList.add('fa-play')
    playBtn.querySelector("i.fas").classList.remove('fa-pause')
    
  }

}


audioPreview.onended=()=>pauseSong()

  const volPer = () => {
    valVloume = volumeInput.value / 100
    audioPreview.volume = valVloume
  }
  
  volumeInput.oninput = () => {
  
    volPer()
    coustomvolumeSlider(valVloume)
  
  }
  
  // note agar isPlaying=false  bod yani ahang play nemishe va puse hast
  // gar false bod va click kardim play beshe va isPlaying = true beshe va یا بالعکس

  const coustomvolumeSlider = (vl) => {
    if (vl <= 0) {
      volIcons.className = "vol-icon fa-solid fa-volume-xmark"
      volumeInput.volume = vl
  
    } else if (vl >= 0 && vl <= 0.4) {
      volIcons.className = "vol-icon fa-solid fa-volume-low"
    } else {
      volIcons.className = "vol-icon fa-solid fa-volume-high"
    }
  
  
  }
  
  
  const mute = () => {
    if (audioPreview.volume > 0) {
      audioPreview.volume = 0
      volIcons.classList.add("fa-volume-xmark")
    } else {
      coustomvolumeSlider(valVloume)
      volPer()
    }
  
  }
  
  
  volIcons.onclick = () => mute()
  

  }


  }

  const load=(e)=>{
    console.log(e.target);
    e.target.classList.add("load")
    setTimeout(()=>  e.target.classList.remove("load"),2700)
  }


  const getGenusLyrics= async(artist,songTitle)=>{
   
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ecbd386f8fmsh8b37598b42f4860p1afcabjsn61dcf748881e',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
      }
    };
    
  
    const res = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${artist}-${songTitle}&per_page=10&page=1`, options);
    const data = await res.json();
  
   console.log(data.hits[0]);
  
  
  // window.location.href=data.hits[0].result.url
 setTimeout(()=> window.open(`${href=data.hits[0].result.url}`),800)
 
 
  }

// const  getL =async(artist,songTitle) {
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': 'ecbd386f8fmsh8b37598b42f4860p1afcabjsn61dcf748881e',
//         'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
//       }
//     };
    
  
//     const res = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${artist}-${songTitle}&per_page=10&page=1`, options);
//     const data = await res.json();
  
//    console.log(data.hits[0].result.url);
  
  
//   window.location.href=data.hits[0].result.url
//     more.innerHTML = '';
//   }
  

const getMoreSongs= async(songPage)=>{


  const responsive = await fetch(`${songPage}`)
  const data = await responsive.json()
  
  data.total <= 0 ? alert("not found") : console.log(data);
  showData(data)
}


form.onsubmit = (e) => {
  
  e.preventDefault()
  const searchTerm = search.value.trim()
  if (!searchTerm) {
    alert("input must not be empty")
  } else {
   
    getLyrics(searchTerm)
  }
}






























// const form = document.getElementById('form');
// const search = document.getElementById('search');
// const result = document.getElementById('result');
// const more = document.getElementById('more');









// let output = ''

// const getLyrics = async (term) => {
//   result.innerHTML=""
// const url = 'https://api.lyrics.ovh';
//   const responsive = await fetch(`${url}/suggest/${term}`)
//   const data = await responsive.json()
  
//   data.total <= 0 ? alert("not found") : console.log(data);

//   showData(data)


// }


// const showData = (songs) => {
  
//   const  ulSong=document.createElement("ul")
//  ulSong.classList.add("songs")

//   songs.data.forEach(item => {
// const liSong=document.createElement("li")
//     liSong.innerHTML= 
//    ` <div id="cover-lr" class="cover-lr"><img src="${item.album["cover_big"]}"></div><span><strong>${item.artist.name}</strong> - ${item.title}</span>
//     <div id="preview-container">
//     <div class="volume-icons-container">
//       <span class="vol-icon fa fa-volume-low"></span>
//       <input id="volume" class="volume" type="range" value="20" min="0" max="100">
//     </div>
//     <button id="play" class=" play action-btn action-btn-big">
//       <i class="fas fa-play"></i>
//     </button>
//   </div>
//   <audio id="audio" class="audio">
//     <source data-id="${item.id}" src="${item.preview}">
//   </audio> 
//       <button class="btn" data-artist="${item.artist.name}" data-songtitle="${item.title}">Get Lyrics</button>
//       `
//       ulSong.append(liSong)
//   })

//   result.append(ulSong)
  
//   const a=result.childNodes[0].children
// for(let song of a){
//   let isPlaying = false
//   let valVloume = 0.20
//   let inputVal = 20


//   const playBtn=song.childNodes[4].querySelector(".play")
//   const volumeInput=song.childNodes[4].childNodes[1].querySelector(".volume")
//   const audioPreview= song.childNodes[6]
//   const volIcons=song.childNodes[4].querySelector(".vol-icon")
//  const volumeContainer=song.childNodes[4].querySelector(".volume-icons-container")
//  volumeInput.value = inputVal
//  audioPreview.volume = valVloume

//   playBtn.onclick=()=>{
//     if (!isPlaying) {
//       stopplay()
//       playSong()
      
     
//     } else {
//       pauseSong()
     
//     }
//   }


//   const playSong = () => {
//     isPlaying = true
//     volumeContainer.classList.add("active")
//     playBtn.querySelector("i.fas").classList.remove('fa-play')
//     playBtn.querySelector("i.fas").classList.add('fa-pause')
    
//     audioPreview.play()
//   }
  
//   const pauseSong = () => {
//     isPlaying = false
//     volumeContainer.classList.remove("active")
//     playBtn.querySelector("i.fas").classList.add('fa-play')
//     playBtn.querySelector("i.fas").classList.remove('fa-pause')
   
//     audioPreview.pause()
//   }
// const stopplay=()=>{
//   for(let palybutton of a){
//     const au=palybutton.childNodes[6]
//     const playIcons=palybutton.childNodes[4].childNodes[3].querySelector("i.fas")
//     const volumeContainerRemove=palybutton.childNodes[4].querySelector(".volume-icons-container")
//     au.pause()
//     au.currentTime=0
//     volumeContainerRemove.classList.remove("active")
//     playIcons.classList.add('fa-play')
//     playIcons.classList.remove('fa-pause')
  
//   }
//   volumeContainer.classList.remove("active")
//   playBtn.querySelector("i.fas").classList.add('fa-play')
//   playBtn.querySelector("i.fas").classList.remove('fa-pause')
// }
//   const volPer = () => {
//     valVloume = volumeInput.value / 100
//     audioPreview.volume = valVloume
//   }
  
//   volumeInput.oninput = () => {
  
//     volPer()
//     coustomvolumeSlider(valVloume)
  
//   }
  
//   // note agar isPlaying=false  bod yani ahang play nemishe va puse hast
//   // gar false bod va click kardim play beshe va isPlaying = true beshe va یا بالعکس
  
  
//   const coustomvolumeSlider = (vl) => {
//     if (vl <= 0) {
//       volIcons.className = "vol-icon fa-solid fa-volume-xmark"
//       volumeInput.volume = vl
  
//     } else if (vl >= 0 && vl <= 0.4) {
//       volIcons.className = "vol-icon fa-solid fa-volume-low"
//     } else {
//       volIcons.className = "vol-icon fa-solid fa-volume-high"
//     }
  
  
//   }
  
  
//   const mute = () => {
//     if (audioPreview.volume > 0) {
//       audioPreview.volume = 0
//       volIcons.classList.add("fa-volume-xmark")
//     } else {
//       coustomvolumeSlider(valVloume)
//       volPer()
//     }
  
//   }
  
  
//   volIcons.onclick = () => mute()
  
  
  
//   }
  
  

// }

//   // let volumeInput = result.childNodes[0].children.querySelectorAll(".volume")
//   // let playBtn = result.childNodes[0].children.querySelectorAll(".play")
//   // let audioPreview = result.childNodes[0].children.querySelectorAll(".audio")
//   // let volIcons = result.childNodes[0].children.querySelectorAll(".vol-icon")
//   // let volumeContainer = result.childNodes[0].children.querySelectorAll(".volume-icons-container")

//   // result.childNodes[0].childNodes.querySelector("li").forEach(item=>{
//   //   console.log(item);
//   // })
 






// form.onsubmit = (e) => {
  
//   e.preventDefault()
//   const searchTerm = search.value.trim()
//   if (!searchTerm) {
//     alert("add")
//   } else {
   
//     getLyrics(searchTerm)
//   }
// }



