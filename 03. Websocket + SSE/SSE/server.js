import { createServer } from "http";

createServer((req,res) => {
res.writeHead(200, {
    "Content-Type":"text/event-stream",
    "Cache-Control":"no-cache", 
    "Connection":"keep-alive", 
    "Access-Control-Allow-Origin": "*"
});

const interval = setInterval(async () => {
    const response = await fetch('http://devices.webofthings.io/pi/sensors/temperature/', {
        headers:{
          accept: 'application/json',
        }
      });

    const json = await response.json()

    res.write("data: " + json.value + "\n\n");
    }, 2000);
}).listen(3000);



function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

console.log('Server is ready');
