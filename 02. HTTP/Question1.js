const http = require("http");
const url = require('url');
const port = 5000;


const generateRandomNumber = () => Math.floor(Math.random() * (high - low) + low);

http.createServer(function(request, response) {
    console.log('New client request:2 ' + request.url);

  const parsedUrl = url.parse(request.url, true);
  const params = parsedUrl.query;
  const isFahrenheit = String(params["unit"]).toLowerCase() === "f";
  const isXML = request.headers["content-type"] === "application/xml";
  let responseData;

  response.writeHead(200, {'Content-Type': isXML ? 'application/xml' : 'application/json'});
  switch(parsedUrl.pathname) {
    case '/temperature':
      responseData = {"temperature": `${generateRandomNumber(1, isFahrenheit ? 104 : 40)}`, "unit": isFahrenheit ? "F" : "C"};
      break;
    case '/light':
      responseData = {"light": generateRandomNumber(1, 100)};
      break;
    default:
      responseData = {"hello": "world"};
  }

  if (isXML) {
    const keys = Object.keys(responseData);
    const values = Object.values(responseData);
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
  response.end(JSON.stringify(responseData));
}).listen(port);
console.log('Server is now listening on http://localhost:' + port);