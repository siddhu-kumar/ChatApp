async function registerUser(e) {
    e.preventDefault()
    console.log('register')
    const form = document.getElementById('myForm')
    const formData = new FormData(form)
    const data = {}
    formData.forEach((value,key)=> {
        data[key]=value
    })
    console.log(data)
    await fetch('http://127.0.0.1:8000/register-user',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(function(response) {
        const responses = response.json()
        return responses
    })
    .then(function(response) {
        console.log(response)
        console.log(localStorage.getItem("token"))
        localStorage.setItem('token',response)
        console.log("hello")
    })
    .catch(function(err) {
        console.log(err)
    })
    location.replace('/all-user')
}
