# React + Vite Portfolio with AI Chatbot

This project is a portfolio website built using React and Vite, designed to deliver a fast and modern user experience. It includes an integrated AI chatbot that answers user queries based on portfolio data.

---

## Features

- Fast development and build performance using Vite  
- Responsive and clean portfolio UI  
- Context-aware AI chatbot integration  
- Backend API using Node.js  
- Secure LLM API integration  
- Optimized for quick and relevant responses  

---

## AI Chatbot Overview

The project includes a context-aware chatbot that responds to user queries using predefined portfolio data.

### How it works

- Loads structured data from a local JSON file  
- Applies a similarity scoring mechanism to identify relevant content  
- Selects top matching data chunks  
- Sends context to an LLM API for response generation  
- Returns short, human-like answers  

### Key Characteristics

- Context-restricted responses to avoid hallucination  
- Lightweight backend logic  
- Fast response generation  
- Simple and clear conversational output  

---

## Tech Stack

- React  
- Vite  
- Node.js (serverless API)  
- LLM API (Groq / OpenRouter)  

---

## Project Structure
/src Frontend React components

/api Backend API (Node.js)

/chunks.json Knowledge base for chatbot


---

## Setup Instructions

1. Clone the repository  
2. Install dependencies  

npm install

3. Add environment variables  

GROQ_API_KEY=your_api_key

4. Run the development server  

npm run dev

---

## Deployment

Deployed on Vercel using serverless functions for backend APIs. No separate backend server setup is required.

---

## Future Improvements

- Replace keyword matching with vector embeddings  
- Improve ranking accuracy  
- Add analytics and logging  
- Enhance UI for chatbot interactions  

---

## Summary

This project demonstrates the integration of a frontend portfolio with a lightweight backend and an AI-powered chatbot, focusing on performance, simplicity, and contextual accuracy.
