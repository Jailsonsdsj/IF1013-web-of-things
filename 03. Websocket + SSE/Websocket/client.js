const connection = new WebSocket('ws://localhost:8080/home');
connection.onopen = () => {
    console.log('Connection enabled');
    connection.send('Hello, World!');
}
connection.onclose = () => {
    console.log('Connection finished');
}
connection.onmessage = function(e){
    const server_message = e.data;
    console.log(server_message);
    document.getElementById("result").innerHTML += server_message + "<br>";
}

function sendMessage() {
    const message = document.getElementById("text").value;
    connection.send(message);
    document.getElementById("text").value = "";
}