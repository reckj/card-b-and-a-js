// Import a module using ES6 import syntax
import {Howl, Howler} from 'howler';

//Import sound files
import sawURL from './assets/sound/saw.mp3'
import squareURL from './assets/sound/square.mp3'

//Import bootstrap
import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';

//Import scss file
import './scss/custom.scss';

//create object for sound-files
var saw = new Howl({
    src: [sawURL],
    loop: true,
});
var square = new Howl({
    src: [squareURL],
    loop: true,
});


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
    saw.volume(value);
    square.volume(1 - value);
    console.log(value);
}

const mixerSlider = document.querySelector('#mixerRange');

mixerSlider.addEventListener('input', sliderInput);

//Mute Button
let isMuted = false;

function toggleMute (event){
    if (isMuted){
        Howler.volume(1);
        isMuted = false;
    }
    else {
        Howler.volume(0);
        isMuted = true;
    }
}

const muteButton = document.querySelector('#muteButton');

muteButton.addEventListener('click', toggleMute);


//play soundfiles
saw.play();
square.play();