import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyD-W28I1QTBmufy-EwWX4jYJor3j4R9Ghk',
    authDomain: 'ggtest-dbd00.firebaseapp.com',
    projectId: 'ggtest-dbd00',
    storageBucket: 'ggtest-dbd00.firebasestorage.app',
    messagingSenderId: '381501819231',
    appId: '1:381501819231:web:27f847685e827507b68eea',
    measurementId: 'G-QEP3B766M3',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
