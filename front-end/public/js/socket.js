const socket = io('http://127.0.0.1:8000')

async function handleSubmit(e) {
    e.preventDefault()
    const message = document.forms["socket"]["message"].value;
    document.forms["socket"]["message"].value = ""
    document.getElementById("messages").innerHTML += `<li class="user">${message}</li>`
    try {
        socket.emit('messageFromClientToServer', message,(err,response)=>{
            if(err) {
                console.log(err)
            } else {
                console.log(response)
            }
        })
    } catch(err) {
        console.log(err)
    }
}

socket.on('messageFromServerToClient', (message, callback) => {
    console.log(message);
    callback({ status: 'ok-client' })
    document.getElementById("messages").innerHTML += `<li class="client">${message}</li>`
})