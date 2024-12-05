// Function to get a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Return null if the cookie is not found
  }
  
  // Access the 'user' cookie
  
  

(async function(){
    const token = localStorage.getItem('token')
    await fetch('http://127.0.01:8000/token',{
        method:'GET',
   
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        credentials: "include",
    }).then(function(res) {
        console.log(document.getCookie); // Should log 'JohnDoe' if the cookie exists
        return res.json()
    }).then(function(res) {
        console.log(res)
    }).catch(function(err) {
        console.log(err)
    }) 
})();

