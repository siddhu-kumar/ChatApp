async function add_friend(e,_id) {
    e.preventDefault()
    console.log('working')
    console.log(_id)
    await fetch('/add-friend',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({id:_id})
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        console.log(typeof(JSON.stringify(myJson)))
    })
}

async function main() {
    await fetch('/all-users',{
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        },
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        let list = document.getElementById('all-user')
        myJson.forEach(element => {
            let li = document.createElement("span") 
            li.innerHTML = `
                <div class="each-user">
                <span>${element.username}</span>
                <span>${element.contact}</span>
                <button type="submit" onclick="add_friend(event,'${element._id}')">+</button>
                </div>`
            list.appendChild(li)
            
        });
        console.log(myJson)
    })
}
main()