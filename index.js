    const http = require('http');
    const fs = require('fs');
    const requests = require('requests');

    const homeFile = fs.readFileSync('home.html', 'utf-8');

    const replaceVal = (tempVal, orgVal) => {
        let temperature = tempVal.replace('{%tempval%}', orgVal.main.temp);
        temperature = temperature.replace('{%tempmin%}', orgVal.main.temp_min);
        temperature = temperature.replace('{%tempmax%}', orgVal.main.temp_max);
        temperature = temperature.replace('{%location%}', orgVal.name);
        temperature = temperature.replace('{%country%}', orgVal.sys.country);
        temperature = temperature.replace('{%tempstatus%}', orgVal.weather[0].main);
        
        return temperature;
    };

    const server = http.createServer((req, res) => {
        if (req.url ==   '/') {
            requests('https://api.openweathermap.org/data/2.5/weather?q=Shimla&appid=b07720ce80f388d0a34c37eb6621ddaf' )
                .on('data', (chunk) => {
                    const data = JSON.parse(chunk);
                    const arrData = [data];
                    const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join('');
                    res.write(realTimeData);
                })
                .on('end', (err) => {
                    if (err) return console.log('connection closed due to error', err);
                    res.end();
                });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not Found');
        }
    });

    server.listen(8000, '127.0.0.1', () => {
        console.log('Server running at http://127.0.0.1:8000/');
    });
