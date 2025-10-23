# JobPush – Your Smart Job Companion

JobPush is a **full-stack MVP mobile application** designed to make job searching simpler, smarter, and more organized.  
It helps users centralize job offers, receive personalized reminders, and access helpful career tips, acting as a real companion throughout the job search process.

---

## 🧭 Overview

This MVP was developed in **14 days (including 10 days of development)** as the final project for **La Capsule Bootcamp**, by a **team of three developers**.  
The project followed an **Agile, sprint-based workflow** including:  
- User Stories, Wireframes, UI/UX Design, and Mockups  
- Frontend and Backend development  
- Testing, debugging, and deployment  
- Final demo and oral presentation  

The goal was to deliver a functional prototype meeting the **RNCP certification requirements** (frontend, backend, database, and deployment).  
Although still a prototype, JobPush demonstrates the complete product lifecycle — from ideation to a working application.

---

## ✨ Main Features

- 🔎 Job search and filtering via the **Pôle Emploi API**  
- ❤️ Save and manage favorite offers  
- 🔔 Personalized notifications and reminders  
- 📘 “Tips & Guides” section with categorized career advice  
- 👤 User authentication, registration, and profile management  
- 🗒️ Notes and tracking for each application  
- 📧 Automatic email notifications (daily summaries, updates)

---

## 🧰 Tech Stack

### **Frontend**
React Native (Expo), Redux Toolkit, React Navigation

### **Backend**
Node.js, Express.js, MongoDB (Mongoose), Nodemailer (for email automation), REST API integration (Pôle Emploi)

### **Tools & Deployment**
Expo Go (mobile testing), Vercel (backend deployment), Postman (API testing)

---

## ⚙️ Backend Installation

```bash
git clone https://github.com/<your-org>/JobPush-BE.git
cd JobPush-BE
npm install
```

### Configuration

Create a `.env` file at the project root with:

```ini
CONNECTION_STRING="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/Jobpush"
MAIL_USER='your.email@gmail.com'
MAIL_PASS='your_gmail_app_password'
```

> **Tip:** For Gmail, generate an [application password](https://myaccount.google.com/apppasswords) if two-factor authentication is enabled.

---

## ⚙️ Frontend Installation

```bash
cd ../JobPush-FE
npm install
```

Create a `.env` file at the project root with:

```ini
EXPO_PUBLIC_BACKEND_URL=http://<your_local_ip>:3000
```

Then run:

```bash
expo start
```

---

## 🎥 Demo

Watch the MVP presentation (in French):  
📹 [https://drive.google.com/file/d/1Qq3N5uktRqbGA12PLgpPjRvbukw4mB5S/view?usp=sharing](https://drive.google.com/file/d/1Qq3N5uktRqbGA12PLgpPjRvbukw4mB5S/view?usp=sharing)

This video showcases the final presentation of the project after two weeks of design, coding, and testing at La Capsule.

---

## 👥 Credits

Developed by:

- **[Tiago Gameiro](https://github.com/GTDev2K)**   
- **[Aïle <Nom>](https://github.com/Ethna44)** 
- **[<Prénom Nom>](https://github.com/<pseudo>)**

Project created as part of **[La Capsule Bootcamp](https://www.lacapsule.academy/)** (2025).

