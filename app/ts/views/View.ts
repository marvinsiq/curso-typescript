export abstract class View<T> {

    private _elemento: JQuery;

    constructor(seletor: string) {

        this._elemento = $(seletor);
    }

    update(model: T) {
        console.log(model);
        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;
}