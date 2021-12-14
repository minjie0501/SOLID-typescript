interface Oven {
  turnOn(): void;
  turnOff(): void;
  bake(item: string): void;
}

class GasOven implements Oven {
  private _isOn!: boolean;
  private _target = document.getElementById("target") as HTMLElement;

  public turnOn(): void {
    setTimeout(() => {
      this._target.innerHTML += "<p>" + new Date().getHours() + ":" + new Date().getMinutes() + " : THE GAS IS ON!</p>";
    }, 1000);
    console.log("THE GAS IS ON!"); 
    this._isOn = true;
  }

  public turnOff(): void {
    setTimeout(() => {
      this._target.innerHTML += "<p>" + new Date().getHours() + ":" + new Date().getMinutes() + " : THE GAS IS OFF!</p><hr>";
    }, 3000);
    console.log("THE GAS IS OFF!"); 
    this._isOn = false;
  }

  public bake(item: string) {
    if (this._isOn) {
      setTimeout(() => {
        this._target.innerHTML += "<p>" + new Date().getHours() + ":" + new Date().getMinutes() + " : Now baking " + item + " !</p>";
      }, 2000);
      console.log("Now baking " + item + "!");
    } else {
      setTimeout(() => {
        this._target.innerHTML += "<p>" + new Date().getHours() + ":" + new Date().getMinutes() + " : there is no gas!</p>";
      }, 2000);
      console.log("there is no gas!"); 
    }
  }
}

class ElectricOven implements Oven {
  private _isOn!: boolean;
  private _target = document.getElementById("target") as HTMLElement;

  public turnOn(): void {
    setTimeout(() => {
      this._target.innerHTML += "<p>" + new Date().getHours() + ":" + new Date().getMinutes() + " : THE ELECTRIC OVEN IS ON!</p>";
    }, 1000);
    console.log("THE ELECTRIC OVEN IS ON!");
    this._isOn = true;
  }

  public turnOff(): void {
    setTimeout(() => {
      this._target.innerHTML += "<p>" + new Date().getHours() + ":" + new Date().getMinutes() + " : THE ELECTRIC OVEN IS OFF!</p><hr>";
    }, 3000);
    console.log("THE ELECTRIC OVEN IS OFF!");
    this._isOn = false;
  }

  public bake(item: string) {
    if (this._isOn) {
      setTimeout(() => {
        this._target.innerHTML += "<p>" + new Date().getHours() + ":" + new Date().getMinutes() + " : Now baking " + item + " !</p>";
      }, 2000);
      console.log("Now baking " + item + "!");
    } else {
      setTimeout(() => {
        this._target.innerHTML += "<p>" + new Date().getHours() + ":" + new Date().getMinutes() + " : there is no electricity!</p>";
      }, 2000);
      console.log("there is no electricity!");
    }
  }
}

class Restaurant {
  private _name: string;
  private _oven: Oven;

  constructor(name: string, oven:Oven) {
    this._name = name;
    this._oven = oven;
  }

  public Cook(item: string) {
    this._oven.turnOn();
    this._oven.bake(item);
    this._oven.turnOff();
  }
}


let bakery = new Restaurant("Bakery", new GasOven());
bakery.Cook("cookies");


let crepery = new Restaurant("Crepery", new ElectricOven());
crepery.Cook("crepes");

//Now if we want to add a new restaurant with an ELECTRIC cooker, we are gonna be in a hot mess ...
/*
let bakery = new Restaurant("Bakery", new Oven());
bakery.Cook("cookies");

let crepery = new Restaurant("Crepery", new Stove());
crepery.Cook("crepes");
 */
