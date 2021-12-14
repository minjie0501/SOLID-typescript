import Engine from './engine'
import FuelTank from './fuelTank'

export default class Car {
    //it is convention to start property names in TypeScript with an underscore.
    // If you want to known why, remove the underscore and see if your compiler is throwing you an error!
    private _miles : number = 0;
    private readonly _engine: Engine;
    private  _fuelTank: FuelTank;

    constructor(engine: Engine, fuelTank: FuelTank) {
        this._engine = engine;
        this._fuelTank = fuelTank;
    }

    get miles(): number {
        return this._miles;
    }

    //When a value can only go one way (you add fuel, consuming fuel is handled by the car itself)
    // it is better to provide a specific method for this instead of a generic setter.
    // with a setter there is always the chance of somebody lowering the fuel amount by accident.
    drive() {
        if(this._engine.status === false || this._fuelTank.fuel <= 0) {
            //what I am doing here is a good principle called "failing early"
            // If you have some conditions you need to check, that will exclude most of the code in your function check that first
            // This prevents your "happy path" of code to be deeply indented.
            return;
        }
        
        this._fuelTank.subtractFuel();
        this._miles += this._engine.fuelMilage;
    }
}