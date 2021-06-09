//Import Pizzicato
import Pizzicato from 'pizzicato';

//Import scss file
import './scss/custom.scss';
import "./scss/card.scss";

//Get slider dom elements
const frequencySlider = document.querySelector('#frequencyRange');
const tremoloSlider = document.querySelector('#tremoloRange');
const mixerSlider = document.querySelector('#mixerRange');

//control variables
const masterVolume = 0.5;   //change master output volume here


//import sound objects
const saw = new Pizzicato.Sound({ 
    source: 'wave',
    options: {
        type: 'sawtooth',
        frequency: 440,
        volume: mixerSlider.value / 100
    }
});

const square = new Pizzicato.Sound({ 
    source: 'wave',
    options: {
        type: 'square',
        frequency: 440,
        volume: 1 - (mixerSlider.value / 100)
    }
});

//create sound group
const group = new Pizzicato.Group([saw, square]);
group.volume = 0;

//create filter
const lowPassFilter = new Pizzicato.Effects.LowPassFilter({
    frequency: 5000,
    peak: 3
});
group.addEffect(lowPassFilter);

//create tremolo
const tremolo = new Pizzicato.Effects.Tremolo({
    speed: 7,
    depth: tremoloSlider.value / 100,
    mix: 0.8
});
group.addEffect(tremolo);

//Flip Card
const cardElement = document.querySelector('.card');
const cardFront = document.querySelector('.card-front');

cardFront.addEventListener('click', () => {
    if (!cardElement.classList.contains('interactive')) {
        cardElement.classList.add('interactive');
    }
})

const closeButton = document.querySelector('#closeButton');

closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    cardElement.classList.remove('interactive');
})

//Mixer
function sliderInputMixer (event){
    const value = event.target.value / 100;
    saw.volume = value;
    square.volume = (1 - value);
}
mixerSlider.addEventListener('input', sliderInputMixer);

//Frequency
function sliderInputFrequency (event){
    const value = event.target.value * 1;
    lowPassFilter.frequency = value;
}
frequencySlider.addEventListener('input', sliderInputFrequency);

//Tremolo
function sliderInputTremolo (event){
    const value = event.target.value / 100;
    tremolo.depth = value;
}
tremoloSlider.addEventListener('input', sliderInputTremolo);

//Mute Button
let isMuted = true;
let isPlaying = false;
function toggleMute (event){
    if (isMuted) {
        group.volume = masterVolume;
        isMuted = false;
        if (!isPlaying) {
            saw.play();
            square.play();
            isPlaying = true;
        }
    }
    else {
        group.volume = 0;
        isMuted = true;
    }
}
const muteButton = document.querySelector('#muteButton');
muteButton.addEventListener('click', toggleMute);