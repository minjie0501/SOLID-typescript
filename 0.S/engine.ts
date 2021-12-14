export default class Engine{
    private _status: boolean = false;
    private readonly FUEL_MILEAGE: number;

    constructor(fuel_milage: number){
        this.FUEL_MILEAGE = fuel_milage;
    }

    get status(): boolean {
        return this._status;
    }

    get fuelMilage(): number{
        return this.FUEL_MILEAGE;
    }

    turnEngineOn() {
        this._status = true;
    }

    turnEngineOff() {
        this._status = false;
    }
}