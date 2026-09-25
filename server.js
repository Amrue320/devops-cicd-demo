const http = require("http");

const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "Version 1";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>DevOps CI/CD Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding-top: 100px;
            background: #f4f6f8;
        }
        .container {
            background: white;
            padding: 40px;
            margin: auto;
            width: 500px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        h1 { color: #222; }
        .version {
            font-size: 24px;
            font-weight: bold;
            margin: 20px;
            color: #2563eb;
        }
        .status {
            color: green;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>DevOps CI/CD Demo</h1>
        <div class="version">${VERSION}</div>
        <p class="status">Application is running successfully</p>
        <p>GitHub → Jenkins → Docker → Kubernetes</p>
        <p>Rolling Deployment & Rollback Enabled</p>
    </div>
</body>
</html>
    `);
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Application running on port ${PORT}`);
    console.log(`Application version: ${VERSION}`);
});
