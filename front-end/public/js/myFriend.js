// Home Page - URL http://localhost:3000


// friendFunction(_id) -> This function display the chat section with the friend called by myFriend(_id) function with argument friend _id

async function friendFunction(_id) {

    document.getElementById('chat').innerHTML = `
        <div id="messages">
            <ul>

            </ul>
        </div>
        <form name="socket" class="chat-forms" onsubmit="handleSubmit(event)" action="">
            <input class="chat-input" type="text" name="message" placeholder="Message" autofocus>
            <button class="send-chat" type="submit">Send</button>
        </form>
    `
}


// This function is for display all the friend of Main User 
// myFriend() -> http://127.0.0.1:8000/my-friend
//  -> This API is called to get the list of friend of Main User with GET method


async function myFriend() {
    const token = localStorage.getItem('token')
    await fetch('http://127.0.0.1:8000/my-friend',{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
    })
    .then(function(res) {
        return res.json()
    })
    .then(function(res) {
        // This is the styling to display the list of function with profile image, friends name, last message & time
        const list = document.getElementById("my-friends")
        // forEach() This iterate the list of friend and display in the Page Home Page
        res.forEach((data)=> {
        let li = document.createElement("span")
        // List on click call the friendFunction() to get into Chat with friend by passing _id of friend as argument
            li.innerHTML = `
            <li onclick=friendFunction('${data._id}') class="frnd-class">
                <img class="frnd-profile-img" src="" alt="">
                <span class="frnd-name">${data.username}</span>
                <span class="recent-msg-time">time</span>
                <span class="frnd-recent-msg">frnd-recent-msg</span>
            </li>
            `
            list.appendChild(li)
        });
    })
    .catch((err) => {
        console.log(err)
    })
}
