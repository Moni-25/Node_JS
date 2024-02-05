const http = require("http");

const port = 5000;
http.createServer((req, res) =>{
    /*
        if you need to send response like html means you
        need to change header "Content-Type": "text/html"
    */
    // res.writeHead(200, {"Content-Type": "application/json"});
    res.writeHead(200, {"Content-Type": "text/html"});
    
    /*
        write - used to send response we can done by either write or end
      end - it is used to end the connection if you need to send data like object
            like below you can send or send like text or `<html></html>`
    */
    // res.end(
    //     JSON.stringify({
    //         data: "Hello World"
    //     })
    // )

    /* 
        You can give both write and end
    */

    // res.write(`<html>
    //             <body>
    //                 <h1>Hello World</h1>
    //             </body>
    //             </html>`)
    // res.end();

    res.end(`<html>
                <body>
                    <h1>Hello World</h1>
                </body>
                </html>`)
})
// .listen(5000);
.listen(port, () =>{
    console.log(`Server started on http://localhost/${port}`)
});

// whenever you change the stop just stop the server after run you will get output