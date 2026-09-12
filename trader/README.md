# Provider
1. Finnhub
2. Twelve Data
3. Financial Modeling Prep
4. Polygon.io
5. Alpha Vantage


# 📈 Trader Pro

A modern full-stack trading platform built with **Next.js**, **TypeScript**, **Prisma**, and **MySQL**. The project focuses on secure authentication, session management, and a scalable architecture for future trading features.

> **Status:** 🚧 Under Active Development

---

## ✨ Overview

Trader Pro is a personal learning project that aims to recreate the architecture of a real-world trading platform. Instead of only focusing on the UI, the project is designed with production-ready backend practices such as JWT authentication, refresh token rotation, secure session management, and role-based access control.

The long-term goal is to build a complete trading platform with portfolio management, watchlists, market data, charts, and order execution.

---

## 🚀 Features

### Authentication

- User Registration
- Secure Login
- Email Verification
- Forgot Password
- Password Reset via Email
- Change Password
- JWT Authentication
- Access & Refresh Tokens
- Refresh Token Rotation
- Secure HTTP-Only Cookies

### Session Management

- Multiple Device Login
- Active Sessions
- Logout Current Session
- Logout Other Devices
- Session Revocation
- Secure Refresh Token Storage

### User Profile

- Edit Profile
- Upload Profile Picture
- Remove Profile Picture
- Cloudinary Image Storage
- Profile Header
- Security Dashboard

### Security

- Password Hashing using bcrypt
- JWT using jose
- Protected API Routes
- Route Authorization
- Secure Cookie Handling

---

## 🛠 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Next.js Route Handlers
- Prisma ORM
- MySQL

### Authentication

- JWT
- bcrypt
- jose

### Storage

- Cloudinary

---

## 📂 Project Structure

```text
app/
├── api/
├── (auth)/
├── (dashboard)/
├── componentS/
├── lib/
├── middleware.ts

prisma/
public/
```

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/your-username/trader-pro.git
```

Go to the project

```bash
cd trader-pro
```

Install dependencies

```bash
npm install
```

Create an environment file

```env
DATABASE_URL=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Generate Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate dev
```

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## Screenshots

Screenshots will be added as the project grows.

---

## Roadmap

### Completed

- Authentication System
- Session Management
- Profile Management
- Avatar Upload
- Password Recovery
- Email Verification
- Security Dashboard

### In Progress

- Trading Dashboard
- Watchlist
- Portfolio
- Charts

### Planned

- Market Data
- Paper Trading
- Order Management
- Portfolio Analytics
- Trading History
- Notifications
- Two-Factor Authentication

---

## Why I Built This

The main objective of Trader Pro is to learn how production-grade web applications are designed and implemented. Rather than copying tutorials, I'm building each feature from scratch to understand authentication, security, backend architecture, and scalable application design.

---

## License

This project is developed for learning and portfolio purposes.

---

## Author

**Sayan Basani**

GitHub: https://github.com/SayanBasani