# Mini Project – Node.js

## Q10: Event Registration Saved in `registrations.json`

**Name:** Sahil Ghone
**Roll No.:** 150096725002
**Group:** 10
**Subject:** Mini Project – Node.js

---

## 1. Project Overview

This project implements an **Event Registration API using Node.js and Express.js**.

Students can register for college events through an API. The registration details are permanently stored in a `registrations.json` file using Node.js `fs` module.

The system also prevents the same email from registering for the **same event more than once**, while allowing the same email to register for different events.

---

## 2. Technologies Used

* Node.js
* Express.js
* JavaScript
* File System (`fs`) module
* Path (`path`) module
* JSON
* Postman / Thunder Client

---

## 3. Project Structure

```text
q10-event-registration/
│
├── index.js
├── registrations.json
├── package.json
├── package-lock.json
│
└── screenshots/
    ├── 01-post-success.png
    ├── 02-get-registrations.png
    ├── 03-duplicate-409.png
    ├── 04-different-event.png
    ├── 05-registrations-json.png
    └── 06-restart-persistence.png
```

> `node_modules` should not be uploaded to GitHub.

---

## 4. Features

* Express JSON middleware using `express.json()`
* Student event registration
* Permanent storage in `registrations.json`
* Unique numeric registration ID
* Validation of required fields
* Duplicate registration prevention
* Same email can register for different events
* GET API to retrieve all registrations
* Registration count included in GET response
* Data remains available after restarting the server

---

## 5. API Endpoints

### POST `/registrations`

**URL:**

```text
http://localhost:5000/registrations
```

**Request Body:**

```json
{
  "participantName": "Priya",
  "email": "priya@gmail.com",
  "eventName": "Code Sprint"
}
```

**Successful Response:**

**Status: 201 Created**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "Code Sprint"
  }
}
```

---

### GET `/registrations`

**URL:**

```text
http://localhost:5000/registrations
```

This endpoint returns all registered participants along with the total registration count.

Example:

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "participantName": "Priya",
      "email": "priya@gmail.com",
      "eventName": "Code Sprint"
    }
  ]
}
```

---

## 6. Duplicate Registration

If the same email tries to register for the same event again, the API returns:

**Status: 409 Conflict**

```json
{
  "success": false,
  "message": "Already registered for this event"
}
```

The existing registration is not deleted or overwritten.

---

## 7. Same Email for Different Event

The same email can register for another event.

Example:

```json
{
  "participantName": "Priya",
  "email": "priya@gmail.com",
  "eventName": "AI Challenge"
}
```

This registration is accepted with:

```text
201 Created
```

---

## 8. Installation

Open the project folder in the terminal:

```bash
cd q10-event-registration
```

Install dependencies:

```bash
npm install
```

---

## 9. Running the Project

Start the server using:

```bash
npm start
```

or:

```bash
node index.js
```

The server runs on:

```text
http://localhost:5000
```

---

## 10. Testing

The following tests were performed using Postman / Thunder Client:

1. Successfully registered three participants.
2. Retrieved all registrations using GET.
3. Tested duplicate email + same event and received `409 Conflict`.
4. Tested same email + different event and received `201 Created`.
5. Restarted the server and verified that previous registrations remained available.

---

## 11. Screenshots

<img width="1470" height="838" alt="Screenshot 2026-09-24 at 11 21 58 AM" src="https://github.com/user-attachments/assets/53811bee-4351-4454-9304-14d1b79d21d7" />
<img width="1470" height="838" alt="Screenshot 2026-09-24 at 11 21 43 AM" src="https://github.com/user-attachments/assets/e111b240-1b7c-4fb2-84e1-51f730c0784b" />
<img width="1470" height="838" alt="Screenshot 2026-09-24 at 11 21 07 AM" src="https://github.com/user-attachments/assets/ba408b70-0144-4a7f-b754-aa3bf9839afe" />
<img width="1470" height="588" alt="Screenshot 2026-09-24 at 11 20 16 AM" src="https://github.com/user-attachments/assets/9b49a818-4ab8-4f9f-80d0-76cf41abc952" />
<img width="1470" height="588" alt="Screenshot 2026-09-24 at 11 14 45 AM" src="https://github.com/user-attachments/assets/87ffd881-99b7-450e-871b-5ce120cb8513" />


## 12. Conclusion

The project successfully implements an event registration system using **Node.js, Express.js, and JSON file storage**. It validates registration details, prevents duplicate registrations for the same event, supports multiple events for the same email, and maintains registration data permanently in `registrations.json`.

---

**Submitted By:**
**Sahil Ghone**
**Roll No.: 150096725002**
**Group 10**
**Mini Project – Node.js**
