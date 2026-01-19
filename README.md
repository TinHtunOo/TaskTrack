# Task / To-Do Management App (React)

A modern Task / To-Do Management application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Context API**. The app focuses on clean architecture, scalable state management, and practical UX features such as filtering, sorting, dark mode, and local persistence.

---

## ✨ Features

- 📋 Create, edit, and delete tasks
- 🏷️ Task status management (Todo / In Progress / Completed)
- ⚡ Fast development with Vite
- 🔍 Filter and search tasks
- ↕️ Sort tasks by priority, or date
- 🌙 Dark mode (Context API + Tailwind)
- 💾 Persistent data using LocalStorage
- 🧠 Global state management with Context API
- 🎨 Responsive and clean UI with Tailwind CSS

---

## 🧱 Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Persistence:** LocalStorage
- **Routing:** React Router

---

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components
├── context/           # Context providers (Tasks, Theme)
├── pages/             # Dashboard
├── types/             # TypeScript interfaces & types
├── utils/             # LocalStorage helpers
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🧭 Application Flow

1. User lands on **Dashboard** (Task List)
2. Tasks are loaded from **LocalStorage**
3. User can:
   - Create a new task
   - Edit or delete an existing task
   - Filter, search, or sort tasks

4. All task updates are synced to LocalStorage
5. UI responds instantly via Context state

---

## 🌙 Dark Mode Implementation

- Managed using **ThemeContext**
- Toggles `dark` class on `<html>`
- Tailwind configured with `darkMode: 'class'`

Example:

```
<div className="bg-white dark:bg-neutral-900 text-black dark:text-white" />
```

---

## 💾 LocalStorage Persistence

Tasks are stored automatically in the browser using a helper utility:

- Load tasks on app start
- Save tasks on every update

This ensures data remains after refresh or browser restart.

---

## 🚀 Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Start development server

```
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

---

## 📌 Learning Goals

This project is designed to practice:

- Real-world React architecture
- TypeScript fundamentals
- Context API usage
- UI/UX refinement
- State persistence strategies

---

## 📄 License

This project is for educational and personal use.

---

**Author:** Tin Htun
