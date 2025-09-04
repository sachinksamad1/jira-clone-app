import { inject, Injectable } from "@angular/core";
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentReference, Firestore, onSnapshot, orderBy, query, QuerySnapshot, serverTimestamp, updateDoc } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { Task } from "./tasks.model";
import { Comment } from "../comments/comments.model";

@Injectable({ providedIn: 'root' })
export class TaskService {

    private firestore: Firestore = inject(Firestore);
    private tasksCollection = collection(this.firestore, 'tasks');

    getTasks(): Observable<Task[]> {

        return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<Task[]>;
    }
    //add
    addTask(taskdata: Omit<Task, 'id'>): Observable<DocumentReference> {
        return from(addDoc(this.tasksCollection, taskdata));
    }
    //upda
    updateTask(taskUpdate: Partial<Task> & { id: string }): Observable<void> {
        const taskDocRef = doc(this.firestore, `tasks/${taskUpdate.id}`);
        return from(updateDoc(taskDocRef, taskUpdate));
    }

    deleteTask(taskId: string): Observable<void> {
        const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
        return from(deleteDoc(taskDocRef));
    }

    //getcomments
    getComments(taskId: string): Observable<Comment[]> {
        const commentsCollection = collection(this.firestore, `tasks/${taskId}/comments`);
        const q = query(commentsCollection, orderBy('createdAt', 'asc'));

        return new Observable(subscriber => {
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const comments: Comment[] = [];
                QuerySnapshot.forEach(doc => {
                    comments.push({ id: doc.id, ...doc.data() } as Comment)
                });
                subscriber.next(comments);
            }, (error) => {
                subscriber.error(error)
            });
            return () => unsubscribe();
        })
        //return
    }


    //addcomments
    addComment(taskId: string, content: string, user: { uid: string; name: string; email: string; }): Observable<DocumentReference> {
        const commentsCollection = collection(this.firestore, `tasks/${taskId}/comments`);
        return from(addDoc(commentsCollection, {
            taskId,
            content,
            authorId: user.uid,
            authorName: user.name,
            authorEmail: user.email,
            createdAt: serverTimestamp()
        }));
    }
}