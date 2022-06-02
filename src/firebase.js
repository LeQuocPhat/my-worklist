import firebase  from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBs7HF7b8DG24gHqaN5H8VWFgr4m6rmlYk",
    authDomain: "pro-worklist-452a1.firebaseapp.com",
    databaseURL: "https://pro-worklist-452a1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pro-worklist-452a1",
    storageBucket: "pro-worklist-452a1.appspot.com",
    messagingSenderId: "134622244243",
    appId: "1:134622244243:web:51cee63efe1c8a8df1cc66"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;

