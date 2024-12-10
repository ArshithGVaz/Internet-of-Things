// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD_B23DYhcXDvYkZoU7Cd58SNwRuO0gMV8",
    authDomain: "project-142ac.firebaseapp.com",
    databaseURL: "https://project-142ac-default-rtdb.firebaseio.com",
    projectId: "project-142ac",
    storageBucket: "project-142ac.firebasestorage.app",
    messagingSenderId: "907378804513",
    appId: "1:907378804513:web:dabff74cfb145323a9e060"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
