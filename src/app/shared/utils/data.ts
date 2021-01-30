import {DocumentChangeAction} from '@angular/fire/firestore';

interface Item {
    id?: string; // ID of a document
    [key: string]: any; // any set of other fields
}

// Conveniently extract data from Firebase
// Converts the DocumentChangeAction to Item
export const extractDocumentChangeActionData = (x: DocumentChangeAction<any>, addId = true): Item => {
    const data = x.payload.doc.data();

    if (addId) {
        data.id = x.payload.doc.id; // if the addId flag is set, add the ID field
    }

    return data;
};
