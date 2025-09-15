---
redirect_from:
  - /fullstack/00-onboarding.html
layout: default
title: "Week 0: Setup & Your First Website 1"
parent: Full Stack Developer
nav_order: 2
---

# Week 0: Setup & Your First Website 🌱
{: .no_toc }

Welcome to Full Stack Development! This week you'll set up your development environment and create your first website.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## 🎯 Learning Objectives

By the end of this week, you will be able to:
- [ ] Set up a development environment on your computer
- [ ] Create a basic HTML page with semantic tags
- [ ] Style a webpage using CSS
- [ ] Deploy your website to `yourname.devsyllabus.com`
- [ ] Introduce yourself in English using technical vocabulary

## 📺 Video Lessons

### 1. Welcome & Course Overview (15 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_WEEK0_INTRO" title="Full Stack Week 0 - Introduction" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Course structure and expectations
- How to use the learning platform
- Your learning journey roadmap

### 2. Setting Up Your Development Environment (20 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_SETUP" title="Development Environment Setup" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Installing VS Code and extensions
- Using the terminal/command line
- Setting up Git and GitHub

### 3. HTML Fundamentals (25 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_HTML" title="HTML Fundamentals" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- What is HTML and how it works
- Essential HTML tags and semantic structure
- Creating your first webpage

### 4. CSS Basics & Styling (25 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_CSS" title="CSS Basics" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- How CSS works with HTML
- Colors, fonts, and spacing
- Making your site look professional

---

## 📚 Theory & Concepts

### What is Full Stack Development?

A **Full Stack Developer** builds both the **frontend** (what users see) and **backend** (server logic) of web applications.

Frontend (Client-Side)          Backend (Server-Side)
┌─────────────────────┐        ┌─────────────────────┐
│   HTML Structure    │        │   Server Logic      │
│   CSS Styling       │   ←→   │   Database          │
│   JavaScript Logic  │        │   APIs              │
└─────────────────────┘        └─────────────────────┘

### Essential Tools

| Tool | Purpose | Why We Use It |
|------|---------|---------------|
| **VS Code** | Code Editor | Free, powerful, lots of extensions |
| **Git** | Version Control | Track changes, collaborate |
| **GitHub** | Code Hosting | Share code, deploy websites |
| **Chrome DevTools** | Debugging | Inspect and fix code |

### HTML Fundamentals

HTML (HyperText Markup Language) is the **structure** of web pages.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
    </header>
    
    <main>
        <section>
            <h2>About Me</h2>
            <p>I'm learning to code with DevSyllabus!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 @devSyllabus</p>
    </footer>
</body>
</html>