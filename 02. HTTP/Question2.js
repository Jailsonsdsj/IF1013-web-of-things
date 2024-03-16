const http = require("http");
const url = require('url');
const port = 5000;

const generateRandomNumber = () => Math.floor(Math.random() * (high - low) + low);

http.createServer(function(request, response) {
  console.log('New client request:2 ' + request.url);

  const externalRequest = {
    host: 'devices.webofthings.io',
    path: '/pi/sensors/temperature/',
    headers: { 'Accept': 'application/json' },
    method: 'GET'
  };

  http.request(externalRequest, (externalResponse) => {
    let data = ''

    externalResponse.on('data', (chunk) => { data += chunk; });

    externalResponse.on('end', () => {
      const temperatureData = JSON.parse(data);
      const requestedUrl = url.parse(request.url, true);
      const isFahrenheit = temperatureData["unit"].toLowerCase() === "f";
      const isXML = request.headers["content-type"] === "application/xml";
      let responseContent;

      response.writeHead(200, {'Content-Type': isXML ? 'application/xml' : 'application/json'});
      switch(requestedUrl.pathname) {
        case '/temperature':
          responseContent = {"temperature": `${temperatureData["value"]}`, "unit": isFahrenheit ? "F" : "C"};
          break;
        case '/light':
          responseContent = {"light": generateRandomNumber(1, 100)};
          break;
        default:
          responseContent = {"hello": "world"};
      }

      if (isXML) {
        const keys = Object.keys(responseContent);
        const values = Object.values(responseContent);
        const xmlResponse = `
          <?xml version="1.0" encoding="utf-8"?>
          <Response>
              <ResponseCode>200</ResponseCode>
              <ResponseMessage>Success</ResponseMessage>
          </Response>
      
          ${keys.map((key, index) => {
              return `
                <${key}>
                    <value>${values[index]}</value>
                </${key}>
            `;
            }).join('')}
        `;
        return response.end(xmlResponse);
      }
      response.end(JSON.stringify(responseContent));
    });
  }).end();
}).listen(port);
console.log('Server is now listening on http://localhost:' + port);