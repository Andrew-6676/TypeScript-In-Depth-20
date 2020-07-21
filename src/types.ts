import {IAuthor, IBook, IPerson} from './intefaces';

type TPersonBook = IPerson & IBook;

type TBookOrUndefined =  IBook | undefined;

type TBookProperties = keyof IBook;

export { TPersonBook, TBookOrUndefined, TBookProperties };


export type BookRequiredFields = Required<IBook>;
export type UpdatedBook = Partial<IBook>;
export type AuthorWoEmail = Omit<IAuthor, 'email'>;
export type СreateCustomerFunctionType  = (name: string, age?: number, city?: string) => void;
