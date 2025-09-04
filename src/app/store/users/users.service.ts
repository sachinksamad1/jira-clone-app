import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './users.model';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore: Firestore = inject(Firestore);

  getUsers(): Observable<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection) as Observable<User[]>;
  }
}