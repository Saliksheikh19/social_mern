import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDg7cw26mHRcSrEvFoyiOWWpVdeayJSD-Y",
    authDomain: "media-3b44f.firebaseapp.com",
    projectId: "media-3b44f",
    storageBucket: "media-3b44f.appspot.com",
    messagingSenderId: "996191330318",
    appId: "1:996191330318:web:2639af83f332babed99c5f"
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage, ref, uploadBytesResumable, getDownloadURL }