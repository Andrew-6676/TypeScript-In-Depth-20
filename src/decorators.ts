// 1.	Создайте файл decorators.ts. Создайте декоратор класса @sealed(), для того, чтобы предотвратить добавление новых свойств объекту класса и прототипу объекта. Функция-декоратор должна принимать один строчный параметр и ничего не должна возвращать. Перед выполнением функционала функция должна вывести в консоль сообщение «Sealing the constructor + параметр». Используйте метод Object.seal().
// 2.	Примените данный декоратор к классу UniversityLibrarian.
// 3.	Создайте экземпляр класса UniversityLibrarian. Проверьте сообщение в консоли.
export function sealed(param: string) {
    return function (target: any): void {
        console.log(`Sealing the constructor ${param}`);

        Object.seal(target);
        Object.seal(target.prototype);
    };
}

// 1.	Создайте декоратор класса @logger(), который будет изменять конструктор класса.
// 2.	Объявите внутри декоратора переменную newConstructor: Function и проинициализируйте ее функциональным выражением. Новый конструктор должен
// a.	выводить в консоль сообщение «Creating new instance»
// b.	выводить переданный параметр (имя класса).
// c.	создавать новое свойство age со значением 30.
// 3.	Проинициализируйте прототип нового конструктора объектом, созданным на основе прототипа переданного класса используя Object.create().
// 4.	Добавьте новый метод в прототип нового конструктора printLibrarian(), который должен выводить в консоль `Librarian name:  ${this.name}, Librarian age: ${this.age}`.
// 5.	Верните из декоратора новый конструктор, предварительно преобразовав его к типу <TFunction>.

export function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function = function () {
        console.log('Creating new instance');
        console.log(target);
        this.age = 30;
    };
    // присоединяем методы от target
    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.printLibrarian = function () {
        console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

// 1.	Создайте декоратор метода @writable() как фабрику, которая получает булевый параметр isWritable. Декоратор должен устанавливать свойство дескриптора writable в переданное значение.
// 2.	Добавить два метода для класса UniversityLibrarian
// a.	assistFaculty() – выводит в консоль сообщение «Assisting faculty».
// b.	teachCommunity() – выводит в консоль сообщение «Teaching community».
// 3.	Задекорируйте метод assistFaculty() как изменяемый, а метод teachCommunity() неизменяемый.
// 4.	Попробуйте поменять методы у экземпляра этого класса.

export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log(`Value of isWritable = ${isWritable}`);
        descriptor.writable = isWritable;

        return descriptor;
    };
}
// 08.04
// 1.	Создать декоратор метода @timeout() как фабрику, которая получает числовой параметр – количество миллисекунд. Метод, к которому применяется декоратор, должен запускаться через указанное количество времени.
// 2.	Декоратор должен переопределять свойство дескриптора value. Новая функция должна использовать setTimout() и запускать первоначальный метод через указанное количество времени. Вернуть из декоратора новый дескриптор.
// 3.	Применить декоратор к методу printItem() класса ReferenceItem.
// 4.	Создайте экземпляр класса Encyclopedia и вызовите метод printItem()

export function timeout(ms: number = 0) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        const origMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            setTimeout(() => {
                console.log('apply timeout');
                return origMethod.apply(this, args);
            }, ms);
        };
        return descriptor;
    };
}
// 08.05
// 1.	Создайте декоратор параметра метода - @logParameter(), который должен сохранять индекс параметра, к которому применяется декоратор в свойство прототипа ${methodName}_decor_params_indexes. Свойство организовать в виде массива.
// 2.	Создайте декоратор метода @logMethod(). Декоратор должен переопределять метод, к которому он применяется и возвращать новый дескриптор.
// 3.	Переопределенный метод должен получить доступ к индексам, находящимся в свойстве ${methodName}_decor_params_indexes и для каждого параметра выводить его значение в формате Method: ${methodName}, ParamIndex: ${ParamIndex}, ParamValue: ${ParamValue}
// 4.	Задекорируйте метод assistCustomer() и все его параметры соответствующими декораторами.
// 5.	Создайте экземпляр класса UniversityLibrarian, проинициализируйте свойство name, вызовите метод assistCustomer().

export function logParameter(target: any, methodName: string, index: number ) {
    const key = `${methodName}_decor_params_indexes`;
    if (Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const origMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const key = `${methodName}_decor_params_indexes`;
        const indexes = target[key];
        if (Array.isArray(indexes)) {
            args.forEach((arg: any, i: number) => {
                if (indexes.includes(i)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${i}, ParamValue: ${arg}`);
                }
            });
        }
        return origMethod.apply(this, args);
    };
    return descriptor;
}

// 08.06
// 1.	Создайте фабричную функцию декоратора свойства @format(pref: string = 'Mr./Mrs.'), которая при применении к свойству форматирует его вывод – добавляет префикс pref. Фабричная функция должна возвращать функцию с сигнатурой декоратора свойства, внутри которой необходимо вызвать функцию  makeProperty(target, propertyName, value => `${pref} ${value}`, value => value);
// 2.	Функция makeProperty имеет следующий вид:
function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}
//
// 3.	Задекорируйте свойство name класса UniversityLibrarian декоратором @format()
// 4.	Создайте экземпляр класса UniversityLibrarian. Установите значение для свойства name, затем получите его и выведите в консоль.

export function format(pref: string = 'Mr./Mrs.') {
    return function (prototype: any, propertyName: string) {
        makeProperty(
            prototype,
            propertyName,
            val => `${pref} ${val}`,
            val => val);
    };
}

// Task 08.07. Accessor Decorator
// 1.	Создайте декоратор аксессора @positiveInteger(), который бросает исключение в случае, если свойству устанавливается значение менше 1 и не целое.
// 2.	Добавьте в класс Encyclopedia приватное числовое свойство _copies,  а также геттер и сеттер для этого свойства, которые возвращают значение и устанавливают значение соответственно.
// 3.	Задекорируйте геттер или сеттер декоратором @positiveInteger().
// 4.	Создайте экземпляр класса Encyclopedia. Попробуйте установить разные значения, -10, 0, 4.5, 5

export function positiveInteger(prototype: any, propertyName: string, descriptor: PropertyDescriptor) {
    const origSet = descriptor.set;
    descriptor.set = function (val: number) {
        if (val < 1 || !Number.isInteger(val)) {
            throw new Error(`Invalid value: ${val}`);
        }
        origSet.call(this, val);
    };

    // descriptor.get = function () {
    //
    // };

    return descriptor;

}
