import * as Interfaces from '../intefaces';
import {format, logger, logMethod, logParameter, sealed, writable} from '../decorators';

// 08.03
// a.	assistFaculty() – выводит в консоль сообщение «Assisting faculty».
// b.	teachCommunity() – выводит в консоль сообщение «Teaching community».
// 3.	Задекорируйте метод assistFaculty() как изменяемый, а метод teachCommunity() неизменяемый.

@sealed('UniversityLibrarian')
@logger
class UniversityLibrarian implements Interfaces.ILibrarian {
    department: string;
    email: string;
    @format() name: string;

    @logMethod
    assistCustomer(@logParameter custName: string, @logParameter surname?: any): void {
        console.log(`${this.name} is assisting ${custName}`);
    };

    @writable(true)
    assistFaculty() {
        console.log('assistFaculty');
    };

    @writable(false)
    teachComunity() {
        console.log('assistFaculty');
    };
}

export { UniversityLibrarian };
