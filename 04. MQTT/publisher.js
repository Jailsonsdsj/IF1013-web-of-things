import { connect } from 'mqtt';
import { get } from "http";

const client = connect('mqtt://broker.hivemq.com')

/**
 * Represents the interval for sending data.
 * @type {number}
 */
const interval = setInterval(() => {
    sendData()
    },2000)


client.on('message', () => {
console.log('message')
})

/**
 * Sends data by publishing temperature data to a specific topic.
 */
function sendData()
{
console.log('publishing')
    get('http://devices.webofthings.io/pi/sensors/temperature/', {headers: { 'Accept': 'application/json' }}, (response) => {
    let dataResponse = '';

    response.on('data', (chunk) => {
        dataResponse += chunk;
    });

    response.on('end', () => {
        const temperatureData = JSON.parse(data)
        console.log(temperatureData)
        client.publish('sensores/voltagem',("Temperature:" + temperatureData.value).toString())

    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

console.log('published')
}

/**
 * Generates a random integer between the specified range.
 *
 * @param {number} low - The lower bound of the range (inclusive).
 * @param {number} high - The upper bound of the range (exclusive).
 * @returns {number} The random integer generated.
 */
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
