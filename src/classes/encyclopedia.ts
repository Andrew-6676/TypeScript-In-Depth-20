import {ReferenceItem} from './reference-item';
import {positiveInteger} from '../decorators';

export default class Enciclopedia extends ReferenceItem {
    constructor(title: string, year: number, public edition: number) {
        super(title, year);
    }

    private _copyes: number = 0;

    get copyes() {
        return this._copyes;
    }
    @positiveInteger
    set copyes(val: number) {
        this._copyes = val;
    }


    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
        console.log(`«${this.title} – ${this.year}»`);
    }
}
