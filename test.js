const http = require("http");

const PORT = 3000;

console.log("Running application test...");

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Test successful");
});

server.listen(PORT, () => {
    console.log("Test server started successfully.");

    server.close(() => {
        console.log("Application test PASSED.");
        process.exit(0);
    });
});

server.on("error", (error) => {
    console.error("Application test FAILED:", error.message);
    process.exit(1);
});
