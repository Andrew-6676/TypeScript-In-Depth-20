import {Category} from './enums';
import {IAuthor, IBook, ILibrarian, ILogger, IMAgazine} from './intefaces';
import {RefBook, UniversityLibrarian} from './classes';
import {BookRequiredFields, TBookProperties, TPersonBook, UpdatedBook, СreateCustomerFunctionType} from './types';
import {
    bookTitleTransform,
    calcTotalPages,
    checkoutBooks,
    createCustomer,
    createCustomerId,
    getAllBooks,
    getBookAuthorByIndex,
    getBookById,
    getBookProp,
    getBooksByCategory,
    getBooksByCategoryPromise,
    getBookTitlesByCategory,
    getTitles,
    logBookTitles,
    logCategorySearch,
    logFirstAvaliable, logSearchResults,
    printBook,
    purge
} from './functions';
import Shelf from './classes/shelf';


showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

/* ---------------------------------------------------------------------------------------------  */


logFirstAvaliable(getAllBooks());
logFirstAvaliable();
logBookTitles(getBookTitlesByCategory(Category.CSS));
logBookTitles(getBookTitlesByCategory());
console.log(getBookAuthorByIndex(3));
console.log('calcTotalPages:', calcTotalPages());
console.log('getBookById(1)', getBookById(1));

const myBooks: string[] = checkoutBooks('Ann', 1,2,4);
console.log('myBooks:', myBooks);

console.log('getTitles(false):', getTitles(false));

/* ------------------------------------------------------------------------------------------ */


const myID: string = createCustomerId('AAAA', 666);
console.log('createCustomerId:', myID);

let idGenerator: (n: string, i: number) => string;
idGenerator = (_name: string, _id: number) => `${_id}-${_name}`;
idGenerator = createCustomerId;



console.log('idGenerator:', idGenerator('AAAA', 666));
createCustomer('BBBBB');
createCustomer('BBBBB', 77);
createCustomer('BBBBB', 77, 'DefaultCity');

/* ------------------------------------------------------------------------------------------ */

console.log('bookTitleTransform(my title):', bookTitleTransform('my title'));
// console.log('bookTitleTransform(5555):', bookTitleTransform(5555));

/* ----------------------------------------------------------------------------------------- */
const myBook: IBook = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 1999,
    markDamaged: (reason: string) => {
        console.log(`Damaged: ${reason}`);
    },
    // year: 2015,
    // copies: 3
};

printBook(myBook);
myBook.markDamaged('missing back cover');

const logDamage: ILogger = (reason: string) => {
    console.log(`Damaged: ${reason}`);
};

logDamage('missing back cover');

/* 04.03 ----------------------------------------------------------------------------------------- */


const favoriteAuthor: IAuthor = {
    name: 'Vasya',
    email: 'Vasya@mail.ru',
    numBooksPublished: 0
};
const favoriteLibrarian: ILibrarian = {
    name: 'Vasya',
    email: 'Vasya@mail.ru',
    department: 'Fantastic literature',
    assistCustomer: (custName: string) => console.log(`assistCustomer: ${custName}`)
};

/* 04.04 ---------------------------------------------------------------------------------------------- */

const offer: any = {
    book: {
        title: 'Essential TypeScript'
    }
};

console.log('offer?.magazine', offer.magazine?.title);
console.log('offer.magazine?.getTitle()', offer.magazine?.getTitle());
// console.log('offer.book.getTitle()', offer.book?.getTitle());
console.log('offer.book.getTitle?.()', offer.book.getTitle?.());

/* 04.05 ------------------------------------------------------------------------------------ */

const a: TBookProperties = 'pages';


console.log(getBookProp(getAllBooks()[0], 'title'));
console.log(getBookProp(getAllBooks()[0], 'markDamaged'));
// console.log(getBookProp(getAllBooks()[0], 'isbn'));

console.log('05.01 ===============================================================');
/* 05.01 ------------------------------------------------------------------------------------ */



// const ref = new ReferenceItem('Title',1999);
// ref.printItem();
// ref.publisher = 'bla-bla';
// console.log('ref.publisher:', ref.publisher);

/* 05.02 ------------------------------------------------------------------------------------ */



const refBook: RefBook = new RefBook('TS',2020, 4);
console.log(refBook);
refBook.printItem();
refBook.printCitation();

/* 05.04 ------------------------------------------------------------------------------------------ */



const favoriteLibrarian2: ILibrarian = new UniversityLibrarian();
favoriteLibrarian2.name = 'Anna';
favoriteLibrarian2.assistCustomer('Boris hren popadesh');

/* 05.05 ------------------------------------------------------------------------------------------ */
// 1.	Создайте тип PersonBook. Используйте для этого интерфейсы Person, Book и пересечение типов.
// 2.	Объявите переменную c типом PersonBook, проинициализируйте ее литералом, выведите ее в консоль.
// 3.	Создайте тип BookOrUndefined. Используйте для этого объединение интерфейса Book и undefined.
// 4.	Замените тип возвращаемого значения в функции getBookByID на BookOrUndefined.



const personBook: TPersonBook = {
    author: '', available: false, category: undefined, email: '', id: 0, name: '', title: ''
};




console.log(personBook);

/* --------------------------------- */
// interface A {
//     name: string;
// }
// interface B {
//     name: string;
// }
//
// type AB = A & B;
//
// const a: AB = {
//     name: 'dfdf'
// };

/* 06.05 ------------------------------------------------------------------------------------------------ */
// console.log('06.05 ========================================================================');
const flag = true;

if (flag) {
    import('./classes')
        .then(
            module => {
                const reader = new module.Reader();
                reader.name = 'Vasya';
                console.log('06.05 ========================================================================', reader);
            }
        )
        .catch( err => console.log(err));
}

/* 07.01 ------------------------------------------------------------------------------------------------ */
console.log('07.01 ========================================================================');

const inventory: IBook[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

console.log('purge(inventory):', purge(inventory));
console.log('purge(a):', purge([1,2,3,4,5,6,'3']));

// err
// let res = purge(inventory);
// res = purge([1,2,3]);

/* 07.02 ------------------------------------------------------------------------------------------------ */
console.log('07.02 ========================================================================');

const bookShelf: Shelf<IBook> = new Shelf<IBook>();
const magazinShelf: Shelf<IMAgazine> = new Shelf<IMAgazine>();
const magazins: IMAgazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

inventory.forEach(b => bookShelf.add(b));
magazins.forEach(m => magazinShelf.add(m));

console.log('>bookShelf.getFirst():', bookShelf.getFirst().title);
console.log('>magazinShelf.getFirst():', magazinShelf.getFirst().title);

/* 07.03 ------------------------------------------------------------------------------------------------ */
console.log('07.03 ========================================================================');

console.log('>print titles:');
magazinShelf.printTitles();

console.log('>find: ', magazinShelf.find('Five Points'));


/* 07.04 ------------------------------------------------------------------------------------------------ */
console.log('07.04 ========================================================================');
// 1.	Объявите алиас типа BookRequiredFields в файле types.ts, используя интерфейс Book и утилиту Required.
// 2.	Объявите переменную типа BookRequiredFields и присвойте ей соответствующий объект.
// 3.	Объявите алиас типа UpdatedBook, используя интерфейс Book и утилиту Partial
// 4.	Объявите переменную типа UpdatedBook и присвойте ей соответствующий объект.
// 5.	Объявите алиас типа AuthorWoEmail, используя интерфейс Author и утилиту Omit.
// 6.	Объявите алиас СreateCustomerFunctionType для функционального типа функции createCustomer.
// 7.	Объявите переменную используя алиас типа СreateCustomerFunctionType и утилиту Parameters, вызовите функцию createCustomer, передав эту переменную

const rb: BookRequiredFields = {
    available: false,
    category: undefined,
    markDamaged: undefined,
    pages: 0,
    pubDate: '',
    title: '',
    id: 1,
    author: '34'
};

const ub: UpdatedBook = {
    author: '333',
};

const params: Parameters<СreateCustomerFunctionType> = ['any name'];
createCustomer(...params);

/* 08.01 ------------------------------------------------------------------------------------------------ */
console.log('08.01 ========================================================================');
// 1.	Создайте файл decorators.ts. Создайте декоратор класса @sealed(), для того, чтобы предотвратить добавление новых свойств объекту класса и прототипу объекта. Функция-декоратор должна принимать один строчный параметр и ничего не должна возвращать. Перед выполнением функционала функция должна вывести в консоль сообщение «Sealing the constructor + параметр». Используйте метод Object.seal().
// 2.	Примените данный декоратор к классу UniversityLibrarian.
// 3.	Создайте экземпляр класса UniversityLibrarian. Проверьте сообщение в консоли.
const ul = new UniversityLibrarian();
console.log('Decorator 1: ',ul);


/* 08.02 ------------------------------------------------------------------------------------------------ */
console.log('08.02 ========================================================================');
// 1.	Создайте декоратор класса @logger(), который будет изменять конструктор класса.
// 2.	Объявите внутри декоратора переменную newConstructor: Function и проинициализируйте ее функциональным выражением. Новый конструктор должен
// a.	выводить в консоль сообщение «Creating new instance»
// b.	выводить переданный параметр (имя класса).
// c.	создавать новое свойство age со значением 30.
// 3.	Проинициализируйте прототип нового конструктора объектом, созданным на основе прототипа переданного класса используя Object.create().
// 4.	Добавьте новый метод в прототип нового конструктора printLibrarian(), который должен выводить в консоль `Librarian name:  ${this.name}, Librarian age: ${this.age}`.
// 5.	Верните из декоратора новый конструктор, предварительно преобразовав его к типу <TFunction>.
// 6.	Примените этот декоратор к классу UniversityLibrarian. Проверьте результат работы в консоли.
// 7.	Объявите переменную fLibrarian и создайте экземпляр класса UniversityLibrarian. Задайте значение Anna для name. Вызовите метод printLibrarian()

const lib = new UniversityLibrarian();
lib.name = 'Anna';
lib['printLibrarian']();


/* 08.03 ------------------------------------------------------------------------------------------------ */
console.log('08.03 ========================================================================');
// lib.assistFaculty = null;
// lib.teachComunity = null;

/* 08.04 ------------------------------------------------------------------------------------------------ */
console.log('08.04 ========================================================================');
const e = new RefBook('no title', 2020, 3);
e.printItem();

/* 08.05 ------------------------------------------------------------------------------------------------ */
console.log('08.05 ========================================================================');
lib.assistCustomer('name_1', 'param_2');
console.log(lib);

/* 08.06 ------------------------------------------------------------------------------------------------ */
console.log('08.06 ========================================================================');
lib.name = 'Boris';
console.log(lib.name);

/* 08.07 ------------------------------------------------------------------------------------------------ */
console.log('08.07 ========================================================================');
e.copyes = 5;
// e.copyes = 5.5;
// e.copyes = -5;

/* 09.01 */
// 5.	Вызовите функцию getBooksByCategory() и передайте ей необходимые аргументы. Добавьте вывод сообщений в консоль перед и после вызова этой функции. Используйте Category.JavaScript и Category.Software в качестве значения первого параметра.
console.log('09.01 ========================================================================');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);

// Task 09.02. Promises
// 1.	Создайте функцию getBooksByCategoryPromise(), которая принимает один параметр – category и возвращает промис – массив заголовков книг.
// 2.	Используйте new Promise((resolve, reject) => { setTimeout(() => {…}, 2000) }); Добавьте код, аналогичный функции getBooksByCategory(), только теперь используйте resolve() и reject(). Верните из функции созданный промис.
// 3.	Вызовите функцию getBooksByCategoryPromise() и зарегистрируйте функции обратного вызова с помощью методов then и catch. Добавьте вывод сообщений в консоль перед и после вызова этой функции. Используйте Category.JavaScript и Category.Software в качестве значения параметра.
// 4.	Верните из функции, зарегистрированной с помощью then(), количество найденных книг. Зарегистрируйте с помощью еще одного метода then() функцию, которая должна вывести в консоль количество найденных книг.
console.log('09.02 ========================================================================');
getBooksByCategoryPromise(Category.JavaScript)
    .then(
        titles => {
            console.log(titles);
            return titles.length;
        }
    )
    .then(
        l => {
            console.log(l);
        }
    )
    .catch(
        err => {
            console.log(err.message);
        }
    )
    .finally(
        () => {
            console.log('Finish');
        }
    );

getBooksByCategoryPromise(Category.Software)
    .then(
        titles => {
            console.log(titles);
            return titles.length;
        }
    )
    .then(
        l => {
            console.log(l);
        }
    )
    .catch(
        err => {
            console.log(err.message);
        }
    )
    .finally(
        () => {
            console.log('Finish');
        }
    );
// Task 09.03. Async Functions
// 1.	Создайте асинхронную функцию logSearchResults в файле funtions.ts. Функция должна использовать функцию getBooksByCategoryPromise, получать и выводить в консоль количество найденных книг
// 2.	Вызовите эту функцию. Задайте значение параметра Category.JavaScript. Добавьте вывод в консоль до и после вызова функции. Обработайте ошибку с помощью catch
console.log('09.03 ========================================================================');
console.log('start 09.03');
logSearchResults(Category.JavaScript);
logSearchResults(Category.Software);
console.log('finish 09.03');
