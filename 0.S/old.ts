import Car from './car'
import Engine from './engine'
import Music from './music'
import FuelTank from './fuelTank'

// When you see <cast>variable this is a "cast" of a variable, explicitly telling the code what the type of this variable will be.
// This is sometimes needed when a default JS function does not return a precise enough Type.
// I need to cast this to HtmlElement because the default Element return type is not specific to the HTML context (because some versions of JS can also be used in the backend, see node.js)
// This makes it not having some properties like .innerText. Test it out yourself by removing the <HTMLElement>
const musicToggleElement = document.querySelector('#music-toggle') as HTMLElement;
const musicSliderElement = <HTMLInputElement>document.querySelector('#music-slider');
const engineToggleElement = <HTMLInputElement>document.querySelector('#engine-toggle');
const addFuelForm = document.querySelector('#add-fuel-form') as HTMLElement;
const addFuelInput = <HTMLFormElement>document.querySelector('#add-fuel-input');
const fuelLevelElement = <HTMLElement>document.querySelector('#fuel-level');
const milesElement = <HTMLElement>document.querySelector('#miles-value');
const audioElement = <HTMLAudioElement>document.querySelector('#car-music');

const MUSIC_ON_MSG = 'Turn music on';
const MUSIC_OFF_MSG = 'Turn music on';

let engine = new Engine(10)
let fuelTank = new FuelTank(100)
let music= new Music()
let car = new Car(engine, fuelTank);

musicToggleElement.addEventListener('click', () => {
    if(music.level === 0) {
        music.turnOn();
        musicSliderElement.value = music.level.toString();
        musicToggleElement.innerText = MUSIC_OFF_MSG;
        return;
    }
    musicToggleElement.innerText = MUSIC_ON_MSG;
    music.turnOff();
});

//I use input instead of change, because then the value changes when I move the mouse, not only on release
musicSliderElement.addEventListener('input', (event) => {
    let target = <HTMLFormElement>(event.target);

    music.level = target.value;
    audioElement.volume = music.level / 100;

    //@todo when you are repeating the same text over and over again maybe we should have made some constants for it? Can you do improve on this?
    musicToggleElement.innerText = music.level ? MUSIC_OFF_MSG : MUSIC_ON_MSG;
});

engineToggleElement.addEventListener('click', () => {
    if(engine.status) {
        engine.turnEngineOff();
        engineToggleElement.innerText = 'Turn engine on';
        return;
    }
    engineToggleElement.innerText = 'Turn engine off';
    engine.turnEngineOn();
});

addFuelForm.addEventListener('submit', (event) => {
    event.preventDefault();

    fuelTank.addFuel(Number(addFuelInput.value));
    fuelLevelElement.innerText = fuelTank.fuel.toString();
});

setInterval(() => {
    car.drive();

    //while it looks like both lines below are the same there is a subtle difference (you could put breakpoints here to see the difference):
    // this <cast> will only tell TypeScript that the value is a string, but the actual variable in JS is not changed in any way: it is in reality still a number
    milesElement.innerText = <string><unknown>(car.miles);
    // This .toString() will actually convert the value in JavaScript from an integer to a string
    fuelLevelElement.innerText = fuelTank.fuel.toString();

    if(music.level === 0) {
        audioElement.pause();
    } else {
        audioElement.play();
    }

}, 1000);