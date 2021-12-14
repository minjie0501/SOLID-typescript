"use strict";
class Dog {
    set name(value) {
        this._name = value;
    }
    get name() {
        return this._name;
    }
    get type() {
        return 'dog';
    }
    makeSound() {
        return 'Woef';
    }
}
class Cat {
    set name(value) {
        this._name = value;
    }
    get name() {
        return this._name;
    }
    get type() {
        return 'cat';
    }
    makeSound() {
        return 'Miauw';
    }
}
class Parrot {
    set name(value) {
        this._name = value;
    }
    get name() {
        return this._name;
    }
    get type() {
        return 'parrot';
    }
    makeSound() {
        return 'I am a pirate';
    }
}
class Fish {
    set name(value) {
        this._name = value;
    }
    get name() {
        return this._name;
    }
    get type() {
        return 'fish';
    }
    makeSound() {
        return '*silence*';
    }
}
class Zoo {
    constructor() {
        this._animals = new Array();
    }
    addAnimal(animal) {
        this._animals.push(animal);
    }
    get animals() {
        return this._animals;
    }
}
let zoo = new Zoo;
zoo.addAnimal(new Cat);
zoo.addAnimal(new Dog);
zoo.addAnimal(new Parrot);
zoo.addAnimal(new Fish);
let target = document.querySelector('#target');
zoo.animals.forEach((animal) => {
    target.innerHTML += (animal.type + ": " + animal.makeSound() + "<br>");
});
