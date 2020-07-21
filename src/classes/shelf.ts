import {IShelfItems} from '../intefaces';

export default class Shelf<T extends IShelfItems> {
    private _items: Array<T> = [];

    add(item: T): void {
        this._items.push(item);
    }

    getFirst(): T {
        return this._items[0];
    }

    find(title: string): T {
        return this._items.find(e => e.title === title);
    }

    printTitles(): void {
        this._items.forEach(e => {
            console.log(e.title);
        });

    }
}
