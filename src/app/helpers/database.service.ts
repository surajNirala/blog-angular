import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements InMemoryDbService {

  constructor() { }
  createDb() {
    let users: User[] = [
      {
        id: 1,
        title: 'Mr',
        firstName: 'Suraj',
        lastName: 'Nirala',
        email: 'suraj@gmail.com',
        dob: '1995-11-18',
        password: '12345678',
      },
      {
        id: 2,
        title: 'Mr',
        firstName: 'Chandan',
        lastName: 'Sharma',
        email: 'chandan@gmail.com',
        dob: '1992-10-10',
        password: '12345678',
      },
      {
        id: 3,
        title: 'Miss',
        firstName: 'Anjali',
        lastName: 'Yadav',
        email: 'anajali@gmail.com',
        dob: '1996-10-10',
        password: '12345678',
      },
      {
        id: 4,
        title: 'Mrs',
        firstName: 'Mahak',
        lastName: 'Sharma',
        email: 'mahak@gmail.com',
        dob: '1992-10-10',
        password: '12345678',
      }
    ];
    return { getUsers: users };
  }
}
