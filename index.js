const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const FILE_PATH = path.join(__dirname, 'registrations.json');


app.use(express.json());


const readRegistrationsFromFile = (callback) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
     
      if (err.code === 'ENOENT') {
        return callback(null, []);
      }
      return callback(err, null);
    }
    try {
      const registrations = data ? JSON.parse(data) : [];
      callback(null, registrations);
    } catch (parseErr) {
      callback(parseErr, null);
    }
  });
};


const writeRegistrationsToFile = (registrations, callback) => {
  const jsonData = JSON.stringify(registrations, null, 2);
  fs.writeFile(FILE_PATH, jsonData, 'utf8', (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};


app.post('/registrations', (req, res) => {
  const { participantName, email, eventName } = req.body;

 
  if (!participantName || !email || !eventName ||
      typeof participantName !== 'string' ||
      typeof email !== 'string' ||
      typeof eventName !== 'string' ||
      !participantName.trim() ||
      !email.trim() ||
      !eventName.trim()) {
    return res.status(400).json({
      success: false,
      message: "All fields (participantName, email, eventName) are required"
    });
  }

  const cleanName = participantName.trim();
  const cleanEmail = email.trim();
  const cleanEvent = eventName.trim();

 
  readRegistrationsFromFile((err, registrations) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to read registrations file"
      });
    }

    const isDuplicate = registrations.some(
      (reg) =>
        reg.email.toLowerCase() === cleanEmail.toLowerCase() &&
        reg.eventName.toLowerCase() === cleanEvent.toLowerCase()
    );

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: "Already registered for this event"
      });
    }

  
    const newId = registrations.length > 0
      ? Math.max(...registrations.map((r) => r.id || 0)) + 1
      : 1;

    const newRegistration = {
      id: newId,
      participantName: cleanName,
      email: cleanEmail,
      eventName: cleanEvent
    };

    registrations.push(newRegistration);

  
    writeRegistrationsToFile(registrations, (writeErr) => {
      if (writeErr) {
        return res.status(500).json({
          success: false,
          message: "Failed to save registration"
        });
      }

      
      return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: newRegistration
      });
    });
  });
});

app.get('/registrations', (req, res) => {
  readRegistrationsFromFile((err, registrations) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to read registrations file"
      });
    }

    
    return res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  });
});


app.get('/', (req, res) => {
  res.json({
    message: "Welcome to College Tech Fest Event Registration API",
    endpoints: {
      "POST /registrations": "Register a student for an event",
      "GET /registrations": "Fetch all registrations and count"
    }
  });
});

const HOST = process.env.HOST || '127.0.0.1';


app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
