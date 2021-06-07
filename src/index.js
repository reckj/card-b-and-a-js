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
    //loop: true,
});
var square = new Howl({
    src: [squareURL],
    //loop: true,
});

const cardElement = document.querySelector('.card');

cardElement.addEventListener('click', () => {
    cardElement.classList.add('interactive');
})


//play soundfiles
saw.play();
square.play();