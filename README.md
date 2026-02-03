# Tiny Thinkers

**Hope Hacks** is a web application dedicated to improving community well-being through technology. The name represents our core focus areas:

- **H – Health**  
- **O – Oppression**  
- **P – Pollution / Planet Wellness**  
- **E – Education**  

Our project specifically focuses on **Education**, aiming to reduce educational inequity in Charlotte-Mecklenburg Schools by providing free, accessible tutoring support to students impacted by limited resources and ZIP-code disparities.

---

## Table of Contents

- [Mission Statement](#mission-statement)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [APIs](#apis)  
- [Usage](#usage)  
- [Deployment](#deployment)  

---

## Mission Statement

Our mission is to provide early learners with the tools and resources they need to build strong literacy foundations. Using technology, we aim to make learning accessible, interactive, and engaging for students who face barriers due to limited resources or educational disparities.  

The application offers:  
- Spelling, vocabulary, and letter recognition exercises  
- Custom dashboards for parents to guide student learning  

---

## Features

- **User Authentication**: Signup/login system for parents to create and manage dashboards  
- **Session Management**: Uses **JSON Web Tokens (JWT)** to create session cookies, allowing users to access pages only if they have an account and saving their login state when navigating between pages  
- **Custom Dashboard**: Displays learning materials tailored to the student’s selected preferences  
- **1st Party API**: Internal API to filter and organize educational content (letters, numbers, quizzes)  
- **3rd Party API Integration**:  
  - **Merriam-Webster Dictionary API**: Generates vocabulary cards, reading practices, and audio pronunciations using **elementary and intermediate learner dictionaries**  
- **Template Rendering**: Uses **Handlebars** to dynamically render content on the frontend  
- **Database CRUD Operations**: Stores user information, learning progress, and generated quizzes  
- **Responsive Web Interface**: Built with HTML, CSS, and JavaScript for an intuitive user experience  

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Handlebars  
- **Backend**: Node.js, Express.js, JSON Web Tokens (JWT) for session management  
- **Database**: MySQL  
- **APIs**:  
  - **1st Party**: Educational material filtering and quiz generation  
  - **3rd Party**: Merriam-Webster Dictionary API (elementary and intermediate dictionaries)  
- **Hosting & Deployment**: AWS Amplify and Railway  
- **Version Control**: Git & GitHub  

---

## APIs

### 1st Party API
- Handles internal logic to filter educational content based on student age, grade, and skill level  
- Generates quizzes, spelling challenges, and lesson plans  

### 3rd Party APIs
- **Merriam-Webster Dictionary API**: Supplies vocabulary cards and audio pronunciations for **elementary and intermediate learners**  
  [Merriam-Webster API Info](https://dictionaryapi.com/products/index)  

---

## Usage

- Visit the application in your browser via the hosted URL  
- Signup or login as a parent to create a dashboard  
- Select the student’s grade and learning preferences  
- Access customized quizzes, vocabulary cards, and educational activities  
- Generate new activities dynamically using our internal API and integrated dictionary APIs  
- Login sessions are preserved with JWT, allowing smooth navigation across different pages  

---

## Deployment

- The application is deployed and hosted using **AWS Amplify** and **Railway**  
- Ensure all API keys are properly configured in Amplify or Railway environment variables  
- Database connection is active for all CRUD operations  

### Hosted Site
[Visit Tiny Thinkers Live](--link soon--)  

### For older systems
**Chrome Glitch:**  
1. Open Chrome settings → System  
2. Turn off **Use hardware acceleration when available**  
3. Restart Chrome for changes to take effect  
