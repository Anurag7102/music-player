console.log("welcome to spotify");

// initialise the variables
let musicIndex = 0;
let music = new Audio('songs/1.mp3');
let play = document.getElementById("play");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let current_music = document.getElementById('current_music');
let musicElement = Array.from(document.getElementsByClassName("musicElement"));
let music_list = [
    { music_name: 'Ek Main Aur Ek Tu', filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { music_name: 'Yeh Raaten Yeh Mausam', filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { music_name: 'Salaam-e-Ishq Meri Jaan', filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { music_name: 'Chura Liya Hai Tumne Jo Dil Ko', filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { music_name: 'Ek Ajnabee Haseena Se', filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { music_name: 'Jab Koi Baat Bigad Jaye', filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
    { music_name: 'Mere Samne Wali', filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
    { music_name: 'Pyar Hua Ikrar Hua Hai', filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
]

musicElement.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = music_list[i].coverpath;
    element.getElementsByClassName('music_name')[0].innerText = music_list[i].music_name;
})
// handle play/pause button
play.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        music.pause();
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// update seekbar
music.addEventListener('timeupdate', () => {
    progress = parseInt((music.currentTime / music.duration) * 100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    music.currentTime = myProgressBar.value * music.duration / 100;
})

const make_all_plays = () => {
    Array.from(document.getElementsByClassName('music_play_buttons')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('music_play_buttons')).forEach((element) => {
    element.addEventListener('click', (e) => {
        make_all_plays();
        if (music.paused || music.currentTime <= 0) {
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            musicIndex = parseInt(e.target.id);
            music.src = `songs/${musicIndex + 1}.mp3`;
            music.currentTime = 0;
            music.play();
            current_music.innerText = music_list[musicIndex].music_name;
            gif.style.opacity = 1;
            play.classList.remove('fa-play');
            play.classList.add('fa-pause');
        }
        else {
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            music.pause();
            gif.style.opacity = 0;
            play.classList.remove('fa-pause');
            play.classList.add('fa-play');
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    musicIndex += 1;
    if (musicIndex >= 8) {
        musicIndex = 0;
    }
    else {
        musicIndex = musicIndex;
    }
    music.src = `songs/${musicIndex + 1}.mp3`;
    current_music.innerText = music_list[musicIndex].music_name;
    music.currentTime = 0;
    music.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', () => {
    if (musicIndex <= 0) {
        musicIndex = 7;
    }
    else {
        musicIndex -= 1;
    }
    music.src = `songs/${musicIndex + 1}.mp3`;
    current_music.innerText = music_list[musicIndex].music_name;
    music.currentTime = 0;
    music.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
})