export class Amiibo {
  constructor(id:number,name:string,amiiboSeries:string,character:string,gameSeries:string,image:string,release:string[],type:string) {
    this._id = id;
    this._name = name;
    this._amiiboSeries = amiiboSeries;
    this._character = character;
    this._gameSeries = gameSeries;
    this._image = image;
    this._release = release;
    this._type = type;
  }

  private _id:number;
  private _name: string;
  private _amiiboSeries:string;
  private _character:string;
  private _gameSeries:string;
  private _image:string;
  private _release:string[];
  private _type:string;

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get amiiboSeries(): string {
    return this._amiiboSeries;
  }
  set amiiboSeries(value: string) {
    this._amiiboSeries = value;
  }
  get character(): string {
    return this._character;
  }
  set character(value: string) {
    this._character = value;
  }
  get gameSeries(): string {
    return this._gameSeries;
  }
  set gameSeries(value: string) {
    this._gameSeries = value;
  }
  get image(): string {
    return this._image;
  }
  set image(value: string) {
    this._image = value;
  }
  get release(): string[] {
    return this._release;
  }
  set release(value: string[]) {
    this._release = value;
  }
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
}
