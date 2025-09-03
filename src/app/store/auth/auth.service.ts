import { Injectable, inject } from "@angular/core";
import { 
    Auth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut
} from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { from } from "rxjs";
import { doc, setDoc } from "@angular/fire/firestore";

@Injectable({ 
    providedIn: 'root'
})

export class AuthService {

    private auth: Auth = inject(Auth);
    private firestore: Firestore = inject(Firestore);

    //login
    login(email: any, password: any) {
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    // register
    register(email: any, password: any) {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    //logout
    logout() {
        return from(signOut(this.auth));
    }

    createUserDocument(uid: string, email: string, name: string){
        const userDocRef = doc(this.firestore, `users/${uid}`);
        const userData = { uid, email, name }
        return from(setDoc(userDocRef, userData));
    }
}

