const http = require("http");
const fs = require("fs");

const port = 5000;

http.createServer((req, res) => {
    console.log(req.url)
    if(req.url === "/") {
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.end(`<html>
                    <head><title>Home Page</title></head>
                    <body>
                        <h1>Hello World!!</h1>
                        <h2>Node Application with Http Module!!</h2>
                    </body>
                    </html>`)
    }

    else if(req.url === "/Home")
    {
        res.writeHead(200, {"Content-Type" : "application/json"})
        res.end(JSON.stringify({
            data: "Welcome Home Page"
        }))
    }

    // Send the image to client using http module
    else if("./favicon.ico"){
        const image = fs.readFileSync("./assets/web.png")
        res.writeHead(200, {
            "Content-Type" : "image/png",
            "Content-Length" : image.length,
        });
        // Send the body of the response
        res.end(image);
    }

    else{
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.end(`<html>
                    <head><title>404 Not Found</title></head>
                    <body>
                        <h1>404 Not Found</h1>
                    </body>
                    </html>`)
    }

}).listen(port, () => {
    console.log(`Server started on http://localhost/${port}`);
});