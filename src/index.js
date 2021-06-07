// Import a module using ES6 import syntax
import {Howl, Howler} from 'howler';

//Import Pizzicato
import Pizzicato from 'pizzicato';

//Import sound files
import sawURL from './assets/sound/saw.mp3'
import squareURL from './assets/sound/square.mp3'

//Import bootstrap
import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';

//Import scss file
import './scss/custom.scss';


//import sound objects
const saw = new Pizzicato.Sound({ 
    source: 'wave',
    options: {
        type: 'sawtooth',
        frequency: 440
    }
});

const square = new Pizzicato.Sound({ 
    source: 'wave',
    options: {
        type: 'square',
        frequency: 440
    }
});

const group = new Pizzicato.Group([saw, square]);
group.volume = 0;

//Flip Card
const cardElement = document.querySelector('.card');
const cardFront = document.querySelector('.card-front');

cardFront.addEventListener('click', () => {
    if (!cardElement.classList.contains('interactive')) {
        cardElement.classList.add('interactive');
        console.log('interactive added');
    }
})

const closeButton = document.querySelector('#closeButton');

closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    cardElement.classList.remove('interactive');
    console.log('interactive removed');
})

//Mixer
function sliderInput (event){
    const value = event.target.value / 100;
    saw.volume = value;
    square.volume = (1 - value);
}

const mixerSlider = document.querySelector('#mixerRange');

mixerSlider.addEventListener('input', sliderInput);

//Mute Button
let isMuted = true;

function toggleMute (event){
    if (isMuted){
        group.volume = 1;
        isMuted = false;
    }
    else {
        group.volume = 0;
        isMuted = true;
    }
}

const muteButton = document.querySelector('#muteButton');

muteButton.addEventListener('click', toggleMute);


//play soundfiles
saw.play();
square.play();
