type Animal = {
    name: string;
}

class Dog implements Animal{
    private _name!: string; //TypeScript 2.7 includes a strict class checking where all the properties should be initialized in the constructor -- without ! it would show error

    set name(value:string) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'dog';
    }

    makeSound(){
        return 'Woef';
    }
}

class Cat {
    private _name!:string;

    set name(value:string) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'cat';
    }
    
    makeSound(){
        return 'Miauw';
    }
}
class Parrot {
    private _name!:string;

    set name(value:string) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'parrot';
    }

    makeSound(): string{
        return 'I am a pirate';
    }
}

class Fish {
    private _name!:string;

    set name(value:string) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'fish';
    }

    makeSound(): string{
        return '*silence*';
    }
}


class Zoo {
    private _animals: Array<Object> = new Array<Object>();

    public addAnimal(animal: object) {
        this._animals.push(animal);
    }

    get animals(): Array<Object> {
        return this._animals;
    }

}


let zoo = new Zoo;
zoo.addAnimal(new Cat);
zoo.addAnimal(new Dog);
zoo.addAnimal(new Parrot);
zoo.addAnimal(new Fish);
let target = <HTMLElement>document.querySelector('#target')

zoo.animals.forEach((animal:any) => {
    target.innerHTML += (animal.type + ": " + animal.makeSound() + "<br>");
});
