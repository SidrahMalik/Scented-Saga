const http = require("http");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const server = http.createServer((request, response) => {
    // Allow requests from any origin
    response.setHeader("Access-Control-Allow-Origin", "*");
    // Allow specific methods
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // Allow specific headers
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
        // Respond to preflight requests
        response.writeHead(200);
        response.end();
        return;
    }

    const code = randomstring.generate(6);
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 465,
        auth: {
            user: "f219179@cfd.nu.edu.pk",
            pass: "onmj etbx oyqo kuhv"
        },
        tls: {
            rejectUnauthorized: false
        }
        
    });

    const receiver = {
        from: "f219179@cfd.nu.edu.pk",
        to: "sidramalik000000@gmail.com",
        subject: "Email Verification!",
        text: `Your Verification Code: ${code}`
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if (error) {
            console.error("Error sending email:", error);
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ success: false, error: error.message }));
        } else {
            console.log("Email sent successfully!");
            
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ success: true }));
        }
    });
});

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});