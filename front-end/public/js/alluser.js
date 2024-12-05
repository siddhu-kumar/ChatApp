async function add_friend(e, _id) {
    e.preventDefault()
    console.log('working')
    const token = localStorage.getItem('token')
    console.log(_id)
    await fetch('http://127.0.0.1:8000/add-friend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: _id })
    })
        .then(function (response) {
            return response
        })
        .then(function (myJson) {
            console.log(myJson)
        })
        .finally(function () {
            console.log('finnaly')
            location.replace('/')
        })
        .catch(function (err) {
            console.log(err)
        })
}

async function main() {
    const token = localStorage.getItem('token')
    await fetch('http://127.0.0.1:8000/all-users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(function (response) {
            return response.json()
        })
        .then(function (myJson) {
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
        .catch(function (err) {
            console.log(err)
        })
}

main()