const source = new EventSource("http://localhost:3000");
source.onmessage = function (e) {
    document.getElementById("panel").innerHTML = "<h1>Current temperature: " +
        e.data + "</h1>";
};