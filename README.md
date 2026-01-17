# wevolve-ps3-strivers
A responsive React-based job search platform that helps job seekers find relevant opportunities fast with sophisticated search, intelligent filters, and customized job match scores.


AI Job Description Generator - Full Stack Application
A complete, professional-grade web application for generating AI-powered job descriptions with a modern React frontend and Express/Node.js backend.

🌟 Overview
This full-stack application combines a sleek, modern React frontend with a robust Node.js/Express backend to create an intuitive platform for generating, managing, and exporting professional job descriptions.


🚀 Features

Frontend (React)

Multi-step Form Wizard - Guided 4-step process for job description creation
Modern UI/UX - Clean, rounded-edge design with gradient accents
Real-time Preview - Live preview with editing capabilities
Draft Management - Search, filter, and manage saved drafts
Responsive Design - Fully responsive across all devices
Local Storage - Automatic form state persistence
PDF Export - Download job descriptions as PDF files
Clipboard Copy - One-click copy to clipboard

Backend (Node.js/Express)

RESTful API - Complete CRUD operations for job descriptions
MySQL Database - Persistent storage with JSON support
PDF Generation - Server-side PDF creation with PDFKit
Template Engine - Three distinct JD templates (Corporate, Startup, Technical)
ATS Optimization - Applicant Tracking System-friendly formatting
Skill Mapping - Automatic skill-to-responsibility mapping
Error Handling - Comprehensive error management


Tech Stack

Frontend

React 18 - Component-based UI library
CSS3 - Custom styling with CSS modules
Local Storage - Client-side data persistence
Fetch API - HTTP requests to backend

Backend

Node.js - JavaScript runtime
Express.js - Web framework
MySQL - Relational database
PDFKit - PDF generation library
mysql2 - MySQL client for Node.js
dotenv - Environment configuration



API Endpoints
Job Description Generation
POST /api/job/generate - Generate a job description with template selection

POST /api/job/save - Save final job description to database

POST /api/job/download-pdf - Download job description as PDF

Draft Management
POST /api/job/save-draft - Save a job description draft

GET /api/job/drafts - Get all saved drafts

GET /api/job/drafts/:id - Get single draft by ID

DELETE /api/job/drafts/:id - Delete a draft

Utility
GET /api/job/all - Get all saved job descriptions


Setup Instructions

Prerequisites

Node.js (v14 or higher)
MySQL database
npm or yarn package manager

1. Clone and Install Dependencies
        '''bash
        git clone [<repository-url>](https://github.com/rehan1419/wevolve-ps8-strivers.git)
        cd backend
        npm install

2. Database Setup
    Create a MySQL database and run the following SQL to create the required table:
        '''CREATE DATABASE job_description_db;

        USE job_description_db;

        CREATE TABLE job_descriptions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        job_title VARCHAR(255) NOT NULL,
        industry VARCHAR(255),
        experience_level ENUM('Entry', 'Mid', 'Senior'),
        skills JSON,
        culture TEXT,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );'''

3. Environment Configuration
    Create a .env file in the root directory:
        DB_HOST=localhost
        DB_USER=your_mysql_username
        DB_PASSWORD=your_mysql_password
        DB_NAME=job_description_db
        PORT=5000

        '''bash
            npm install mysql2 dotenv
            npm list mysql2  #To check mysql 

4. Start the Server
    '''bash
    npm run dev

    The server will run on http://localhost:5000

5. Frontend Setup
    # Navigate to frontend directory
    cd ../frontend

    # Install dependencies
    npm install

    # Start the development server
    npm run dev
    # Application runs on http://localhost:3000



Dependencies

    Core Dependencies

        express - Web server framework
        mysql2 - MySQL database driver
        pdfkit - PDF generation library
        dotenv - Environment variable management
        cors - Cross-origin resource sharing

    Development Dependencies

        nodemon - Automatic server restart during development


Contributing
    1.Fork the repository
    2.Create a feature branch (git checkout -b feature/amazing-feature)
    3.Commit changes (git commit -m 'Add amazing feature')
    4.Push to branch (git push origin feature/amazing-feature)
    5.Open a Pull Reques