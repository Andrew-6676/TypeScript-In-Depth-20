import {IBook, ILibMgrCallback} from './intefaces';
import {Category} from './enums';
import {TBookOrUndefined, TBookProperties} from './types';

export function getAllBooks(): ReadonlyArray<IBook> {
    const books: readonly IBook[] = [
        {
            id: 1,
            category: Category.JavaScript,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true
        },
        {
            id: 2,
            category: Category.JavaScript,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false
        },
        {id: 3, category: Category.CSS, title: 'CSS Secrets', author: 'Lea Verou', available: true},
        {
            id: 4,
            category: Category.JavaScript,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true
        }
    ] as const;

    return books;
}

export function getBookById(id: number): TBookOrUndefined {
    return getAllBooks().find(b => b.id === id);
}

export function logFirstAvaliable(books: ReadonlyArray<IBook> = getAllBooks()): void {
// export function logFirstAvaliable(books: ReadonlyArray<any>): void {
// export function logFirstAvaliable(books: ReadonlyArray<{ avaliable: boolean; title: string }>): void {
    const numberOfBooks: number = books.length;
    let title: string = '';

    for (const book of books) {
        if (book.available) {
            title = book.title;
            break;
        }
    }
    console.log(`Total number of books: ${numberOfBooks} `);
    console.log(`First avaliable book: ${title} `);
}

export function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
    return getAllBooks().filter(e => e.category === category).map(e => e.title);
}

export function logBookTitles(titles: string[]): void {
    titles.forEach((t: string) => console.log('log titles:',t));
}

export function getBookAuthorByIndex(index: number): [string, string] {
    const books: readonly IBook[]= getAllBooks();
    const {title, author} = books[index];
    return [title, author];
}


export function calcTotalPages(): bigint {
    const data = <const>[
        {lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250},
        {lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300},
        {lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280}
    ];

    return data.reduce((a: bigint, e) => {
        return a + BigInt(e.books * e.avgPagesPerBook);
    }, BigInt(0));
}

export function checkoutBooks(customer: string, ...booksIds: number[]): string[] {
    const titles: string[] = [];

    console.log(`checkin out books for ${customer}`);

    for(const id of booksIds) {
        const book: {available: boolean; title: string} = getBookById(id);
        if (book && book.available) {
            titles.push(book.title);
        }
    }

    return titles;
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string|boolean|number, boolean?]): string[] {
    const books: ReadonlyArray<any>= getAllBooks();

    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            return books.filter(b => b.author === arg).map(b => b.title);
        }
        if (typeof arg === 'boolean') {
            return books.filter(b => b.available === arg).map(b => b.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(b => b.available === available && b.id === id).map(b => b.title);
        }
    }
    return [];
}

export function printBook(book: IBook): void {
    console.log(`${book.title} by ${book.author}`);
}

export function createCustomerId(name: string, id: number): string {
    return `${id}-${name}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);
    if (age) console.log(`Customer age: ${age}`);
    if (city) console.log(`Customer city: ${city}`);
}


export function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been s string');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return title.split('').reverse().join('');
}

export function getBookProp(book: IBook, prop: TBookProperties): any {
    // if (typeof book[prop] === 'export function') {
    //     return book[prop][name];
    // } else {
        return book[prop];
    // }

}

/*---------------------------------------------------------*/

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.slice(2);
}

/* 09.01 */
// 2.	В файле functions.ts создайте функцию getBooksByCategory(), которая принимает два параметра:
//     a.	category - категории
// b.	callback – тип, ранее созданный интерфейс
// и ничего не возвращает
// 3.	Функция должна использовать setTimeout() и через 2с выполнить следующий код:
//     a.	В секции try: Использовать функцию getBookTitlesByCategory() для получения заголовков книг по категории
// b.	Если нашли книги, то вызвать функцию обратного вызова и передать два параметра: null и найденные книги
// c.	Если не нашли книг, то бросить исключение throw new Error('No books found.');
// d.	В секции catch: вызвать функцию обратного вызова и передать два параметра error и null.
// 4.	Создайте функцию logCategorySearch(), которая имеет сигнатуру, описанную в интерфейсе LibMgrCallback. Если пришел объект ошибки, то вывести свойство err.message, в противном случае вывести названия книг.

export function getBooksByCategory(category: Category, callback: ILibMgrCallback): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles && titles.length) {
                callback(null, titles);
            } else {
                throw new Error('No Books Found');
            }
        }
        catch (e) {
            callback(e,null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error, titles: string[]): void {
    if (err) {
        console.log(`Error message: ${err.message}`);
    } else {
        console.log('logCategorySearch:', titles);
    }
}

// Task 09.02. Promises
// 1.	Создайте функцию getBooksByCategoryPromise(), которая принимает один параметр – category и возвращает промис – массив заголовков книг.
// 2.	Используйте new Promise((resolve, reject) => { setTimeout(() => {…}, 2000) }); Добавьте код, аналогичный функции getBooksByCategory(), только теперь используйте resolve() и reject(). Верните из функции созданный промис.
// 3.	Вызовите функцию getBooksByCategoryPromise() и зарегистрируйте функции обратного вызова с помощью методов then и catch. Добавьте вывод сообщений в консоль перед и после вызова этой функции. Используйте Category.JavaScript и Category.Software в качестве значения параметра.
// 4.	Верните из функции, зарегистрированной с помощью then(), количество найденных книг. Зарегистрируйте с помощью еще одного метода then() функцию, которая должна вывести в консоль количество найденных книг.

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout( () => {
            const titles = getBookTitlesByCategory(category);
            if (titles && titles.length) {
                resolve(titles);
            } else {
                reject('No Books Found');
            }
        }, 2000);
    });
}

//
// Task 09.03. Async Functions
// 1.	Создайте асинхронную функцию logSearchResults в файле funtions.ts. Функция должна использовать функцию getBooksByCategoryPromise, получать и выводить в консоль количество найденных книг
// 2.	Вызовите эту функцию. Задайте значение параметра Category.JavaScript. Добавьте вывод в консоль до и после вызова функции. Обработайте ошибку с помощью catch

export async function logSearchResults(category: Category) {
    const titles = await getBooksByCategoryPromise(category);
    console.log('async titles', titles);
}
