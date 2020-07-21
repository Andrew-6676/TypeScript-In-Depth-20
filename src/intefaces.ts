import {Category} from './enums';
import instantiate = WebAssembly.instantiate;

interface IDamageLogger {
    (reason: string): void;
}

interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?: (reason: string) => void;
    markDamaged?: IDamageLogger;
    readonly pubDate?: string;
    // [propName: string]: any;
}




interface IPerson {
    name: string;
    email: string;
}

interface IAuthor extends IPerson {
    numBooksPublished: number;
}

interface ILibrarian extends IPerson {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface IMAgazine {
    title: string;
    publisher: string;
}

interface IShelfItems {
    title: string;
}

/* 09.01 */
// 1.	В файле interfaces.ts создайте интерфейс для функции обратного вызова LibMgrCallback, которая принимает два параметра:
//     a.	err: Error,
//     b.	titles: string[]
// и ничего не возвращает

interface ILibMgrCallback {
    (err: Error, titles: string[]): void;
}


export { IDamageLogger as ILogger, IBook, IPerson, IAuthor, ILibrarian, IMAgazine, IShelfItems, ILibMgrCallback };



