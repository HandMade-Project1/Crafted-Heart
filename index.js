// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAC2zpAE0YqT_zQG1zwYjmjgBiKjDfvlA8",
    authDomain: "crafted-heart.firebaseapp.com",
    projectId: "crafted-heart",
    storageBucket: "crafted-heart.firebasestorage.app",
    messagingSenderId: "356981294414",
    appId: "1:356981294414:web:ea3a6c8e9dd59df7728a1f",
    measurementId: "G-PQ9WCXTS0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the Firebase services
export { app, auth, db };

let products = [
    {name : "Candle Set" , category :"Candles Gift"},
    {name : "Decorative Vase" , category : "Home Decor Gift"},
    {name : "Knitted Scarf" , category : "Wool Gift"},
    {name : "Embroidery Art" , category : "Embroidery Gift"},
    {name : "Woolen Jacket" , category : "Wool Gift"},
    {name : "Family Threads" , category : "Home Decor Gift"},
    {name : "Plant Straw" , category : "Wool Gift"},

];


let form = document.getElementById('searchForm').addEventListener('submit' , function (e){
    e.preventDefault();
     
    let searchResultsDiv = document.getElementById('searchResults');
    let searchQuery = document.getElementById('search').value.trim().toLowerCase();
    let selectedCategory = document.getElementById('category').value;

    let filteredProducts = products.filter(products=>{
        let matchesCategory = 
             selectedCategory === "All Categories" || products.category === selectedCategory;
             let matchesQuery = products.name.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesQuery;
    });


    // if (filteredProducts.length > 0){
    //     // let resultsHTML = filteredProducts.map(product => `<li>${product.name} (${product.category})</li>`).join('');
    //     // searchResultsDiv.innerHTML = `<ul>${resultsHTML}</ul>`;
    // }else{
    //     alert("No products found");
        
    // }

if (filteredProducts.length > 0) {
    window.location.href = `product.html`;
} else {
    alert("No products found");
}

})


