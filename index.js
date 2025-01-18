// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const user = auth.currentUser;

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



// Event listener to track the auth state (when user signs in or out)
auth.onAuthStateChanged(async (user) => {
  console.log("Auth state changed:", user);

  if (user) {
    console.log("User ID:", user.uid);
    // Fetch user name and display it
    await fetchAndDisplayUserName(user.uid);
  } else {
    console.log("No user signed in.");
    // You can also clear the welcome message or do any other necessary actions
    document.getElementById("welcome-message").textContent = "Please log in to see your profile.";
  }
});

// Initialize Firebase Authentication
auth.onAuthStateChanged((user) => {
    console.log("Auth state changed:", user);
    if (user) {
      console.log("User ID:", user.uid);
      fetchAndDisplayUserName(user.uid);
  
    } else {
      console.log("No user signed in.");
    }
  });
  
      ////////// Function to fetch and display the user's name dynamically//////////
      async function fetchAndDisplayUserName(uid) {
          try {
      // Reference the user document in the "users" collection
      const userDocRef = doc(db, "users", uid);
  
      // Fetch the document data
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        // Retrieve and display the user's first name
        const userName = userDoc.data().firstName;
        document.getElementById("welcome-message").textContent = `${userName}!`;
      } else {
        console.error("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
      }

