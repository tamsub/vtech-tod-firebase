import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBgGh-L5mk0eXFkWIlf4l4aAiQsl2dURNQ",
	authDomain: "vtech-todolist.firebaseapp.com",
	projectId: "vtech-todolist",
	storageBucket: "vtech-todolist.appspot.com",
	messagingSenderId: "969363073492",
	appId: "1:969363073492:web:6a8060816d046837bc8e41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
