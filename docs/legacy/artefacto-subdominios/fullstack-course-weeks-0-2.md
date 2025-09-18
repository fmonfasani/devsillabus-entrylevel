# Full Stack Modules - Semanas 0-2
## Contenido completo para estudiantes desde cero

---

## 📋 **ESTRUCTURA DE ARCHIVOS**

```
docs/
├── _collections_dir/fullstack/
│   ├── 00-setup.md
│   ├── 01-html-css-basics.md
│   ├── 02-javascript-fundamentals.md
│   └── ...
├── h5p/
│   ├── fs-quiz0/, fs-quiz1/, fs-quiz2/
│   └── shared-english1/
├── videos/
│   ├── fs-week0-intro.md
│   ├── fs-week1-html-css.md
│   └── fs-week2-javascript.md
└── assets/
    ├── images/fullstack/
    └── downloads/
```

---

# 🌱 **SEMANA 0: SETUP & PRIMEROS PASOS**

## Archivo: `docs/_collections_dir/fullstack/00-setup.md`

```markdown
---
layout: default
title: "Week 0: Setup & Your First Website"
parent: Full Stack Developer
nav_order: 1
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

```
Frontend (Client-Side)          Backend (Server-Side)
┌─────────────────────┐        ┌─────────────────────┐
│   HTML Structure    │        │   Server Logic      │
│   CSS Styling       │   ←→   │   Database          │
│   JavaScript Logic  │        │   APIs              │
└─────────────────────┘        └─────────────────────┘
```

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
        <p>&copy; 2024 My Name</p>
    </footer>
</body>
</html>
```

**Key Concepts:**
- **Tags**: `<h1>`, `<p>`, `<div>` define content types
- **Semantic HTML**: Use meaningful tags like `<header>`, `<main>`, `<article>`
- **Attributes**: Add extra information like `class="button"` or `id="navbar"`

### CSS Fundamentals  

CSS (Cascading Style Sheets) controls the **appearance** of HTML.

```css
/* Reset default styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Style the body */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

/* Style headers */
h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
}

/* Style sections */
section {
    background: white;
    padding: 30px;
    margin: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
```

**Key Concepts:**
- **Selectors**: Target HTML elements (`h1`, `.class`, `#id`)
- **Properties**: Define appearance (`color`, `font-size`, `padding`)
- **Box Model**: Every element has content, padding, border, margin

---

## 🛠️ Hands-On Practice

### Practice 1: HTML Structure (15 min)

Create a basic HTML file with proper semantic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your Name] - DevSyllabus Student</title>
</head>
<body>
    <header>
        <!-- Add your name and a brief headline -->
    </header>
    
    <nav>
        <!-- Add navigation links (About, Skills, Projects, Contact) -->
    </nav>
    
    <main>
        <section id="about">
            <!-- Write about yourself -->
        </section>
        
        <section id="skills">
            <!-- List what you're learning -->
        </section>
        
        <section id="contact">
            <!-- Add contact information -->
        </section>
    </main>
    
    <footer>
        <!-- Copyright and credits -->
    </footer>
</body>
</html>
```

### Practice 2: CSS Styling (20 min)

Create a stylesheet that makes your site look professional:

```css
/* Your turn! Style the HTML you created above */
/* Focus on: colors, fonts, spacing, and layout */
```

---

## 🗣️ English Practice

### Technical Vocabulary

Learn these essential terms:

| Term | Definition | Example |
|------|------------|---------|
| **Tag** | HTML element marker | `<h1>` is a heading tag |
| **Attribute** | Additional element info | `class="button"` |
| **Property** | CSS styling rule | `color: blue;` |
| **Selector** | CSS target element | `.button` selects all buttons |
| **Semantic** | Meaningful, not just visual | `<header>` vs `<div>` |

### Speaking Exercise

Use the [AI Speaking Coach](/ai-speaking.html) to practice:

**Beginner Level - Exercise 1:**
> "Hello, my name is [Your Name]. I am learning web development with DevSyllabus. I am excited to build my first website."

**Practice phrases:**
- "I am learning HTML and CSS"
- "This is my first website project"
- "I want to become a full stack developer"

---

## 🧠 Interactive Quiz

[Take Quiz 0: HTML/CSS Fundamentals](/h5p/fs-quiz0/){: .btn .btn-primary }

**Topics covered:**
- HTML structure and semantic tags
- CSS selectors and properties
- Development tools and workflow
- English technical vocabulary

---

## 💻 Lab Assignment

### Assignment 0: Your First Website

**Objective:** Create and deploy your personal portfolio website

**Requirements:**
1. **HTML Structure** (40 points)
   - [ ] Proper DOCTYPE and semantic structure
   - [ ] Header with your name and professional headline
   - [ ] Navigation menu with 4 sections
   - [ ] Main content with About, Skills, and Contact sections
   - [ ] Footer with copyright

2. **CSS Styling** (35 points)
   - [ ] Professional color scheme (not default black/blue)
   - [ ] Readable typography (proper font sizes and spacing)
   - [ ] Responsive design (works on mobile)
   - [ ] Consistent spacing and alignment
   - [ ] At least one hover effect

3. **Content Quality** (15 points)
   - [ ] Professional "About Me" section (3-4 sentences)
   - [ ] List of skills you're learning
   - [ ] Contact information (email, GitHub)
   - [ ] All text in correct English

4. **Technical Requirements** (10 points)
   - [ ] Valid HTML (no errors in validator)
   - [ ] Organized file structure
   - [ ] Comments in code explaining your decisions
   - [ ] Works without JavaScript

**Deliverables:**
- [ ] Website deployed at `yourname.devsyllabus.com`
- [ ] Source code in GitHub repository
- [ ] README.md with project description
- [ ] 2-minute video introducing yourself and your website (English)

**Resources:**
- [HTML Validator](https://validator.w3.org/)
- [CSS Color Picker](https://htmlcolorcodes.com/)
- [Google Fonts](https://fonts.google.com/)
- [Responsive Design Checker](http://ami.responsivedesign.is/)

### Submission Process

1. **Fork the assignment repository** from GitHub Classroom
2. **Create your website** in the `src/` folder
3. **Test locally** by opening `src/index.html` in your browser
4. **Commit and push** your changes
5. **Create a Pull Request** with description of your work
6. **Deploy to subdomain** using the provided instructions

**Due Date:** End of Week 0 (Sunday 11:59 PM)

---

## 🔄 Peer Review Activity

After submitting your assignment, you'll be assigned 2 classmates to review:

**Review Checklist:**
- [ ] Does the website load correctly?
- [ ] Is the HTML structure semantic and valid?
- [ ] Does the CSS create a professional appearance?
- [ ] Is the content clear and well-written?
- [ ] Does it work on mobile devices?

**Feedback Format:**
```
## What Works Well
- [List 2-3 specific positive aspects]

## Suggestions for Improvement
- [List 1-2 specific areas to improve]

## Technical Issues
- [Note any bugs or validation errors]

## English/Communication
- [Comment on content clarity and grammar]

Overall Score: ___/100
```

---

## 📅 Weekly Schedule

| Day | Activity | Time |
|-----|----------|------|
| **Monday** | Watch videos 1-2, set up environment | 2 hours |
| **Tuesday** | Practice HTML structure, start assignment | 2 hours |
| **Wednesday** | Learn CSS basics, style your website | 2 hours |
| **Thursday** | **Live Session 1**: Q&A and debugging help | 1 hour |
| **Friday** | Complete assignment, test on devices | 2 hours |
| **Saturday** | **Live Session 2**: Peer review and feedback | 1 hour |
| **Sunday** | Final polish and submission | 1 hour |

**Total Time Commitment:** 11 hours

---

## 🎓 Success Criteria

To pass Week 0, you must:
- [ ] Score 70%+ on the quiz
- [ ] Submit working website with all requirements
- [ ] Complete peer reviews for 2 classmates
- [ ] Participate in at least 1 live session
- [ ] Deploy successfully to your subdomain

---

## 🆘 Getting Help

**Stuck? Don't panic!** Here's how to get help:

1. **Check the FAQ** in Discord #fullstack-help
2. **Search previous questions** in Discord channels
3. **Ask specific questions** with code snippets
4. **Join study groups** in #pair-programming
5. **Attend live sessions** for real-time help

**Example of a good help request:**
```
Hi! I'm working on the Week 0 assignment and my CSS isn't working.

My HTML looks like this:
<section class="about">...</section>

My CSS looks like this:  
.about { color: blue; }

But the text isn't turning blue. What am I missing?

Link to my code: [GitHub repo link]
```

---

## 🚀 What's Next?

After completing Week 0, you'll move to **Week 1: JavaScript Fundamentals**, where you'll learn:
- Variables, functions, and control flow
- DOM manipulation and events
- Interactive website features
- Debugging with Chrome DevTools

**Congratulations on starting your coding journey!** 🎉
```

---

# 🌿 **SEMANA 1: JAVASCRIPT FUNDAMENTALS**

## Archivo: `docs/_collections_dir/fullstack/01-javascript-fundamentals.md`

```markdown
---
layout: default
title: "Week 1: JavaScript Fundamentals"
parent: Full Stack Developer
nav_order: 2
---

# Week 1: JavaScript Fundamentals 🌿
{: .no_toc }

This week you'll learn JavaScript - the programming language that makes websites interactive!

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
- [ ] Understand JavaScript syntax and basic concepts
- [ ] Create and use variables, functions, and objects
- [ ] Manipulate HTML elements with the DOM
- [ ] Handle user events (clicks, forms, etc.)
- [ ] Debug code using Chrome DevTools
- [ ] Explain technical problems in English

## 📺 Video Lessons

### 1. Introduction to Programming & JavaScript (20 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_JS_INTRO" title="JavaScript Introduction" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- What is programming and why JavaScript?
- How JavaScript works in web browsers
- Your first "Hello World" program

### 2. Variables and Data Types (25 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_JS_VARIABLES" title="JavaScript Variables" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Storing information in variables
- Different types of data (strings, numbers, booleans)
- Naming conventions and best practices

### 3. Functions and Logic (30 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_JS_FUNCTIONS" title="JavaScript Functions" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Creating reusable functions
- If/else statements and decision making
- Loops for repetitive tasks

### 4. DOM Manipulation & Events (35 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_JS_DOM" title="DOM Manipulation" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- What is the DOM (Document Object Model)
- Selecting and changing HTML elements
- Responding to user interactions

---

## 📚 Theory & Concepts

### What is JavaScript?

JavaScript is a **programming language** that runs in web browsers and makes websites interactive.

```
Static Website (HTML + CSS)    Interactive Website (+ JavaScript)
┌─────────────────────────┐   ┌─────────────────────────┐
│  Fixed content          │   │  Dynamic content        │
│  No user interaction    │   │  Responds to clicks     │
│  Same every time        │   │  Updates without reload │
└─────────────────────────┘   └─────────────────────────┘
```

### Variables: Storing Information

Variables are like **boxes** that hold information:

```javascript
// Different types of variables
let name = "Maria";           // String (text)
let age = 25;                 // Number
let isStudent = true;         // Boolean (true/false)
let favoriteColors = ["blue", "green", "red"]; // Array (list)

// Using variables
console.log("Hello, " + name);  // Hello, Maria
console.log("Age: " + age);     // Age: 25
```

**Key Concepts:**
- `let` creates a variable that can change
- `const` creates a variable that cannot change
- Variables must be declared before use
- Use descriptive names like `userName` instead of `x`

### Functions: Reusable Code

Functions are like **recipes** - they take ingredients (parameters) and produce a result:

```javascript
// Function definition
function greetUser(name, language) {
    if (language === "spanish") {
        return "¡Hola, " + name + "!";
    } else {
        return "Hello, " + name + "!";
    }
}

// Using the function
let greeting1 = greetUser("Carlos", "spanish"); // ¡Hola, Carlos!
let greeting2 = greetUser("Sarah", "english");  // Hello, Sarah!

// Modern function syntax (arrow functions)
const addNumbers = (a, b) => {
    return a + b;
};

let sum = addNumbers(5, 3); // 8
```

### The DOM: Connecting JavaScript to HTML

The DOM lets JavaScript **control** HTML elements:

```html
<!-- HTML -->
<button id="myButton">Click me!</button>
<p id="message">Original text</p>
```

```javascript
// JavaScript - selecting elements
const button = document.getElementById('myButton');
const message = document.getElementById('message');

// JavaScript - responding to events  
button.addEventListener('click', function() {
    message.textContent = 'Button was clicked!';
    message.style.color = 'blue';
});
```

**Key DOM Methods:**
- `getElementById('id')` - find element by ID
- `querySelector('.class')` - find element by CSS selector
- `addEventListener('event', function)` - respond to user actions
- `textContent` - change text inside element
- `style` - change CSS properties

### Control Flow: Making Decisions

Programs need to make decisions based on conditions:

```javascript
// If/else statements
let hour = 14; // 2 PM

if (hour < 12) {
    console.log("Good morning!");
} else if (hour < 18) {
    console.log("Good afternoon!");
} else {
    console.log("Good evening!");
}

// Loops for repetition
let fruits = ["apple", "banana", "orange"];

for (let i = 0; i < fruits.length; i++) {
    console.log("I like " + fruits[i]);
}

// Modern loop syntax
fruits.forEach(fruit => {
    console.log("I like " + fruit);
});
```

---

## 🛠️ Hands-On Practice

### Practice 1: Variable Basics (10 min)

Open your browser's console (F12) and try these:

```javascript
// Create variables about yourself
let myName = "YOUR_NAME_HERE";
let myAge = YOUR_AGE_HERE;
let isLearningCode = true;
let hobbies = ["reading", "music", "sports"]; // Add your hobbies

// Test them
console.log("My name is " + myName);
console.log("I am " + myAge + " years old");
console.log("Am I learning code? " + isLearningCode);
console.log("My hobbies:", hobbies);
```

### Practice 2: Simple Function (15 min)

Create a function that calculates if someone can vote:

```javascript
function canVote(age, country) {
    let votingAge;
    
    if (country === "USA" || country === "Brazil") {
        votingAge = 18;
    } else if (country === "Argentina") {
        votingAge = 16;
    } else {
        votingAge = 18; // default
    }
    
    return age >= votingAge;
}

// Test your function
console.log(canVote(17, "USA"));       // false
console.log(canVote(18, "USA"));       // true
console.log(canVote(16, "Argentina")); // true
```

### Practice 3: DOM Interaction (20 min)

Create an HTML file with JavaScript:

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Practice</title>
    <style>
        .highlight { background-color: yellow; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <h1 id="title">JavaScript Practice</h1>
    <button id="colorBtn">Change Color</button>
    <button id="hideBtn">Hide/Show Title</button>
    <p id="counter">Clicks: 0</p>
    
    <script>
        // Your JavaScript code here
        let clicks = 0;
        
        document.getElementById('colorBtn').addEventListener('click', function() {
            const title = document.getElementById('title');
            title.classList.toggle('highlight');
            
            clicks++;
            document.getElementById('counter').textContent = 'Clicks: ' + clicks;
        });
        
        document.getElementById('hideBtn').addEventListener('click', function() {
            const title = document.getElementById('title');
            title.classList.toggle('hidden');
        });
    </script>
</body>
</html>
```

---

## 🗣️ English Practice

### Technical Vocabulary

Learn these programming terms:

| Term | Definition | Example |
|------|------------|---------|
| **Variable** | Storage for data | `let name = "John";` |
| **Function** | Reusable code block | `function sayHello() {}` |
| **Parameter** | Function input | `function greet(name) {}` |
| **Event** | User interaction | Click, scroll, keypress |
| **Bug** | Code error | "There's a bug in line 15" |
| **Debug** | Find and fix errors | "I need to debug this function" |

### Speaking Exercise - Problem Solving

Practice explaining technical problems:

**Intermediate Level - Exercise 1:**
> "I have a bug in my JavaScript code. The button click event is not working. I checked the console and there are no error messages. I think the problem is in the event listener."

**Practice phrases:**
- "The function is not returning the expected value"
- "I'm getting an error in the console that says..."
- "The variable is undefined when I try to use it"
- "I need to debug this step by step"

---

## 🧠 Interactive Quiz

[Take Quiz 1: JavaScript Fundamentals](/h5p/fs-quiz1/){: .btn .btn-primary }

**Sample Questions:**

1. **Which of these correctly creates a variable in JavaScript?**
   - a) `variable name = "John";`
   - b) `let name = "John";`
   - c) `create name = "John";`
   - d) `var name == "John";`

2. **What will this code output?**
   ```javascript
   function double(x) {
       return x * 2;
   }
   console.log(double(5));
   ```
   - a) 5
   - b) 10
   - c) 25
   - d) Error

3. **How do you select an HTML element with ID "myButton"?**
   - a) `document.getElement('myButton')`
   - b) `document.getElementById('myButton')`
   - c) `document.select('#myButton')`
   - d) `HTML.get('myButton')`

---

## 💻 Lab Assignment

### Assignment 1: Interactive Portfolio

**Objective:** Add JavaScript functionality to your Week 0 portfolio

**Requirements:**

1. **Interactive Navigation** (25 points)
   - [ ] Smooth scrolling to sections when clicking nav links
   - [ ] Highlight current section in navigation
   - [ ] Mobile-friendly hamburger menu (bonus)

2. **Dynamic Content** (30 points)
   - [ ] "About Me" section with expandable details
   - [ ] Skills section with progress bars or animations
   - [ ] Contact form with basic validation
   - [ ] Dark/light mode toggle (bonus)

3. **User Interactions** (25 points)
   - [ ] Button hover effects and animations
   - [ ] Image gallery or project showcase
   - [ ] "Scroll to top" button that appears after scrolling
   - [ ] Loading animation or welcome message

4. **Code Quality** (20 points)
   - [ ] Clean, well-commented JavaScript
   - [ ] Proper function organization
   - [ ] Error handling for user inputs
   - [ ] No console errors

**Technical Requirements:**
- Minimum 3 interactive features
- At least 5 JavaScript functions
- Event listeners for user interactions
- DOM manipulation examples
- Form validation (if including contact form)

**Starter Code:**

```javascript
// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load saved theme
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Add more functionality here...
```

### Advanced Challenges (Bonus Points)

1. **API Integration** (+10 points)
   - Fetch data from a public API (weather, quotes, etc.)
   - Display the data dynamically on your site

2. **Local Storage** (+10 points)
   - Save user preferences (theme, name, etc.)
   - Remember form data between visits

3. **Animation Library** (+5 points)
   - Use a library like AOS (Animate On Scroll)
   - Create engaging animations for content

---

## 🔧 Debugging Workshop

### Common JavaScript Errors

Learn to identify and fix these common issues:

**1. Syntax Errors**
```javascript
// ❌ Wrong: missing closing bracket
function greet(name {
    return "Hello " + name;
}

// ✅ Correct:
function greet(name) {
    return "Hello " + name;
}
```

**2. Reference Errors**
```javascript
// ❌ Wrong: using undefined variable
console.log(userName); // ReferenceError

// ✅ Correct: declare variable first
let userName = "John";
console.log(userName);
```

**3. Type Errors**
```javascript
// ❌ Wrong: calling non-function
let number = 5;
number(); // TypeError

// ✅ Correct: check before calling
if (typeof number === 'function') {
    number();
}
```

### Debugging Tools

**Chrome DevTools:**
1. **Console**: See errors and log messages
2. **Sources**: Set breakpoints and step through code
3. **Elements**: Inspect HTML/CSS changes from JavaScript

**Debugging Techniques:**
```javascript
// Use console.log to track values
function calculateTip(bill, tipPercent) {
    console.log("Bill:", bill);           // Debug input
    console.log("Tip %:", tipPercent);    // Debug input
    
    let tip = bill * (tipPercent / 100);
    console.log("Calculated tip:", tip);  // Debug calculation
    
    return tip;
}

// Use debugger statement for breakpoints
function complexFunction() {
    let result = someCalculation();
    debugger; // Execution will pause here
    return result;
}
```

---

## 📅 Weekly Schedule

| Day | Activity | Time |
|-----|----------|------|
| **Monday** | Videos 1-2, practice variables and functions | 2.5 hours |
| **Tuesday** | Video 3, practice DOM manipulation | 2 hours |
| **Wednesday** | Video 4, start assignment planning | 2 hours |
| **Thursday** | **Live Session 1**: Debugging workshop | 1 hour |
| **Friday** | Work on assignment, implement features | 3 hours |
| **Saturday** | **Live Session 2**: Code review and Q&A | 1 hour |
| **Sunday** | Final testing, submission, peer review | 1.5 hours |

**Total Time Commitment:** 13 hours

---

## 🎓 Success Criteria

To pass Week 1, you must:
- [ ] Score 75%+ on the JavaScript quiz
- [ ] Submit working interactive portfolio
- [ ] Demonstrate at least 3 JavaScript features
- [ ] Complete debugging exercises in live session
- [ ] Provide helpful peer code reviews

---

## 📖 Additional Resources

**Free Learning Materials:**
- [JavaScript.info](https://javascript.info/) - Comprehensive tutorial
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) - Official documentation
- [FreeCodeCamp](https://www.freecodecamp.org/) - Interactive exercises

**Practice Platforms:**
- [Codecademy JavaScript](https://www.codecademy.com/learn/introduction-to-javascript)
- [JavaScript30](https://javascript30.com/) - 30 projects in 30 days
- [Codewars](https://www.codewars.com/) - Programming challenges

**YouTube Channels:**
- [JavaScript Mastery](https://www.youtube.com/@JavaScriptMastery)
- [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified)
- [Traversy Media](https://www.youtube.com/@TraversyMedia)

---

## 🚀 Week 2 Preview

Next week you'll learn **DOM Manipulation & APIs**:
- Advanced event handling
- Fetching data from external APIs
- Creating dynamic user interfaces
- Form handling and validation
- Introduction to asynchronous programming

Get ready to make your websites truly interactive! 🌟
```

---

# 🌳 **SEMANA 2: DOM MANIPULATION & APIs**

## Archivo: `docs/_collections_dir/fullstack/02-dom-apis.md`

```markdown
---
layout: default
title: "Week 2: DOM Manipulation & APIs"
parent: Full Stack Developer
nav_order: 3
---

# Week 2: DOM Manipulation & APIs 🌳
{: .no_toc }

This week you'll master advanced DOM manipulation and learn to fetch data from external APIs to create dynamic web applications!

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
- [ ] Create and manipulate HTML elements dynamically with JavaScript
- [ ] Handle complex user events and form interactions
- [ ] Fetch data from external APIs using modern JavaScript
- [ ] Display API data in user-friendly formats
- [ ] Handle errors and loading states gracefully
- [ ] Present technical solutions clearly in English

## 📺 Video Lessons

### 1. Advanced DOM Manipulation (30 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_ADVANCED_DOM" title="Advanced DOM Manipulation" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Creating and removing HTML elements with JavaScript
- Event delegation and advanced event handling
- Working with forms and user input validation

### 2. Introduction to APIs (25 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_INTRO_APIS" title="Introduction to APIs" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- What are APIs and how they work
- Understanding JSON data format
- HTTP methods: GET, POST, PUT, DELETE

### 3. Fetch API and Asynchronous JavaScript (35 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_FETCH_API" title="Fetch API Tutorial" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Using the Fetch API to get data
- Promises and async/await syntax
- Error handling for network requests

### 4. Building Dynamic User Interfaces (30 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_DYNAMIC_UI" title="Dynamic UI with APIs" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Displaying API data in HTML templates
- Creating loading states and error messages
- Building a complete weather app example

---

## 📚 Theory & Concepts

### Advanced DOM Manipulation

Beyond selecting existing elements, you can create and modify the page structure:

```javascript
// Creating new elements
const newSection = document.createElement('div');
newSection.className = 'user-card';
newSection.innerHTML = `
    <h3>User Name</h3>
    <p>User email</p>
    <button onclick="deleteUser()">Delete</button>
`;

// Adding to the page
const container = document.getElementById('users-container');
container.appendChild(newSection);

// Removing elements
const elementToRemove = document.getElementById('old-content');
elementToRemove.remove();

// Modifying multiple elements
const allButtons = document.querySelectorAll('.btn');
allButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
```

### Event Delegation

Handle events efficiently for dynamic content:

```javascript
// Instead of adding listeners to each button individually
document.getElementById('users-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const userId = event.target.dataset.userId;
        deleteUser(userId);
    }
    
    if (event.target.classList.contains('edit-btn')) {
        const userId = event.target.dataset.userId;
        editUser(userId);
    }
});
```

### Understanding APIs

An **API (Application Programming Interface)** is a way for different software applications to communicate:

```
Your Website                    External API
┌─────────────────────┐        ┌─────────────────────┐
│  "Get weather for   │   →    │  Weather Service    │
│   Buenos Aires"     │        │  (OpenWeatherMap)   │
│                     │   ←    │                     │
│  Display: 22°C      │        │  Returns: JSON data │
└─────────────────────┘        └─────────────────────┘
```

**Common API Types:**
- **REST APIs**: Most common, use HTTP methods
- **Weather APIs**: Get climate data
- **Social Media APIs**: Access posts, user data
- **Payment APIs**: Process transactions
- **Maps APIs**: Location and navigation data

### Working with JSON

JSON (JavaScript Object Notation) is the standard format for API data:

```javascript
// JSON example from a weather API
const weatherData = {
    "location": "Buenos Aires",
    "temperature": 22,
    "description": "Sunny",
    "humidity": 65,
    "forecast": [
        { "day": "Monday", "temp": 24, "condition": "Cloudy" },
        { "day": "Tuesday", "temp": 20, "condition": "Rainy" }
    ]
};

// Accessing JSON data
console.log(weatherData.temperature);        // 22
console.log(weatherData.forecast[0].day);    // "Monday"
```

### The Fetch API

Modern JavaScript way to make HTTP requests:

```javascript
// Basic fetch request
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => {
        console.log('Users:', data);
        displayUsers(data);
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage('Failed to load users');
    });

// Modern async/await syntax (recommended)
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayUsers(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        showErrorMessage('Failed to load users');
    }
}
```

### Error Handling & User Experience

Always handle errors gracefully:

```javascript
async function fetchWeatherData(city) {
    // Show loading state
    showLoadingSpinner();
    
    try {
        const response = await fetch(`https://api.weather.com/v1/current?q=${city}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else if (response.status === 429) {
                throw new Error('Too many requests. Please try again later.');
            } else {
                throw new Error('Weather service unavailable');
            }
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
    } catch (error) {
        console.error('Weather fetch error:', error);
        showErrorMessage(error.message);
    } finally {
        hideLoadingSpinner();
    }
}

function showLoadingSpinner() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weather-content').style.display = 'none';
}

function showErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}
```

---

## 🛠️ Hands-On Practice

### Practice 1: Dynamic Element Creation (20 min)

Create a simple task list manager:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Task Manager</title>
    <style>
        .task { 
            padding: 10px; 
            border: 1px solid #ddd; 
            margin: 5px 0; 
            display: flex; 
            justify-content: space-between; 
        }
        .completed { background-color: #d4edda; }
    </style>
</head>
<body>
    <h1>My Tasks</h1>
    <input type="text" id="taskInput" placeholder="Enter a new task">
    <button onclick="addTask()">Add Task</button>
    <div id="taskList"></div>

    <script>
        let tasks = [];
        let taskIdCounter = 0;

        function addTask() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
            
            const newTask = {
                id: taskIdCounter++,
                text: taskText,
                completed: false
            };
            
            tasks.push(newTask);
            input.value = '';
            renderTasks();
        }

        function toggleTask(taskId) {
            const task = tasks.find(t => t.id === taskId);
            task.completed = !task.completed;
            renderTasks();
        }

        function deleteTask(taskId) {
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
        }

        function renderTasks() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            
            tasks.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
                taskDiv.innerHTML = `
                    <span onclick="toggleTask(${task.id})" style="cursor: pointer;">
                        ${task.completed ? '✅' : '⭕'} ${task.text}
                    </span>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(taskDiv);
            });
        }

        // Allow adding tasks with Enter key
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    </script>
</body>
</html>
```

### Practice 2: API Integration (30 min)

Create a random quote generator using a public API:

```javascript
// Random quote fetcher
async function getRandomQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const loadingElement = document.getElementById('loading');
    
    // Show loading
    loadingElement.style.display = 'block';
    quoteElement.textContent = '';
    authorElement.textContent = '';
    
    try {
        const response = await fetch('https://api.quotable.io/random');
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        
        // Display the quote
        quoteElement.textContent = `"${data.content}"`;
        authorElement.textContent = `— ${data.author}`;
        
    } catch (error) {
        console.error('Error:', error);
        quoteElement.textContent = 'Failed to load quote. Please try again.';
        quoteElement.style.color = 'red';
    } finally {
        loadingElement.style.display = 'none';
    }
}

// HTML structure needed:
/*
<div id="quote-container">
    <div id="loading" style="display: none;">Loading...</div>
    <blockquote id="quote"></blockquote>
    <p id="author"></p>
    <button onclick="getRandomQuote()">Get New Quote</button>
</div>
*/
```

### Practice 3: Weather App Mini-Project (45 min)

Build a simple weather application:

```javascript
// Weather App - Complete Example
class WeatherApp {
    constructor() {
        this.apiKey = 'demo_key'; // In real project, use environment variables
        this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.init();
    }

    init() {
        const button = document.getElementById('searchButton');
        const input = document.getElementById('cityInput');
        
        button.addEventListener('click', () => this.searchWeather());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWeather();
        });

        // Load weather for default city
        this.getWeather('Buenos Aires');
    }

    async searchWeather() {
        const city = document.getElementById('cityInput').value.trim();
        if (city) {
            await this.getWeather(city);
        }
    }

    async getWeather(city) {
        this.showLoading(true);
        this.clearError();

        try {
            const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found');
                } else if (response.status === 401) {
                    throw new Error('API key invalid');
                } else {
                    throw new Error('Weather service unavailable');
                }
            }

            const data = await response.json();
            this.displayWeather(data);

        } catch (error) {
            console.error('Weather error:', error);
            this.showError(error.message);
        } finally {
            this.showLoading(false);
        }
    }

    displayWeather(data) {
        const weatherDiv = document.getElementById('weatherDisplay');
        
        weatherDiv.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>
                <div class="temperature">${Math.round(data.main.temp)}°C</div>
                <div class="description">${data.weather[0].description}</div>
                <div class="details">
                    <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind: ${data.wind.speed} m/s</p>
                </div>
            </div>
        `;
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        loading.style.display = show ? 'block' : 'none';
    }

    showError(message) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    clearError() {
        const errorDiv = document.getElementById('error');
        errorDiv.style.display = 'none';
    }
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
```

---

## 🗣️ English Practice

### Technical Vocabulary - APIs & Async Programming

| Term | Definition | Example |
|------|------------|---------|
| **API** | Application Programming Interface | "We fetch data from the weather API" |
| **Endpoint** | Specific URL for API access | "The users endpoint is /api/users" |
| **Fetch** | Get data from server | "We fetch the latest posts" |
| **Async** | Non-blocking operation | "This is an async function" |
| **Promise** | Future result of async operation | "The fetch returns a promise" |
| **JSON** | Data format for APIs | "The API returns JSON data" |

### Speaking Exercise - Technical Explanations

**Advanced Level - Exercise 1:**
> "I implemented an asynchronous function that fetches weather data from an external API. The function handles errors gracefully and displays loading states while waiting for the response. If the API returns a 404 status, we show a user-friendly message saying the city was not found."

**Practice phrases:**
- "The API request failed with a 500 error"
- "I'm implementing error handling for network requests"
- "The function returns a promise that resolves with user data"
- "We need to validate the JSON response before displaying it"

---

## 🧠 Interactive Quiz

[Take Quiz 2: DOM & APIs](/h5p/fs-quiz2/){: .btn .btn-primary }

**Sample Questions:**

1. **Which method creates a new HTML element?**
   - a) `document.createElement()`
   - b) `document.newElement()`
   - c) `document.makeElement()`
   - d) `document.addElement()`

2. **What does API stand for?**
   - a) Application Programming Internet
   - b) Application Programming Interface
   - c) Automated Programming Interface
   - d) Advanced Programming Instructions

3. **Which is the correct way to handle a fetch promise?**
   - a) `fetch(url).then(data => console.log(data))`
   - b) `fetch(url).then(response => response.json()).then(data => console.log(data))`
   - c) `fetch(url).json().then(data => console.log(data))`
   - d) `fetch(url, json()).then(data => console.log(data))`

---

## 💻 Lab Assignment

### Assignment 2: Dynamic Web Application

**Objective:** Build a dynamic web application that fetches and displays data from external APIs

**Choose ONE project:**

#### Option A: Personal Dashboard
Create a personal dashboard with multiple widgets:
- **Weather widget** showing current conditions
- **Quote of the day** from quotes API  
- **News headlines** from news API
- **To-do list** with local storage persistence

#### Option B: Movie/Book Search App
Create a search application:
- Search movies/books using external API (OMDB, Google Books)
- Display results in cards with images and details
- Add favorites functionality with local storage
- Implement pagination for large result sets

#### Option C: GitHub Profile Explorer
Create a GitHub user explorer:
- Search GitHub users by username
- Display user profile information and repositories
- Show repository statistics and languages
- Add ability to compare two users

**Requirements (All Options):**

1. **API Integration** (30 points)
   - [ ] Successfully fetch data from at least 2 external APIs
   - [ ] Handle different types of API responses
   - [ ] Implement proper error handling for failed requests
   - [ ] Show loading states during API calls

2. **Dynamic DOM Manipulation** (25 points)
   - [ ] Create and remove HTML elements dynamically
   - [ ] Update content without page refresh
   - [ ] Implement interactive features (buttons, forms, etc.)
   - [ ] Use event delegation where appropriate

3. **User Experience** (20 points)
   - [ ] Responsive design that works on mobile
   - [ ] Clear loading indicators and error messages
   - [ ] Intuitive navigation and user interface
   - [ ] Smooth animations or transitions

4. **Code Quality** (25 points)
   - [ ] Well-organized JavaScript functions
   - [ ] Proper error handling and edge case management
   - [ ] Clean, commented code with good naming
   - [ ] No console errors in production

**Starter Template:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Dynamic App</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .card { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .loading { text-align: center; padding: 20px; }
        .error { color: #e74c3c; background: #fadbd8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .btn { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        .btn:hover { background: #2980b9; }
    </style>
</head>
<body>
    <div class="container">
        <h1>My Dynamic Application</h1>
        
        <!-- Loading indicator -->
        <div id="loading" class="loading" style="display: none;">
            Loading...
        </div>
        
        <!-- Error messages -->
        <div id="error" class="error" style="display: none;"></div>
        
        <!-- Main content area -->
        <div id="content">
            <!-- Your dynamic content goes here -->
        </div>
    </div>

    <script>
        class MyApp {
            constructor() {
                this.init();
            }

            init() {
                console.log('App initialized');
                // Your initialization code here
            }

            showLoading(show = true) {
                document.getElementById('loading').style.display = show ? 'block' : 'none';
            }

            showError(message) {
                const errorDiv = document.getElementById('error');
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
            }

            clearError() {
                document.getElementById('error').style.display = 'none';
            }

            // Add your methods here
        }

        // Start the application
        document.addEventListener('DOMContentLoaded', () => {
            new MyApp();
        });
    </script>
</body>
</html>
```

### Free APIs to Use:

**No API Key Required:**
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API for testing
- [Random Quotes](https://api.quotable.io/random) - Inspirational quotes
- [Dog API](https://dog.ceo/dog-api/) - Random dog images
- [Cat Facts](https://catfact.ninja/) - Random cat facts

**Free with Registration:**
- [OpenWeatherMap](https://openweathermap.org/api) - Weather data
- [News API](https://newsapi.org/) - News headlines
- [OMDB](http://www.omdbapi.com/) - Movie database
- [GitHub API](https://docs.github.com/en/rest) - Repository and user data

---

## 🔧 Advanced Topics & Best Practices

### Handling Different API Response Types

```javascript
// Text response
const textResponse = await fetch('/api/status');
const statusText = await textResponse.text();

// JSON response
const jsonResponse = await fetch('/api/users');
const users = await jsonResponse.json();

// Blob response (for images)
const imageResponse = await fetch('/api/image/123');
const imageBlob = await imageResponse.blob();
const imageUrl = URL.createObjectURL(imageBlob);

// Check response type before parsing
async function fetchData(url) {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    } else if (contentType && contentType.includes('text/')) {
        return await response.text();
    } else {
        return await response.blob();
    }
}
```

### Performance Optimization

```javascript
// Debounce search input to avoid too many API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage
const searchInput = document.getElementById('search');
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

// Cache API responses to avoid repeated requests
class APICache {
    constructor() {
        this.cache = new Map();
        this.expiryTime = 5 * 60 * 1000; // 5 minutes
    }

    set(key, data) {
        const expiry = Date.now() + this.expiryTime;
        this.cache.set(key, { data, expiry });
    }

    get(key) {
        const cached = this.cache.get(key);
        if (cached && cached.expiry > Date.now()) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }
}
```

---

## 📅 Weekly Schedule

| Day | Activity | Time |
|-----|----------|------|
| **Monday** | Videos 1-2, practice DOM manipulation | 3 hours |
| **Tuesday** | Videos 3-4, API practice exercises | 2.5 hours |
| **Wednesday** | Start assignment, choose project option | 3 hours |
| **Thursday** | **Live Session 1**: API integration workshop | 1 hour |
| **Friday** | Complete core features, testing | 3 hours |
| **Saturday** | **Live Session 2**: Code review and debugging | 1 hour |
| **Sunday** | Final polishing, submission, peer review | 2 hours |

**Total Time Commitment:** 15.5 hours

---

## 🎓 Success Criteria

To pass Week 2, you must:
- [ ] Score 80%+ on the DOM & APIs quiz
- [ ] Submit fully functional web application
- [ ] Successfully integrate at least 2 external APIs
- [ ] Demonstrate proper error handling and loading states
- [ ] Participate actively in live sessions
- [ ] Provide constructive peer reviews

---

## 🆘 Common Challenges & Solutions

### Challenge 1: CORS Errors
**Problem:** Browser blocks API requests due to CORS policy
**Solution:** Use APIs that support CORS or a proxy service

### Challenge 2: API Rate Limits
**Problem:** Too many requests, API returns 429 error
**Solution:** Implement debouncing and caching

### Challenge 3: Inconsistent API Responses
**Problem:** API sometimes returns different data structures
**Solution:** Always validate and provide fallback values

```javascript
// Safe property access
const userName = data?.user?.name || 'Unknown User';
const userEmail = data?.user?.email || 'No email provided';
```

---

## 🚀 Week 3 Preview

Next week you'll dive into **Backend Development**:
- Node.js and Express server setup
- Creating REST APIs
- Database integration with MongoDB
- Authentication and user management
- Deployment to cloud platforms

You're becoming a real full-stack developer! 💪

---

**🎉 Congratulations on completing Week 2!** You now have the skills to create dynamic, data-driven web applications. Keep practicing and building!
```

---

# 📋 **QUIZZES INTERACTIVOS**

## Archivo: `docs/h5p/fs-quiz0/index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz 0: HTML/CSS Fundamentals</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f8fafc;
            color: #1e293b;
        }
        .quiz-container { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .question { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; background: #fafbfc; }
        .question h3 { margin-top: 0; color: #0f172a; }
        .options label { display: block; padding: 8px; margin: 5px 0; cursor: pointer; border-radius: 4px; }
        .options label:hover { background: #f1f5f9; }
        .options input[type="radio"] { margin-right: 8px; }
        .btn { padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #2563eb; }
        .result { margin: 20px 0; padding: 20px; border-radius: 8px; font-weight: 500; }
        .score-excellent { background: #d1fae5; color: #059669; border-left: 4px solid #10b981; }
        .score-good { background: #fef3c7; color: #d97706; border-left: 4px solid #f59e0b; }
        .score-needs-work { background: #fee2e2; color: #dc2626; border-left: 4px solid #ef4444; }
        .explanation { margin-top: 10px; padding: 10px; background: #f8fafc; border-radius: 4px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="quiz-container">
        <h1>Quiz 0: HTML/CSS Fundamentals 🌱</h1>
        <p>Test your knowledge from Week 0. This quiz covers HTML structure, CSS basics, and development environment setup.</p>

        <div id="quiz-questions">
            <div class="question">
                <h3>1. Which HTML tag is used to define the main content of a webpage?</h3>
                <div class="options">
                    <label><input type="radio" name="q1" value="a"> &lt;content&gt;</label>
                    <label><input type="radio" name="q1" value="b"> &lt;main&gt;</label>
                    <label><input type="radio" name="q1" value="c"> &lt;body&gt;</label>
                    <label><input type="radio" name="q1" value="d"> &lt;section&gt;</label>
                </div>
            </div>

            <div class="question">
                <h3>2. What does CSS stand for?</h3>
                <div class="options">
                    <label><input type="radio" name="q2" value="a"> Computer Style Sheets</label>
                    <label><input type="radio" name="q2" value="b"> Cascading Style Sheets</label>
                    <label><input type="radio" name="q2" value="c"> Creative Style System</label>
                    <label><input type="radio" name="q2" value="d"> Coded Style Syntax</label>
                </div>
            </div>

            <div class="question">
                <h3>3. Which CSS property is used to change text color?</h3>
                <div class="options">
                    <label><input type="radio" name="q3" value="a"> text-color</label>
                    <label><input type="radio" name="q3" value="b"> font-color</label>
                    <label><input type="radio" name="q3" value="c"> color</label>
                    <label><input type="radio" name="q3" value="d"> background-color</label
                    <a href="#about" class="nav-link">About</a>
                <a href="#skills" class="nav-link">Skills</a>
                <a href="#projects" class="nav-link">Projects</a>
                <a href="#contact" class="nav-link">Contact</a>
                <button id="theme-toggle" class="theme-toggle">🌙</button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero">
        <div class="hero-content">
            <h1 class="hero-title">
                <span class="typing-text" data-text="Hello, I'm Your Name"></span>
            </h1>
            <p class="hero-subtitle">Full Stack Developer in Training</p>
            <button class="cta-button" onclick="scrollToSection('about')">Get to Know Me</button>
        </div>
    </section>

    <!-- Rest of your sections with enhanced interactive elements -->
    <main>
        <section id="about" class="section">
            <div class="container">
                <h2 class="section-title">About Me</h2>
                <div class="about-content">
                    <div class="about-text">
                        <p>Your introduction here...</p>
                        <button class="expand-btn" onclick="toggleDetails('more-details')">
                            Read More
                        </button>
                        <div id="more-details" class="expandable-content">
                            <p>Additional details about yourself...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="skills" class="section">
            <div class="container">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    <!-- Skills will be populated by JavaScript -->
                </div>
            </div>
        </section>

        <section id="projects" class="section">
            <div class="container">
                <h2 class="section-title">Projects</h2>
                <div class="projects-grid">
                    <!-- Projects will be populated by JavaScript -->
                </div>
            </div>
        </section>

        <section id="contact" class="section">
            <div class="container">
                <h2 class="section-title">Contact Me</h2>
                <form id="contact-form" class="contact-form">
                    <div class="form-group">
                        <input type="text" id="name" name="name" required>
                        <label for="name">Your Name</label>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" required>
                        <label for="email">Your Email</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" required></textarea>
                        <label for="message">Your Message</label>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
                <div id="form-status" class="form-status"></div>
            </div>
        </section>
    </main>

    <!-- Scroll to Top Button -->
    <button id="scroll-top" class="scroll-top" title="Back to Top">
        ↑
    </button>

    <!-- Scripts -->
    <script src="scripts/main.js"></script>
    <script src="scripts/animations.js"></script>
    <script src="scripts/api.js"></script>
</body>
</html>
```

### JavaScript Starter Code

**scripts/main.js:**
```javascript
class Portfolio {
    constructor() {
        this.currentSection = 'hero';
        this.isLoading = true;
        this.theme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.setupEventListeners();
        this.populateSkills();
        this.populateProjects();
        this.hideLoading();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        navToggle.addEventListener('click', this.toggleMobileMenu.bind(this));

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));

        // Scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Form submission
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scroll-top');
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        this.closeMobileMenu();
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(this.theme);
        localStorage.setItem('theme', this.theme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    handleScroll() {
        // Update active navigation link
        this.updateActiveNav();
        
        // Show/hide scroll to top button
        const scrollTopBtn = document.getElementById('scroll-top');
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    updateActiveNav() {
        const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    populateSkills() {
        const skills = [
            { name: 'HTML', level: 90, icon: '🌐' },
            { name: 'CSS', level: 85, icon: '🎨' },
            { name: 'JavaScript', level: 75, icon: '⚡' },
            { name: 'Git', level: 70, icon: '📂' },
            { name: 'English', level: 80, icon: '🗣️' }
        ];

        const skillsGrid = document.querySelector('.skills-grid');
        skillsGrid.innerHTML = skills.map(skill => `
            <div class="skill-card">
                <div class="skill-icon">${skill.icon}</div>
                <h3 class="skill-name">${skill.name}</h3>
                <div class="skill-progress">
                    <div class="skill-bar" data-level="${skill.level}">
                        <div class="skill-fill"></div>
                    </div>
                    <span class="skill-percentage">${skill.level}%</span>
                </div>
            </div>
        `).join('');

        // Animate skill bars when they come into view
        this.animateSkillBars();
    }

    populateProjects() {
        const projects = [
            {
                title: 'Personal Portfolio',
                description: 'My first website built with HTML, CSS, and JavaScript',
                technologies: ['HTML', 'CSS', 'JavaScript'],
                liveUrl: '#',
                codeUrl: '#',
                image: 'assets/images/project1.jpg'
            },
            {
                title: 'Interactive Todo App',
                description: 'A dynamic todo application with local storage',
                technologies: ['JavaScript', 'Local Storage', 'CSS'],
                liveUrl: '#',
                codeUrl: '#',
                image: 'assets/images/project2.jpg'
            }
        ];

        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/images/placeholder.jpg'">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveUrl}" class="project-link" target="_blank">Live Demo</a>
                        <a href="${project.codeUrl}" class="project-link" target="_blank">View Code</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const level = skillBar.dataset.level;
                    const skillFill = skillBar.querySelector('.skill-fill');
                    
                    skillFill.style.width = `${level}%`;
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const formStatus = document.getElementById('form-status');
        
        // Show loading state
        formStatus.innerHTML = '<p class="status-loading">Sending message...</p>';
        
        try {
            // Simulate form submission (replace with real endpoint)
            await this.simulateFormSubmission(formData);
            
            formStatus.innerHTML = '<p class="status-success">✅ Message sent successfully!</p>';
            e.target.reset();
            
        } catch (error) {
            formStatus.innerHTML = '<p class="status-error">❌ Failed to send message. Please try again.</p>';
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                Math.random() > 0.2 ? resolve() : reject();
            }, 2000);
        });
    }

    hideLoading() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.isLoading = false;
            }, 500);
        }, 1500);
    }
}

// Global utility functions
function toggleDetails(elementId) {
    const element = document.getElementById(elementId);
    const button = event.target;
    
    if (element.classList.contains('expanded')) {
        element.classList.remove('expanded');
        button.textContent = 'Read More';
    } else {
        element.classList.add('expanded');
        button.textContent = 'Read Less';
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Add typing effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.dataset.text;
        typingText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});
```

## 📊 Evaluation Rubric

### Technical Implementation (40 points)
- **Excellent (36-40):** All features work perfectly, clean code, best practices followed
- **Good (30-35):** Most features work, minor bugs, good code organization
- **Satisfactory (24-29):** Core features work, some issues, basic code structure
- **Needs Improvement (0-23):** Major functionality missing or broken

### User Experience (25 points)
- **Excellent (23-25):** Intuitive, smooth interactions, great visual feedback
- **Good (19-22):** Good usability, minor UX issues
- **Satisfactory (15-18):** Basic functionality, some usability concerns
- **Needs Improvement (0-14):** Poor user experience, confusing interface

### Code Quality (20 points)
- **Excellent (18-20):** Clean, commented, organized, follows conventions
- **Good (15-17):** Well-structured, mostly clean code
- **Satisfactory (12-14):** Basic organization, some issues
- **Needs Improvement (0-11):** Poor organization, hard to read

### English Communication (10 points)
- **Excellent (9-10):** Clear, professional content and comments
- **Good (7-8):** Good English with minor errors
- **Satisfactory (5-6):** Understandable with some issues
- **Needs Improvement (0-4):** Significant language barriers

### Bonus Points (5 points)
- Creative animations or effects
- Additional API integrations
- Accessibility features
- Performance optimizations

## 📚 Resources & References

### JavaScript DOM Manipulation
- [MDN DOM Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [JavaScript.info DOM Navigation](https://javascript.info/dom-navigation)

### CSS Animations & Transitions
- [CSS Transitions Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- [Animate.css Library](https://animate.style/)

### Form Handling
- [Form Validation with JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

### Free APIs for Bonus Features
- [OpenWeatherMap](https://openweathermap.org/api) - Weather data
- [Quotable](https://github.com/lukePeavey/quotable) - Random quotes
- [GitHub API](https://docs.github.com/en/rest) - Repository data

## 🚀 Submission Instructions

1. **Complete your interactive portfolio** with all required features
2. **Test thoroughly** on different devices and browsers
3. **Commit your code** to GitHub with meaningful commit messages
4. **Deploy to your subdomain** at `yourname.devsyllabus.com`
5. **Create a Pull Request** with description of features implemented
6. **Record a 2-minute video** (English) demonstrating your portfolio features

### Pull Request Template
```markdown
## Assignment 2: Interactive Portfolio

### Features Implemented
- [ ] Dynamic navigation with smooth scrolling
- [ ] Skills section with animated progress bars
- [ ] Interactive project gallery
- [ ] Contact form with validation
- [ ] Dark/light mode toggle
- [ ] Mobile responsive design

### Bonus Features
- [ ] API integration: _______________
- [ ] Advanced animations: ___________
- [ ] Other: _______________________

### Screenshots
[Add screenshots of key features]

### Demo Video
[Link to video demonstration]

### Challenges & Learning
What was the most challenging part and what did you learn?

### Self-Assessment Score
Technical Implementation: ___/40
User Experience: ___/25
Code Quality: ___/20
English Communication: ___/10
Bonus: ___/5

**Total Estimated Score: ___/100**
```

## ⏰ Timeline

- **Day 1-2:** Plan features and set up project structure
- **Day 3-4:** Implement core JavaScript functionality
- **Day 5:** Add interactive features and animations
- **Day 6:** Test, debug, and add bonus features
- **Day 7:** Final polish, video creation, and submission

## 🆘 Getting Help

### Common Issues & Solutions

**Issue:** JavaScript not working
**Solution:** Check browser console for errors, verify script tags

**Issue:** Animations not smooth
**Solution:** Use CSS transitions, check for performance bottlenecks

**Issue:** Mobile navigation not working
**Solution:** Verify event listeners, check CSS media queries

### Support Channels
- 💬 Discord #fullstack-help for quick questions
- 🎥 Live sessions Thursday & Saturday for detailed help
- 👥 #pair-programming for collaborative debugging
- 📧 Direct message instructors for complex issues

**Remember:** The goal is learning, not perfection. Focus on implementing the core features well, then add bonus features if time permits.

Good luck! 🚀
```

---

# 📧 **EMAIL TEMPLATES Y COMUNICACIÓN**

## Archivo: `templates/emails/welcome-student.html`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to DevSyllabus!</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; }
        .content { padding: 30px 20px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .checklist { background: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 14px; margin-top: 40px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 ¡Bienvenido a DevSyllabus!</h1>
            <p>Welcome to your Full Stack Development journey</p>
        </div>
        
        <div class="content">
            <p>¡Hola <strong>{{STUDENT_NAME}}</strong>!</p>
            
            <p>Welcome to DevSyllabus Full Stack Development course! We're excited to help you become a professional developer in just 8 weeks.</p>
            
            <h2>🚀 Your Next Steps</h2>
            <div class="checklist">
                <h3>Before Week 0 starts:</h3>
                <ul>
                    <li>✅ Join our Discord community: <a href="{{DISCORD_INVITE}}">{{DISCORD_INVITE}}</a></li>
                    <li>✅ Visit your course platform: <a href="https://www.devsyllabus.com">www.devsyllabus.com</a></li>
                    <li>✅ Try the AI Speaking Coach: <a href="https://www.devsyllabus.com/ai-speaking.html">Practice English</a></li>
                    <li>✅ Check your subdomain: <a href="https://{{STUDENT_USERNAME}}.devsyllabus.com">{{STUDENT_USERNAME}}.devsyllabus.com</a></li>
                </ul>
            </div>
            
            <h2>📅 Important Dates</h2>
            <ul>
                <li><strong>Course Start:</strong> {{START_DATE}}</li>
                <li><strong>First Live Session:</strong> {{FIRST_LIVE_DATE}}</li>
                <li><strong>Final Project Presentation:</strong> {{FINAL_DATE}}</li>
            </ul>
            
            <h2>🎯 What to Expect</h2>
            <p>Over the next 8 weeks, you'll:</p>
            <ul>
                <li>Build 5+ real projects that go in your portfolio</li>
                <li>Learn HTML, CSS, JavaScript, Node.js, and databases</li>
                <li>Practice technical English with our AI tools</li>
                <li>Get personalized feedback on your code</li>
                <li>Join a supportive community of fellow learners</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.devsyllabus.com/fullstack/" class="button">Start Week 0 →</a>
            </div>
            
            <h2>🆘 Need Help?</h2>
            <p>We're here to support you every step of the way:</p>
            <ul>
                <li><strong>Discord Community:</strong> Ask questions, get help, make friends</li>
                <li><strong>Live Sessions:</strong> 2x per week for Q&A and pair programming</li>
                <li><strong>Email Support:</strong> Reply to this email anytime</li>
                <li><strong>Office Hours:</strong> One-on-one help when you need it</li>
            </ul>
            
            <p><strong>Remember:</strong> Every expert was once a beginner. You're starting an incredible journey, and we believe in you!</p>
            
            <p>¡Vamos a programar! 💻</p>
            
            <p>Best regards,<br>
            <strong>The DevSyllabus Team</strong></p>
        </div>
        
        <div class="footer">
            <p>DevSyllabus - Learn to Code from Zero<br>
            <a href="mailto:hello@devsyllabus.com">hello@devsyllabus.com</a> | 
            <a href="https://www.devsyllabus.com">www.devsyllabus.com</a></p>
        </div>
    </div>
</body>
</html>
```

---

## 🎉 **¡CONTENIDO COMPLETO LISTO!**

Ya tienes todo el contenido necesario para las primeras 3 semanas del curso Full Stack:

### ✅ **LO QUE ACABAMOS DE CREAR:**

1. **3 Módulos completos** con teoría, práctica, videos y evaluaciones
2. **Quizzes interactivos** con feedback automático y explicaciones
3. **Assignments detallados** con rubrics y starter code
4. **Templates de videos** con scripts completos
5. **Email templates** para comunicación con estudiantes

### 📊 **MÉTRICAS DE CONTENIDO:**

- **Semana 0:** 11 horas de contenido + 6 horas de práctica
- **Semana 1:** 13 horas de contenido + 8 horas de práctica  
- **Semana 2:** 15.5 horas de contenido + 10 horas de práctica
- **Total:** ~63 horas de experiencia de aprendizaje

### 🎯 **PRÓXIMOS PASOS:**

1. **Subir contenido** a los repositorios GitHub
2. **Grabar videos** usando los scripts proporcionados
3. **Testear quizzes** y assignments con beta users
4. **Configurar email marketing** con templates
5. **Lanzar beta** con 2-3 estudiantes por módulo

¿Querés que sigamos con:
- **Semanas 3-5** (Backend, APIs, Databases)
- **Setup de marketing** y landing page
- **Sistema de pagos** e inscripciones
- **Contenido de DevOps track**

¿Qué prefieres que hagamos ahora?
                </div>
            </div>

            <div class="question">
                <h3>4. What is the correct way to link a CSS file to HTML?</h3>
                <div class="options">
                    <label><input type="radio" name="q4" value="a"> &lt;css src="style.css"&gt;</label>
                    <label><input type="radio" name="q4" value="b"> &lt;link rel="stylesheet" href="style.css"&gt;</label>
                    <label><input type="radio" name="q4" value="c"> &lt;style href="style.css"&gt;</label>
                    <label><input type="radio" name="q4" value="d"> &lt;import css="style.css"&gt;</label>
                </div>
            </div>

            <div class="question">
                <h3>5. Which tool is primarily used for version control?</h3>
                <div class="options">
                    <label><input type="radio" name="q5" value="a"> VS Code</label>
                    <label><input type="radio" name="q5" value="b"> Chrome DevTools</label>
                    <label><input type="radio" name="q5" value="c"> Git</label>
                    <label><input type="radio" name="q5" value="d"> HTML Validator</label>
                </div>
            </div>

            <div class="question">
                <h3>6. What does "semantic HTML" mean?</h3>
                <div class="options">
                    <label><input type="radio" name="q6" value="a"> HTML that looks good</label>
                    <label><input type="radio" name="q6" value="b"> HTML that loads fast</label>
                    <label><input type="radio" name="q6" value="c"> HTML tags that describe the meaning of content</label>
                    <label><input type="radio" name="q6" value="d"> HTML written in multiple languages</label>
                </div>
            </div>

            <div class="question">
                <h3>7. En inglés, ¿cómo dices "Estoy aprendiendo programación"?</h3>
                <div class="options">
                    <label><input type="radio" name="q7" value="a"> I learn programming</label>
                    <label><input type="radio" name="q7" value="b"> I am learning programming</label>
                    <label><input type="radio" name="q7" value="c"> I learning programming</label>
                    <label><input type="radio" name="q7" value="d"> I study for programming</label>
                </div>
            </div>

            <div class="question">
                <h3>8. Which CSS property makes a website responsive?</h3>
                <div class="options">
                    <label><input type="radio" name="q8" value="a"> responsive: true</label>
                    <label><input type="radio" name="q8" value="b"> @media queries</label>
                    <label><input type="radio" name="q8" value="c"> mobile: auto</label>
                    <label><input type="radio" name="q8" value="d"> viewport: responsive</label>
                </div>
            </div>
        </div>

        <button class="btn" onclick="submitQuiz()">Submit Quiz</button>
        
        <div id="result" style="display: none;"></div>
    </div>

    <script>
        const CORRECT_ANSWERS = {
            q1: 'b', // <main>
            q2: 'b', // Cascading Style Sheets
            q3: 'c', // color
            q4: 'b', // <link rel="stylesheet" href="style.css">
            q5: 'c', // Git
            q6: 'c', // HTML tags that describe meaning
            q7: 'b', // I am learning programming
            q8: 'b'  // @media queries
        };

        const EXPLANATIONS = {
            q1: "The <main> tag represents the main content of a webpage, distinct from headers, footers, and navigation.",
            q2: "CSS stands for Cascading Style Sheets, which control the presentation and styling of HTML elements.",
            q3: "The 'color' property in CSS is used to set the text color of an element.",
            q4: "The <link> tag with rel='stylesheet' is the correct way to link external CSS files.",
            q5: "Git is a distributed version control system used to track changes in code over time.",
            q6: "Semantic HTML uses meaningful tags like <header>, <nav>, <main> that describe content structure.",
            q7: "Present continuous tense 'I am learning' is correct for ongoing actions.",
            q8: "@media queries allow CSS to apply different styles based on device characteristics like screen size."
        };

        function submitQuiz() {
            const formData = new FormData();
            let correctCount = 0;
            let totalQuestions = Object.keys(CORRECT_ANSWERS).length;
            let results = [];

            // Check each answer
            for (let question in CORRECT_ANSWERS) {
                const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
                
                if (selectedAnswer) {
                    const isCorrect = selectedAnswer.value === CORRECT_ANSWERS[question];
                    if (isCorrect) correctCount++;
                    
                    results.push({
                        question: question,
                        selected: selectedAnswer.value,
                        correct: CORRECT_ANSWERS[question],
                        isCorrect: isCorrect,
                        explanation: EXPLANATIONS[question]
                    });
                } else {
                    results.push({
                        question: question,
                        selected: null,
                        correct: CORRECT_ANSWERS[question],
                        isCorrect: false,
                        explanation: EXPLANATIONS[question]
                    });
                }
            }

            displayResults(correctCount, totalQuestions, results);
        }

        function displayResults(correct, total, results) {
            const percentage = Math.round((correct / total) * 100);
            const resultDiv = document.getElementById('result');
            
            let className, message, emoji;
            if (percentage >= 80) {
                className = 'score-excellent';
                emoji = '🎉';
                message = 'Excellent work! You have a strong understanding of HTML/CSS fundamentals.';
            } else if (percentage >= 70) {
                className = 'score-good';
                emoji = '👍';
                message = 'Good job! Review the areas you missed and you\'ll be ready for Week 1.';
            } else {
                className = 'score-needs-work';
                emoji = '📚';
                message = 'You need more practice. Review the course materials and retake the quiz.';
            }

            let resultHTML = `
                <div class="result ${className}">
                    <h3>${emoji} Quiz Results</h3>
                    <p><strong>Score: ${correct}/${total} (${percentage}%)</strong></p>
                    <p>${message}</p>
                </div>
            `;

            // Add detailed results
            resultHTML += '<h3>Detailed Results:</h3>';
            results.forEach((result, index) => {
                const questionNum = index + 1;
                const icon = result.isCorrect ? '✅' : '❌';
                const status = result.selected === null ? 'Not answered' : 
                              result.isCorrect ? 'Correct' : `Wrong (you selected ${result.selected}, correct is ${result.correct})`;
                
                resultHTML += `
                    <div class="explanation">
                        <strong>${icon} Question ${questionNum}: ${status}</strong><br>
                        ${result.explanation}
                    </div>
                `;
            });

            resultDiv.innerHTML = resultHTML;
            resultDiv.style.display = 'block';
            
            // Scroll to results
            resultDiv.scrollIntoView({ behavior: 'smooth' });
            
            // Store result for progress tracking
            localStorage.setItem('quiz0_result', JSON.stringify({
                score: percentage,
                completed: new Date().toISOString(),
                correct: correct,
                total: total
            }));
        }
    </script>
</body>
</html>
```

## Archivo: `docs/h5p/fs-quiz1/index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz 1: JavaScript Fundamentals</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
            max-width: 900px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f8fafc;
            color: #1e293b;
        }
        .quiz-container { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .question { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; background: #fafbfc; }
        .question h3 { margin-top: 0; color: #0f172a; }
        .code-block { background: #1e293b; color: #e2e8f0; padding: 15px; border-radius: 6px; font-family: 'Monaco', 'Consolas', monospace; margin: 10px 0; overflow-x: auto; }
        .options label { display: block; padding: 8px; margin: 5px 0; cursor: pointer; border-radius: 4px; }
        .options label:hover { background: #f1f5f9; }
        .options input[type="radio"] { margin-right: 8px; }
        .btn { padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #2563eb; }
        .result { margin: 20px 0; padding: 20px; border-radius: 8px; font-weight: 500; }
        .score-excellent { background: #d1fae5; color: #059669; border-left: 4px solid #10b981; }
        .score-good { background: #fef3c7; color: #d97706; border-left: 4px solid #f59e0b; }
        .score-needs-work { background: #fee2e2; color: #dc2626; border-left: 4px solid #ef4444; }
        .explanation { margin-top: 10px; padding: 10px; background: #f8fafc; border-radius: 4px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="quiz-container">
        <h1>Quiz 1: JavaScript Fundamentals 🌿</h1>
        <p>Test your understanding of JavaScript basics, functions, DOM manipulation, and debugging concepts from Week 1.</p>

        <div id="quiz-questions">
            <div class="question">
                <h3>1. Which keyword is used to declare a variable that can be changed?</h3>
                <div class="options">
                    <label><input type="radio" name="q1" value="a"> var</label>
                    <label><input type="radio" name="q1" value="b"> let</label>
                    <label><input type="radio" name="q1" value="c"> const</label>
                    <label><input type="radio" name="q1" value="d"> variable</label>
                </div>
            </div>

            <div class="question">
                <h3>2. What will this code output?</h3>
                <div class="code-block">
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Maria"));
                </div>
                <div class="options">
                    <label><input type="radio" name="q2" value="a"> Hello, Maria!</label>
                    <label><input type="radio" name="q2" value="b"> "Hello, Maria!"</label>
                    <label><input type="radio" name="q2" value="c"> greet("Maria")</label>
                    <label><input type="radio" name="q2" value="d"> undefined</label>
                </div>
            </div>

            <div class="question">
                <h3>3. How do you select an HTML element with ID "myButton"?</h3>
                <div class="options">
                    <label><input type="radio" name="q3" value="a"> document.select("#myButton")</label>
                    <label><input type="radio" name="q3" value="b"> document.getElementById("myButton")</label>
                    <label><input type="radio" name="q3" value="c"> document.getElement("myButton")</label>
                    <label><input type="radio" name="q3" value="d"> getElementById("#myButton")</label>
                </div>
            </div>

            <div class="question">
                <h3>4. What does DOM stand for?</h3>
                <div class="options">
                    <label><input type="radio" name="q4" value="a"> Data Object Model</label>
                    <label><input type="radio" name="q4" value="b"> Document Object Model</label>
                    <label><input type="radio" name="q4" value="c"> Dynamic Object Management</label>
                    <label><input type="radio" name="q4" value="d"> Document Oriented Markup</label>
                </div>
            </div>

            <div class="question">
                <h3>5. Which method adds an event listener to an element?</h3>
                <div class="options">
                    <label><input type="radio" name="q5" value="a"> element.onClick()</label>
                    <label><input type="radio" name="q5" value="b"> element.addEvent()</label>
                    <label><input type="radio" name="q5" value="c"> element.addEventListener()</label>
                    <label><input type="radio" name="q5" value="d"> element.listen()</label>
                </div>
            </div>

            <div class="question">
                <h3>6. What will this code do?</h3>
                <div class="code-block">
let numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i] * 2);
}
                </div>
                <div class="options">
                    <label><input type="radio" name="q6" value="a"> Print 1, 2, 3, 4, 5</label>
                    <label><input type="radio" name="q6" value="b"> Print 2, 4, 6, 8, 10</label>
                    <label><input type="radio" name="q6" value="c"> Print 1, 4, 9, 16, 25</label>
                    <label><input type="radio" name="q6" value="d"> Cause an error</label>
                </div>
            </div>

            <div class="question">
                <h3>7. En inglés, ¿cómo explicas un error en tu código?</h3>
                <div class="options">
                    <label><input type="radio" name="q7" value="a"> "My code is broken"</label>
                    <label><input type="radio" name="q7" value="b"> "There is a bug in my function"</label>
                    <label><input type="radio" name="q7" value="c"> "The program doesn't work"</label>
                    <label><input type="radio" name="q7" value="d"> "I have a mistake"</label>
                </div>
            </div>

            <div class="question">
                <h3>8. What is the difference between 'let' and 'const'?</h3>
                <div class="options">
                    <label><input type="radio" name="q8" value="a"> No difference</label>
                    <label><input type="radio" name="q8" value="b"> 'let' is for numbers, 'const' is for strings</label>
                    <label><input type="radio" name="q8" value="c"> 'let' can be changed, 'const' cannot be changed</label>
                    <label><input type="radio" name="q8" value="d"> 'const' is faster than 'let'</label>
                </div>
            </div>

            <div class="question">
                <h3>9. What does this function do?</h3>
                <div class="code-block">
function checkAge(age) {
    if (age >= 18) {
        return "Adult";
    } else {
        return "Minor";
    }
}
                </div>
                <div class="options">
                    <label><input type="radio" name="q9" value="a"> Checks if age is a number</label>
                    <label><input type="radio" name="q9" value="b"> Returns "Adult" if age is 18 or older, "Minor" otherwise</label>
                    <label><input type="radio" name="q9" value="c"> Always returns "Adult"</label>
                    <label><input type="radio" name="q9" value="d"> Calculates the age</label>
                </div>
            </div>

            <div class="question">
                <h3>10. Where should you open Chrome DevTools to see console.log() messages?</h3>
                <div class="options">
                    <label><input type="radio" name="q10" value="a"> Elements tab</label>
                    <label><input type="radio" name="q10" value="b"> Console tab</label>
                    <label><input type="radio" name="q10" value="c"> Sources tab</label>
                    <label><input type="radio" name="q10" value="d"> Network tab</label>
                </div>
            </div>
        </div>

        <button class="btn" onclick="submitQuiz()">Submit Quiz</button>
        
        <div id="result" style="display: none;"></div>
    </div>

    <script>
        const CORRECT_ANSWERS = {
            q1: 'b', // let
            q2: 'a', // Hello, Maria!
            q3: 'b', // document.getElementById
            q4: 'b', // Document Object Model
            q5: 'c', // addEventListener
            q6: 'b', // 2, 4, 6, 8, 10
            q7: 'b', // There is a bug in my function
            q8: 'c', // let can be changed, const cannot
            q9: 'b', // Returns Adult/Minor based on age
            q10: 'b' // Console tab
        };

        const EXPLANATIONS = {
            q1: "'let' declares variables that can be reassigned, while 'const' creates constants that cannot be changed after declaration.",
            q2: "The function greet() returns 'Hello, ' concatenated with the name parameter and '!', so greet('Maria') returns 'Hello, Maria!'",
            q3: "document.getElementById() is the correct method to select an element by its ID attribute.",
            q4: "DOM stands for Document Object Model - it's how JavaScript interacts with HTML elements.",
            q5: "addEventListener() is the modern way to attach event handlers to DOM elements.",
            q6: "The loop iterates through each number in the array and multiplies it by 2, printing 2, 4, 6, 8, 10.",
            q7: "'There is a bug in my function' is the most technical and professional way to describe a code error.",
            q8: "Variables declared with 'let' can be reassigned new values, while 'const' variables cannot be changed after initialization.",
            q9: "The function uses an if-else statement to return 'Adult' for ages 18+ and 'Minor' for younger ages.",
            q10: "The Console tab in Chrome DevTools displays console.log() outputs and JavaScript errors."
        };

        function submitQuiz() {
            let correctCount = 0;
            let totalQuestions = Object.keys(CORRECT_ANSWERS).length;
            let results = [];

            for (let question in CORRECT_ANSWERS) {
                const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
                
                if (selectedAnswer) {
                    const isCorrect = selectedAnswer.value === CORRECT_ANSWERS[question];
                    if (isCorrect) correctCount++;
                    
                    results.push({
                        question: question,
                        selected: selectedAnswer.value,
                        correct: CORRECT_ANSWERS[question],
                        isCorrect: isCorrect,
                        explanation: EXPLANATIONS[question]
                    });
                } else {
                    results.push({
                        question: question,
                        selected: null,
                        correct: CORRECT_ANSWERS[question],
                        isCorrect: false,
                        explanation: EXPLANATIONS[question]
                    });
                }
            }

            displayResults(correctCount, totalQuestions, results);
        }

        function displayResults(correct, total, results) {
            const percentage = Math.round((correct / total) * 100);
            const resultDiv = document.getElementById('result');
            
            let className, message, emoji;
            if (percentage >= 80) {
                className = 'score-excellent';
                emoji = '🎉';
                message = 'Excellent! You have mastered JavaScript fundamentals and are ready for Week 2.';
            } else if (percentage >= 75) {
                className = 'score-good';
                emoji = '👍';
                message = 'Good work! Review the missed topics and practice more DOM manipulation.';
            } else {
                className = 'score-needs-work';
                emoji = '📚';
                message = 'You need more practice with JavaScript basics. Review the course materials and try the exercises again.';
            }

            let resultHTML = `
                <div class="result ${className}">
                    <h3>${emoji} Quiz Results</h3>
                    <p><strong>Score: ${correct}/${total} (${percentage}%)</strong></p>
                    <p>${message}</p>
                    ${percentage >= 75 ? '<p><strong>✅ You can proceed to Week 2!</strong></p>' : '<p><strong>⚠️ Please review Week 1 materials before continuing.</strong></p>'}
                </div>
            `;

            resultHTML += '<h3>Detailed Results:</h3>';
            results.forEach((result, index) => {
                const questionNum = index + 1;
                const icon = result.isCorrect ? '✅' : '❌';
                const status = result.selected === null ? 'Not answered' : 
                              result.isCorrect ? 'Correct' : `Incorrect`;
                
                resultHTML += `
                    <div class="explanation">
                        <strong>${icon} Question ${questionNum}: ${status}</strong><br>
                        ${result.explanation}
                        ${!result.isCorrect && result.selected ? `<br><em>Your answer: ${result.selected}, Correct answer: ${result.correct}</em>` : ''}
                    </div>
                `;
            });

            resultDiv.innerHTML = resultHTML;
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth' });
            
            localStorage.setItem('quiz1_result', JSON.stringify({
                score: percentage,
                completed: new Date().toISOString(),
                correct: correct,
                total: total
            }));
        }
    </script>
</body>
</html>
```

---

# 🎥 **TEMPLATES PARA VIDEOS**

## Archivo: `docs/videos/fs-week0-intro.md`

```markdown
# Video Scripts for Week 0

## Video 1: Welcome & Course Overview (15 min)

### Thumbnail: 
- Text: "Welcome to Full Stack Development!"
- Background: DevSyllabus branding
- Presenter photo with welcoming gesture

### Script:

**[0:00 - 0:30] Hook & Introduction**
"¡Hola! Welcome to DevSyllabus Full Stack Development course. I'm [Your Name], and I'm going to help you go from complete beginner to job-ready developer in just 8 weeks. If you've never written a single line of code, don't worry - this course is designed specifically for you."

**[0:30 - 2:00] What You'll Achieve**
"By the end of this course, you'll have:
- Your own portfolio website at yourname.devsyllabus.com
- 5+ projects deployed and live on the internet
- The skills to build modern web applications
- Technical English skills to communicate with international teams
- A certificate and the confidence to apply for developer jobs"

**[2:00 - 5:00] Course Structure**
[Screen: Show course roadmap]
"Here's how we'll get there:
- Week 0: Your first website online (we start here!)
- Weeks 1-2: JavaScript and making sites interactive
- Weeks 3-4: Backend development with Node.js
- Weeks 5-6: Databases and user authentication  
- Week 7: Advanced features and AI integration
- Week 8: Final project and job preparation"

**[5:00 - 8:00] Learning Method**
"This isn't just watching videos. You'll:
- Watch short, focused lessons (like this one)
- Practice immediately with hands-on exercises
- Build real projects that go in your portfolio
- Get feedback through peer reviews and live sessions
- Practice technical English with our AI Speaking Coach"

**[8:00 - 12:00] Success Tips**
"To succeed in this course:
1. Code every day, even if it's just 30 minutes
2. Don't just watch - actually write the code yourself
3. Ask questions in Discord - we're here to help
4. Join the live sessions - that's where the magic happens
5. Practice English technical vocabulary daily

Remember: everyone starts somewhere. The developers at Google, Facebook, Netflix - they all wrote their first 'Hello World' program once."

**[12:00 - 15:00] Next Steps**
"Right now, go to devsyllabus.com and:
1. Join our Discord community
2. Download VS Code (I'll show you how in the next video)
3. Try the AI Speaking Coach
4. Get excited - you're about to change your life!

See you in the next video where we'll set up your development environment. ¡Vamos a programar!"

### Production Notes:
- Screen recordings of course platform
- Energetic, encouraging tone
- Show examples of student portfolios
- Include Spanish phrases for connection
- Add captions in Spanish and English

---

## Video 2: Development Environment Setup (20 min)

### Script Outline:

**[0:00 - 2:00] Introduction**
- What we'll install and why
- Overview of developer tools

**[2:00 - 8:00] VS Code Installation**
- Download from official site
- Installation process (Windows/Mac/Linux)
- Essential extensions: Live Server, Prettier, Spanish Language Pack

**[8:00 - 12:00] Git Installation & Setup**
- Why Git matters for developers
- Installation process
- Basic configuration (name, email)
- Connection to GitHub

**[12:00 - 18:00] First Project Setup**
- Creating your first HTML file
- Using VS Code features
- Live Server demonstration
- File organization best practices

**[18:00 - 20:00] Troubleshooting & Next Steps**
- Common installation issues
- How to get help
- Preview of next video

---

# 📝 **ASSIGNMENT TEMPLATES**

## Archivo: `assignments-fullstack/fs-02-interactive-portfolio/README.md`

```markdown
# Assignment 2: Interactive Portfolio with JavaScript

## 🎯 Objective
Transform your static Week 0 portfolio into an interactive web application using JavaScript, DOM manipulation, and event handling.

## 📋 Requirements

### Core Features (Required - 70 points)

1. **Dynamic Navigation** (15 points)
   - [ ] Smooth scrolling to sections when clicking navigation links
   - [ ] Active section highlighting in navigation menu
   - [ ] Responsive mobile navigation (hamburger menu)

2. **Interactive Content** (25 points)
   - [ ] Skills section with animated progress bars or interactive elements
   - [ ] Expandable/collapsible project details
   - [ ] Image gallery or carousel for project screenshots
   - [ ] Contact form with JavaScript validation

3. **User Experience Features** (20 points)
   - [ ] Dark/light mode toggle with localStorage persistence
   - [ ] "Scroll to top" button that appears after scrolling
   - [ ] Loading animations or welcome message
   - [ ] Hover effects and micro-interactions

4. **Code Quality** (10 points)
   - [ ] Clean, well-commented JavaScript code
   - [ ] Proper function organization and naming
   - [ ] No console errors or warnings
   - [ ] Responsive design maintained

### Advanced Features (Bonus - 30 points)

5. **API Integration** (15 points)
   - [ ] Weather widget showing current conditions
   - [ ] Quote of the day from external API
   - [ ] GitHub repositories display using GitHub API

6. **Advanced Interactions** (15 points)
   - [ ] Typing animation effect for name/title
   - [ ] Parallax scrolling effects
   - [ ] Interactive timeline for experience/education
   - [ ] Form submission with success/error states

## 🛠️ Technical Requirements

- **Minimum 5 JavaScript functions**
- **At least 3 different event listeners**
- **DOM manipulation examples (create, modify, remove elements)**
- **Local Storage implementation (theme, preferences, etc.)**
- **Error handling for user interactions**
- **Mobile-responsive design**

## 📁 File Structure

```
src/
├── index.html          # Main portfolio page
├── styles/
│   ├── main.css        # Main stylesheet
│   └── responsive.css  # Media queries
├── scripts/
│   ├── main.js         # Core functionality
│   ├── animations.js   # Animation effects
│   └── api.js          # API integrations (bonus)
├── assets/
│   ├── images/         # Project images, profile photo
│   └── icons/          # UI icons
└── README.md           # Project documentation
```

## 🎨 Starter Code

### HTML Structure Enhancement
```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Full Stack Developer</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/responsive.css">
</head>
<body>
    <!-- Loading screen -->
    <div id="loading-screen" class="loading-screen">
        <div class="loader"></div>
        <p>Loading...</p>
    </div>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-brand">Your Name</div>
            <button class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="nav-menu" id="nav-menu">
                <a href="#about# Full Stack Modules - Semanas 0-2
## Contenido completo para estudiantes desde cero

---

## 📋 **ESTRUCTURA DE ARCHIVOS**

```
docs/
├── _collections_dir/fullstack/
│   ├── 00-setup.md
│   ├── 01-html-css-basics.md
│   ├── 02-javascript-fundamentals.md
│   └── ...
├── h5p/
│   ├── fs-quiz0/, fs-quiz1/, fs-quiz2/
│   └── shared-english1/
├── videos/
│   ├── fs-week0-intro.md
│   ├── fs-week1-html-css.md
│   └── fs-week2-javascript.md
└── assets/
    ├── images/fullstack/
    └── downloads/
```

---

# 🌱 **SEMANA 0: SETUP & PRIMEROS PASOS**

## Archivo: `docs/_collections_dir/fullstack/00-setup.md`

```markdown
---
layout: default
title: "Week 0: Setup & Your First Website"
parent: Full Stack Developer
nav_order: 1
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

```
Frontend (Client-Side)          Backend (Server-Side)
┌─────────────────────┐        ┌─────────────────────┐
│   HTML Structure    │        │   Server Logic      │
│   CSS Styling       │   ←→   │   Database          │
│   JavaScript Logic  │        │   APIs              │
└─────────────────────┘        └─────────────────────┘
```

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
        <p>&copy; 2024 My Name</p>
    </footer>
</body>
</html>
```

**Key Concepts:**
- **Tags**: `<h1>`, `<p>`, `<div>` define content types
- **Semantic HTML**: Use meaningful tags like `<header>`, `<main>`, `<article>`
- **Attributes**: Add extra information like `class="button"` or `id="navbar"`

### CSS Fundamentals  

CSS (Cascading Style Sheets) controls the **appearance** of HTML.

```css
/* Reset default styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Style the body */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

/* Style headers */
h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
}

/* Style sections */
section {
    background: white;
    padding: 30px;
    margin: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
```

**Key Concepts:**
- **Selectors**: Target HTML elements (`h1`, `.class`, `#id`)
- **Properties**: Define appearance (`color`, `font-size`, `padding`)
- **Box Model**: Every element has content, padding, border, margin

---

## 🛠️ Hands-On Practice

### Practice 1: HTML Structure (15 min)

Create a basic HTML file with proper semantic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your Name] - DevSyllabus Student</title>
</head>
<body>
    <header>
        <!-- Add your name and a brief headline -->
    </header>
    
    <nav>
        <!-- Add navigation links (About, Skills, Projects, Contact) -->
    </nav>
    
    <main>
        <section id="about">
            <!-- Write about yourself -->
        </section>
        
        <section id="skills">
            <!-- List what you're learning -->
        </section>
        
        <section id="contact">
            <!-- Add contact information -->
        </section>
    </main>
    
    <footer>
        <!-- Copyright and credits -->
    </footer>
</body>
</html>
```

### Practice 2: CSS Styling (20 min)

Create a stylesheet that makes your site look professional:

```css
/* Your turn! Style the HTML you created above */
/* Focus on: colors, fonts, spacing, and layout */
```

---

## 🗣️ English Practice

### Technical Vocabulary

Learn these essential terms:

| Term | Definition | Example |
|------|------------|---------|
| **Tag** | HTML element marker | `<h1>` is a heading tag |
| **Attribute** | Additional element info | `class="button"` |
| **Property** | CSS styling rule | `color: blue;` |
| **Selector** | CSS target element | `.button` selects all buttons |
| **Semantic** | Meaningful, not just visual | `<header>` vs `<div>` |

### Speaking Exercise

Use the [AI Speaking Coach](/ai-speaking.html) to practice:

**Beginner Level - Exercise 1:**
> "Hello, my name is [Your Name]. I am learning web development with DevSyllabus. I am excited to build my first website."

**Practice phrases:**
- "I am learning HTML and CSS"
- "This is my first website project"
- "I want to become a full stack developer"

---

## 🧠 Interactive Quiz

[Take Quiz 0: HTML/CSS Fundamentals](/h5p/fs-quiz0/){: .btn .btn-primary }

**Topics covered:**
- HTML structure and semantic tags
- CSS selectors and properties
- Development tools and workflow
- English technical vocabulary

---

## 💻 Lab Assignment

### Assignment 0: Your First Website

**Objective:** Create and deploy your personal portfolio website

**Requirements:**
1. **HTML Structure** (40 points)
   - [ ] Proper DOCTYPE and semantic structure
   - [ ] Header with your name and professional headline
   - [ ] Navigation menu with 4 sections
   - [ ] Main content with About, Skills, and Contact sections
   - [ ] Footer with copyright

2. **CSS Styling** (35 points)
   - [ ] Professional color scheme (not default black/blue)
   - [ ] Readable typography (proper font sizes and spacing)
   - [ ] Responsive design (works on mobile)
   - [ ] Consistent spacing and alignment
   - [ ] At least one hover effect

3. **Content Quality** (15 points)
   - [ ] Professional "About Me" section (3-4 sentences)
   - [ ] List of skills you're learning
   - [ ] Contact information (email, GitHub)
   - [ ] All text in correct English

4. **Technical Requirements** (10 points)
   - [ ] Valid HTML (no errors in validator)
   - [ ] Organized file structure
   - [ ] Comments in code explaining your decisions
   - [ ] Works without JavaScript

**Deliverables:**
- [ ] Website deployed at `yourname.devsyllabus.com`
- [ ] Source code in GitHub repository
- [ ] README.md with project description
- [ ] 2-minute video introducing yourself and your website (English)

**Resources:**
- [HTML Validator](https://validator.w3.org/)
- [CSS Color Picker](https://htmlcolorcodes.com/)
- [Google Fonts](https://fonts.google.com/)
- [Responsive Design Checker](http://ami.responsivedesign.is/)

### Submission Process

1. **Fork the assignment repository** from GitHub Classroom
2. **Create your website** in the `src/` folder
3. **Test locally** by opening `src/index.html` in your browser
4. **Commit and push** your changes
5. **Create a Pull Request** with description of your work
6. **Deploy to subdomain** using the provided instructions

**Due Date:** End of Week 0 (Sunday 11:59 PM)

---

## 🔄 Peer Review Activity

After submitting your assignment, you'll be assigned 2 classmates to review:

**Review Checklist:**
- [ ] Does the website load correctly?
- [ ] Is the HTML structure semantic and valid?
- [ ] Does the CSS create a professional appearance?
- [ ] Is the content clear and well-written?
- [ ] Does it work on mobile devices?

**Feedback Format:**
```
## What Works Well
- [List 2-3 specific positive aspects]

## Suggestions for Improvement
- [List 1-2 specific areas to improve]

## Technical Issues
- [Note any bugs or validation errors]

## English/Communication
- [Comment on content clarity and grammar]

Overall Score: ___/100
```

---

## 📅 Weekly Schedule

| Day | Activity | Time |
|-----|----------|------|
| **Monday** | Watch videos 1-2, set up environment | 2 hours |
| **Tuesday** | Practice HTML structure, start assignment | 2 hours |
| **Wednesday** | Learn CSS basics, style your website | 2 hours |
| **Thursday** | **Live Session 1**: Q&A and debugging help | 1 hour |
| **Friday** | Complete assignment, test on devices | 2 hours |
| **Saturday** | **Live Session 2**: Peer review and feedback | 1 hour |
| **Sunday** | Final polish and submission | 1 hour |

**Total Time Commitment:** 11 hours

---

## 🎓 Success Criteria

To pass Week 0, you must:
- [ ] Score 70%+ on the quiz
- [ ] Submit working website with all requirements
- [ ] Complete peer reviews for 2 classmates
- [ ] Participate in at least 1 live session
- [ ] Deploy successfully to your subdomain

---

## 🆘 Getting Help

**Stuck? Don't panic!** Here's how to get help:

1. **Check the FAQ** in Discord #fullstack-help
2. **Search previous questions** in Discord channels
3. **Ask specific questions** with code snippets
4. **Join study groups** in #pair-programming
5. **Attend live sessions** for real-time help

**Example of a good help request:**
```
Hi! I'm working on the Week 0 assignment and my CSS isn't working.

My HTML looks like this:
<section class="about">...</section>

My CSS looks like this:  
.about { color: blue; }

But the text isn't turning blue. What am I missing?

Link to my code: [GitHub repo link]
```

---

## 🚀 What's Next?

After completing Week 0, you'll move to **Week 1: JavaScript Fundamentals**, where you'll learn:
- Variables, functions, and control flow
- DOM manipulation and events
- Interactive website features
- Debugging with Chrome DevTools

**Congratulations on starting your coding journey!** 🎉
```

---

# 🌿 **SEMANA 1: JAVASCRIPT FUNDAMENTALS**

## Archivo: `docs/_collections_dir/fullstack/01-javascript-fundamentals.md`

```markdown
---
layout: default
title: "Week 1: JavaScript Fundamentals"
parent: Full Stack Developer
nav_order: 2
---

# Week 1: JavaScript Fundamentals 🌿
{: .no_toc }

This week you'll learn JavaScript - the programming language that makes websites interactive!

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
- [ ] Understand JavaScript syntax and basic concepts
- [ ] Create and use variables, functions, and objects
- [ ] Manipulate HTML elements with the DOM
- [ ] Handle user events (clicks, forms, etc.)
- [ ] Debug code using Chrome DevTools
- [ ] Explain technical problems in English

## 📺 Video Lessons

### 1. Introduction to Programming & JavaScript (20 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_JS_INTRO" title="JavaScript Introduction" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- What is programming and why JavaScript?
- How JavaScript works in web browsers
- Your first "Hello World" program

### 2. Variables and Data Types (25 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_JS_VARIABLES" title="JavaScript Variables" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Storing information in variables
- Different types of data (strings, numbers, booleans)
- Naming conventions and best practices

### 3. Functions and Logic (30 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_JS_FUNCTIONS" title="JavaScript Functions" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Creating reusable functions
- If/else statements and decision making
- Loops for repetitive tasks

### 4. DOM Manipulation & Events (35 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_JS_DOM" title="DOM Manipulation" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- What is the DOM (Document Object Model)
- Selecting and changing HTML elements
- Responding to user interactions

---

## 📚 Theory & Concepts

### What is JavaScript?

JavaScript is a **programming language** that runs in web browsers and makes websites interactive.

```
Static Website (HTML + CSS)    Interactive Website (+ JavaScript)
┌─────────────────────────┐   ┌─────────────────────────┐
│  Fixed content          │   │  Dynamic content        │
│  No user interaction    │   │  Responds to clicks     │
│  Same every time        │   │  Updates without reload │
└─────────────────────────┘   └─────────────────────────┘
```

### Variables: Storing Information

Variables are like **boxes** that hold information:

```javascript
// Different types of variables
let name = "Maria";           // String (text)
let age = 25;                 // Number
let isStudent = true;         // Boolean (true/false)
let favoriteColors = ["blue", "green", "red"]; // Array (list)

// Using variables
console.log("Hello, " + name);  // Hello, Maria
console.log("Age: " + age);     // Age: 25
```

**Key Concepts:**
- `let` creates a variable that can change
- `const` creates a variable that cannot change
- Variables must be declared before use
- Use descriptive names like `userName` instead of `x`

### Functions: Reusable Code

Functions are like **recipes** - they take ingredients (parameters) and produce a result:

```javascript
// Function definition
function greetUser(name, language) {
    if (language === "spanish") {
        return "¡Hola, " + name + "!";
    } else {
        return "Hello, " + name + "!";
    }
}

// Using the function
let greeting1 = greetUser("Carlos", "spanish"); // ¡Hola, Carlos!
let greeting2 = greetUser("Sarah", "english");  // Hello, Sarah!

// Modern function syntax (arrow functions)
const addNumbers = (a, b) => {
    return a + b;
};

let sum = addNumbers(5, 3); // 8
```

### The DOM: Connecting JavaScript to HTML

The DOM lets JavaScript **control** HTML elements:

```html
<!-- HTML -->
<button id="myButton">Click me!</button>
<p id="message">Original text</p>
```

```javascript
// JavaScript - selecting elements
const button = document.getElementById('myButton');
const message = document.getElementById('message');

// JavaScript - responding to events  
button.addEventListener('click', function() {
    message.textContent = 'Button was clicked!';
    message.style.color = 'blue';
});
```

**Key DOM Methods:**
- `getElementById('id')` - find element by ID
- `querySelector('.class')` - find element by CSS selector
- `addEventListener('event', function)` - respond to user actions
- `textContent` - change text inside element
- `style` - change CSS properties

### Control Flow: Making Decisions

Programs need to make decisions based on conditions:

```javascript
// If/else statements
let hour = 14; // 2 PM

if (hour < 12) {
    console.log("Good morning!");
} else if (hour < 18) {
    console.log("Good afternoon!");
} else {
    console.log("Good evening!");
}

// Loops for repetition
let fruits = ["apple", "banana", "orange"];

for (let i = 0; i < fruits.length; i++) {
    console.log("I like " + fruits[i]);
}

// Modern loop syntax
fruits.forEach(fruit => {
    console.log("I like " + fruit);
});
```

---

## 🛠️ Hands-On Practice

### Practice 1: Variable Basics (10 min)

Open your browser's console (F12) and try these:

```javascript
// Create variables about yourself
let myName = "YOUR_NAME_HERE";
let myAge = YOUR_AGE_HERE;
let isLearningCode = true;
let hobbies = ["reading", "music", "sports"]; // Add your hobbies

// Test them
console.log("My name is " + myName);
console.log("I am " + myAge + " years old");
console.log("Am I learning code? " + isLearningCode);
console.log("My hobbies:", hobbies);
```

### Practice 2: Simple Function (15 min)

Create a function that calculates if someone can vote:

```javascript
function canVote(age, country) {
    let votingAge;
    
    if (country === "USA" || country === "Brazil") {
        votingAge = 18;
    } else if (country === "Argentina") {
        votingAge = 16;
    } else {
        votingAge = 18; // default
    }
    
    return age >= votingAge;
}

// Test your function
console.log(canVote(17, "USA"));       // false
console.log(canVote(18, "USA"));       // true
console.log(canVote(16, "Argentina")); // true
```

### Practice 3: DOM Interaction (20 min)

Create an HTML file with JavaScript:

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Practice</title>
    <style>
        .highlight { background-color: yellow; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <h1 id="title">JavaScript Practice</h1>
    <button id="colorBtn">Change Color</button>
    <button id="hideBtn">Hide/Show Title</button>
    <p id="counter">Clicks: 0</p>
    
    <script>
        // Your JavaScript code here
        let clicks = 0;
        
        document.getElementById('colorBtn').addEventListener('click', function() {
            const title = document.getElementById('title');
            title.classList.toggle('highlight');
            
            clicks++;
            document.getElementById('counter').textContent = 'Clicks: ' + clicks;
        });
        
        document.getElementById('hideBtn').addEventListener('click', function() {
            const title = document.getElementById('title');
            title.classList.toggle('hidden');
        });
    </script>
</body>
</html>
```

---

## 🗣️ English Practice

### Technical Vocabulary

Learn these programming terms:

| Term | Definition | Example |
|------|------------|---------|
| **Variable** | Storage for data | `let name = "John";` |
| **Function** | Reusable code block | `function sayHello() {}` |
| **Parameter** | Function input | `function greet(name) {}` |
| **Event** | User interaction | Click, scroll, keypress |
| **Bug** | Code error | "There's a bug in line 15" |
| **Debug** | Find and fix errors | "I need to debug this function" |

### Speaking Exercise - Problem Solving

Practice explaining technical problems:

**Intermediate Level - Exercise 1:**
> "I have a bug in my JavaScript code. The button click event is not working. I checked the console and there are no error messages. I think the problem is in the event listener."

**Practice phrases:**
- "The function is not returning the expected value"
- "I'm getting an error in the console that says..."
- "The variable is undefined when I try to use it"
- "I need to debug this step by step"

---

## 🧠 Interactive Quiz

[Take Quiz 1: JavaScript Fundamentals](/h5p/fs-quiz1/){: .btn .btn-primary }

**Sample Questions:**

1. **Which of these correctly creates a variable in JavaScript?**
   - a) `variable name = "John";`
   - b) `let name = "John";`
   - c) `create name = "John";`
   - d) `var name == "John";`

2. **What will this code output?**
   ```javascript
   function double(x) {
       return x * 2;
   }
   console.log(double(5));
   ```
   - a) 5
   - b) 10
   - c) 25
   - d) Error

3. **How do you select an HTML element with ID "myButton"?**
   - a) `document.getElement('myButton')`
   - b) `document.getElementById('myButton')`
   - c) `document.select('#myButton')`
   - d) `HTML.get('myButton')`

---

## 💻 Lab Assignment

### Assignment 1: Interactive Portfolio

**Objective:** Add JavaScript functionality to your Week 0 portfolio

**Requirements:**

1. **Interactive Navigation** (25 points)
   - [ ] Smooth scrolling to sections when clicking nav links
   - [ ] Highlight current section in navigation
   - [ ] Mobile-friendly hamburger menu (bonus)

2. **Dynamic Content** (30 points)
   - [ ] "About Me" section with expandable details
   - [ ] Skills section with progress bars or animations
   - [ ] Contact form with basic validation
   - [ ] Dark/light mode toggle (bonus)

3. **User Interactions** (25 points)
   - [ ] Button hover effects and animations
   - [ ] Image gallery or project showcase
   - [ ] "Scroll to top" button that appears after scrolling
   - [ ] Loading animation or welcome message

4. **Code Quality** (20 points)
   - [ ] Clean, well-commented JavaScript
   - [ ] Proper function organization
   - [ ] Error handling for user inputs
   - [ ] No console errors

**Technical Requirements:**
- Minimum 3 interactive features
- At least 5 JavaScript functions
- Event listeners for user interactions
- DOM manipulation examples
- Form validation (if including contact form)

**Starter Code:**

```javascript
// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load saved theme
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Add more functionality here...
```

### Advanced Challenges (Bonus Points)

1. **API Integration** (+10 points)
   - Fetch data from a public API (weather, quotes, etc.)
   - Display the data dynamically on your site

2. **Local Storage** (+10 points)
   - Save user preferences (theme, name, etc.)
   - Remember form data between visits

3. **Animation Library** (+5 points)
   - Use a library like AOS (Animate On Scroll)
   - Create engaging animations for content

---

## 🔧 Debugging Workshop

### Common JavaScript Errors

Learn to identify and fix these common issues:

**1. Syntax Errors**
```javascript
// ❌ Wrong: missing closing bracket
function greet(name {
    return "Hello " + name;
}

// ✅ Correct:
function greet(name) {
    return "Hello " + name;
}
```

**2. Reference Errors**
```javascript
// ❌ Wrong: using undefined variable
console.log(userName); // ReferenceError

// ✅ Correct: declare variable first
let userName = "John";
console.log(userName);
```

**3. Type Errors**
```javascript
// ❌ Wrong: calling non-function
let number = 5;
number(); // TypeError

// ✅ Correct: check before calling
if (typeof number === 'function') {
    number();
}
```

### Debugging Tools

**Chrome DevTools:**
1. **Console**: See errors and log messages
2. **Sources**: Set breakpoints and step through code
3. **Elements**: Inspect HTML/CSS changes from JavaScript

**Debugging Techniques:**
```javascript
// Use console.log to track values
function calculateTip(bill, tipPercent) {
    console.log("Bill:", bill);           // Debug input
    console.log("Tip %:", tipPercent);    // Debug input
    
    let tip = bill * (tipPercent / 100);
    console.log("Calculated tip:", tip);  // Debug calculation
    
    return tip;
}

// Use debugger statement for breakpoints
function complexFunction() {
    let result = someCalculation();
    debugger; // Execution will pause here
    return result;
}
```

---

## 📅 Weekly Schedule

| Day | Activity | Time |
|-----|----------|------|
| **Monday** | Videos 1-2, practice variables and functions | 2.5 hours |
| **Tuesday** | Video 3, practice DOM manipulation | 2 hours |
| **Wednesday** | Video 4, start assignment planning | 2 hours |
| **Thursday** | **Live Session 1**: Debugging workshop | 1 hour |
| **Friday** | Work on assignment, implement features | 3 hours |
| **Saturday** | **Live Session 2**: Code review and Q&A | 1 hour |
| **Sunday** | Final testing, submission, peer review | 1.5 hours |

**Total Time Commitment:** 13 hours

---

## 🎓 Success Criteria

To pass Week 1, you must:
- [ ] Score 75%+ on the JavaScript quiz
- [ ] Submit working interactive portfolio
- [ ] Demonstrate at least 3 JavaScript features
- [ ] Complete debugging exercises in live session
- [ ] Provide helpful peer code reviews

---

## 📖 Additional Resources

**Free Learning Materials:**
- [JavaScript.info](https://javascript.info/) - Comprehensive tutorial
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) - Official documentation
- [FreeCodeCamp](https://www.freecodecamp.org/) - Interactive exercises

**Practice Platforms:**
- [Codecademy JavaScript](https://www.codecademy.com/learn/introduction-to-javascript)
- [JavaScript30](https://javascript30.com/) - 30 projects in 30 days
- [Codewars](https://www.codewars.com/) - Programming challenges

**YouTube Channels:**
- [JavaScript Mastery](https://www.youtube.com/@JavaScriptMastery)
- [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified)
- [Traversy Media](https://www.youtube.com/@TraversyMedia)

---

## 🚀 Week 2 Preview

Next week you'll learn **DOM Manipulation & APIs**:
- Advanced event handling
- Fetching data from external APIs
- Creating dynamic user interfaces
- Form handling and validation
- Introduction to asynchronous programming

Get ready to make your websites truly interactive! 🌟
```

---

# 🌳 **SEMANA 2: DOM MANIPULATION & APIs**

## Archivo: `docs/_collections_dir/fullstack/02-dom-apis.md`

```markdown
---
layout: default
title: "Week 2: DOM Manipulation & APIs"
parent: Full Stack Developer
nav_order: 3
---

# Week 2: DOM Manipulation & APIs 🌳
{: .no_toc }

This week you'll master advanced DOM manipulation and learn to fetch data from external APIs to create dynamic web applications!

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
- [ ] Create and manipulate HTML elements dynamically with JavaScript
- [ ] Handle complex user events and form interactions
- [ ] Fetch data from external APIs using modern JavaScript
- [ ] Display API data in user-friendly formats
- [ ] Handle errors and loading states gracefully
- [ ] Present technical solutions clearly in English

## 📺 Video Lessons

### 1. Advanced DOM Manipulation (30 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_ADVANCED_DOM" title="Advanced DOM Manipulation" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Creating and removing HTML elements with JavaScript
- Event delegation and advanced event handling
- Working with forms and user input validation

### 2. Introduction to APIs (25 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_INTRO_APIS" title="Introduction to APIs" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- What are APIs and how they work
- Understanding JSON data format
- HTTP methods: GET, POST, PUT, DELETE

### 3. Fetch API and Asynchronous JavaScript (35 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_FETCH_API" title="Fetch API Tutorial" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Using the Fetch API to get data
- Promises and async/await syntax
- Error handling for network requests

### 4. Building Dynamic User Interfaces (30 min)
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_DYNAMIC_UI" title="Dynamic UI with APIs" frameborder="0" allowfullscreen></iframe>

**What you'll learn:**
- Displaying API data in HTML templates
- Creating loading states and error messages
- Building a complete weather app example

---

## 📚 Theory & Concepts

### Advanced DOM Manipulation

Beyond selecting existing elements, you can create and modify the page structure:

```javascript
// Creating new elements
const newSection = document.createElement('div');
newSection.className = 'user-card';
newSection.innerHTML = `
    <h3>User Name</h3>
    <p>User email</p>
    <button onclick="deleteUser()">Delete</button>
`;

// Adding to the page
const container = document.getElementById('users-container');
container.appendChild(newSection);

// Removing elements
const elementToRemove = document.getElementById('old-content');
elementToRemove.remove();

// Modifying multiple elements
const allButtons = document.querySelectorAll('.btn');
allButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
```

### Event Delegation

Handle events efficiently for dynamic content:

```javascript
// Instead of adding listeners to each button individually
document.getElementById('users-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const userId = event.target.dataset.userId;
        deleteUser(userId);
    }
    
    if (event.target.classList.contains('edit-btn')) {
        const userId = event.target.dataset.userId;
        editUser(userId);
    }
});
```

### Understanding APIs

An **API (Application Programming Interface)** is a way for different software applications to communicate:

```
Your Website                    External API
┌─────────────────────┐        ┌─────────────────────┐
│  "Get weather for   │   →    │  Weather Service    │
│   Buenos Aires"     │        │  (OpenWeatherMap)   │
│                     │   ←    │                     │
│  Display: 22°C      │        │  Returns: JSON data │
└─────────────────────┘        └─────────────────────┘
```

**Common API Types:**
- **REST APIs**: Most common, use HTTP methods
- **Weather APIs**: Get climate data
- **Social Media APIs**: Access posts, user data
- **Payment APIs**: Process transactions
- **Maps APIs**: Location and navigation data

### Working with JSON

JSON (JavaScript Object Notation) is the standard format for API data:

```javascript
// JSON example from a weather API
const weatherData = {
    "location": "Buenos Aires",
    "temperature": 22,
    "description": "Sunny",
    "humidity": 65,
    "forecast": [
        { "day": "Monday", "temp": 24, "condition": "Cloudy" },
        { "day": "Tuesday", "temp": 20, "condition": "Rainy" }
    ]
};

// Accessing JSON data
console.log(weatherData.temperature);        // 22
console.log(weatherData.forecast[0].day);    // "Monday"
```

### The Fetch API

Modern JavaScript way to make HTTP requests:

```javascript
// Basic fetch request
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => {
        console.log('Users:', data);
        displayUsers(data);
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage('Failed to load users');
    });

// Modern async/await syntax (recommended)
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayUsers(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        showErrorMessage('Failed to load users');
    }
}
```

### Error Handling & User Experience

Always handle errors gracefully:

```javascript
async function fetchWeatherData(city) {
    // Show loading state
    showLoadingSpinner();
    
    try {
        const response = await fetch(`https://api.weather.com/v1/current?q=${city}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else if (response.status === 429) {
                throw new Error('Too many requests. Please try again later.');
            } else {
                throw new Error('Weather service unavailable');
            }
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
    } catch (error) {
        console.error('Weather fetch error:', error);
        showErrorMessage(error.message);
    } finally {
        hideLoadingSpinner();
    }
}

function showLoadingSpinner() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weather-content').style.display = 'none';
}

function showErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}
```

---

## 🛠️ Hands-On Practice

### Practice 1: Dynamic Element Creation (20 min)

Create a simple task list manager:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Task Manager</title>
    <style>
        .task { 
            padding: 10px; 
            border: 1px solid #ddd; 
            margin: 5px 0; 
            display: flex; 
            justify-content: space-between; 
        }
        .completed { background-color: #d4edda; }
    </style>
</head>
<body>
    <h1>My Tasks</h1>
    <input type="text" id="taskInput" placeholder="Enter a new task">
    <button onclick="addTask()">Add Task</button>
    <div id="taskList"></div>

    <script>
        let tasks = [];
        let taskIdCounter = 0;

        function addTask() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
            
            const newTask = {
                id: taskIdCounter++,
                text: taskText,
                completed: false
            };
            
            tasks.push(newTask);
            input.value = '';
            renderTasks();
        }

        function toggleTask(taskId) {
            const task = tasks.find(t => t.id === taskId);
            task.completed = !task.completed;
            renderTasks();
        }

        function deleteTask(taskId) {
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
        }

        function renderTasks() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            
            tasks.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
                taskDiv.innerHTML = `
                    <span onclick="toggleTask(${task.id})" style="cursor: pointer;">
                        ${task.completed ? '✅' : '⭕'} ${task.text}
                    </span>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(taskDiv);
            });
        }

        // Allow adding tasks with Enter key
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    </script>
</body>
</html>
```

### Practice 2: API Integration (30 min)

Create a random quote generator using a public API:

```javascript
// Random quote fetcher
async function getRandomQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const loadingElement = document.getElementById('loading');
    
    // Show loading
    loadingElement.style.display = 'block';
    quoteElement.textContent = '';
    authorElement.textContent = '';
    
    try {
        const response = await fetch('https://api.quotable.io/random');
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        
        // Display the quote
        quoteElement.textContent = `"${data.content}"`;
        authorElement.textContent = `— ${data.author}`;
        
    } catch (error) {
        console.error('Error:', error);
        quoteElement.textContent = 'Failed to load quote. Please try again.';
        quoteElement.style.color = 'red';
    } finally {
        loadingElement.style.display = 'none';
    }
}

// HTML structure needed:
/*
<div id="quote-container">
    <div id="loading" style="display: none;">Loading...</div>
    <blockquote id="quote"></blockquote>
    <p id="author"></p>
    <button onclick="getRandomQuote()">Get New Quote</button>
</div>
*/
```

### Practice 3: Weather App Mini-Project (45 min)

Build a simple weather application:

```javascript
// Weather App - Complete Example
class WeatherApp {
    constructor() {
        this.apiKey = 'demo_key'; // In real project, use environment variables
        this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.init();
    }

    init() {
        const button = document.getElementById('searchButton');
        const input = document.getElementById('cityInput');
        
        button.addEventListener('click', () => this.searchWeather());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWeather();
        });

        // Load weather for default city
        this.getWeather('Buenos Aires');
    }

    async searchWeather() {
        const city = document.getElementById('cityInput').value.trim();
        if (city) {
            await this.getWeather(city);
        }
    }

    async getWeather(city) {
        this.showLoading(true);
        this.clearError();

        try {
            const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found');
                } else if (response.status === 401) {
                    throw new Error('API key invalid');
                } else {
                    throw new Error('Weather service unavailable');
                }
            }

            const data = await response.json();
            this.displayWeather(data);

        } catch (error) {
            console.error('Weather error:', error);
            this.showError(error.message);
        } finally {
            this.showLoading(false);
        }
    }

    displayWeather(data) {
        const weatherDiv = document.getElementById('weatherDisplay');
        
        weatherDiv.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>
                <div class="temperature">${Math.round(data.main.temp)}°C</div>
                <div class="description">${data.weather[0].description}</div>
                <div class="details">
                    <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind: ${data.wind.speed} m/s</p>
                </div>
            </div>
        `;
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        loading.style.display = show ? 'block' : 'none';
    }

    showError(message) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    clearError() {
        const errorDiv = document.getElementById('error');
        errorDiv.style.display = 'none';
    }
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
```

---

## 🗣️ English Practice

### Technical Vocabulary - APIs & Async Programming

| Term | Definition | Example |
|------|------------|---------|
| **API** | Application Programming Interface | "We fetch data from the weather API" |
| **Endpoint** | Specific URL for API access | "The users endpoint is /api/users" |
| **Fetch** | Get data from server | "We fetch the latest posts" |
| **Async** | Non-blocking operation | "This is an async function" |
| **Promise** | Future result of async operation | "The fetch returns a promise" |
| **JSON** | Data format for APIs | "The API returns JSON data" |

### Speaking Exercise - Technical Explanations

**Advanced Level - Exercise 1:**
> "I implemented an asynchronous function that fetches weather data from an external API. The function handles errors gracefully and displays loading states while waiting for the response. If the API returns a 404 status, we show a user-friendly message saying the city was not found."

**Practice phrases:**
- "The API request failed with a 500 error"
- "I'm implementing error handling for network requests"
- "The function returns a promise that resolves with user data"
- "We need to validate the JSON response before displaying it"

---

## 🧠 Interactive Quiz

[Take Quiz 2: DOM & APIs](/h5p/fs-quiz2/){: .btn .btn-primary }

**Sample Questions:**

1. **Which method creates a new HTML element?**
   - a) `document.createElement()`
   - b) `document.newElement()`
   - c) `document.makeElement()`
   - d) `document.addElement()`

2. **What does API stand for?**
   - a) Application Programming Internet
   - b) Application Programming Interface
   - c) Automated Programming Interface
   - d) Advanced Programming Instructions

3. **Which is the correct way to handle a fetch promise?**
   - a) `fetch(url).then(data => console.log(data))`
   - b) `fetch(url).then(response => response.json()).then(data => console.log(data))`
   - c) `fetch(url).json().then(data => console.log(data))`
   - d) `fetch(url, json()).then(data => console.log(data))`

---

## 💻 Lab Assignment

### Assignment 2: Dynamic Web Application

**Objective:** Build a dynamic web application that fetches and displays data from external APIs

**Choose ONE project:**

#### Option A: Personal Dashboard
Create a personal dashboard with multiple widgets:
- **Weather widget** showing current conditions
- **Quote of the day** from quotes API  
- **News headlines** from news API
- **To-do list** with local storage persistence

#### Option B: Movie/Book Search App
Create a search application:
- Search movies/books using external API (OMDB, Google Books)
- Display results in cards with images and details
- Add favorites functionality with local storage
- Implement pagination for large result sets

#### Option C: GitHub Profile Explorer
Create a GitHub user explorer:
- Search GitHub users by username
- Display user profile information and repositories
- Show repository statistics and languages
- Add ability to compare two users

**Requirements (All Options):**

1. **API Integration** (30 points)
   - [ ] Successfully fetch data from at least 2 external APIs
   - [ ] Handle different types of API responses
   - [ ] Implement proper error handling for failed requests
   - [ ] Show loading states during API calls

2. **Dynamic DOM Manipulation** (25 points)
   - [ ] Create and remove HTML elements dynamically
   - [ ] Update content without page refresh
   - [ ] Implement interactive features (buttons, forms, etc.)
   - [ ] Use event delegation where appropriate

3. **User Experience** (20 points)
   - [ ] Responsive design that works on mobile
   - [ ] Clear loading indicators and error messages
   - [ ] Intuitive navigation and user interface
   - [ ] Smooth animations or transitions

4. **Code Quality** (25 points)
   - [ ] Well-organized JavaScript functions
   - [ ] Proper error handling and edge case management
   - [ ] Clean, commented code with good naming
   - [ ] No console errors in production

**Starter Template:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Dynamic App</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .card { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .loading { text-align: center; padding: 20px; }
        .error { color: #e74c3c; background: #fadbd8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .btn { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        .btn:hover { background: #2980b9; }
    </style>
</head>
<body>
    <div class="container">
        <h1>My Dynamic Application</h1>
        
        <!-- Loading indicator -->
        <div id="loading" class="loading" style="display: none;">
            Loading...
        </div>
        
        <!-- Error messages -->
        <div id="error" class="error" style="display: none;"></div>
        
        <!-- Main content area -->
        <div id="content">
            <!-- Your dynamic content goes here -->
        </div>
    </div>

    <script>
        class MyApp {
            constructor() {
                this.init();
            }

            init() {
                console.log('App initialized');
                // Your initialization code here
            }

            showLoading(show = true) {
                document.getElementById('loading').style.display = show ? 'block' : 'none';
            }

            showError(message) {
                const errorDiv = document.getElementById('error');
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
            }

            clearError() {
                document.getElementById('error').style.display = 'none';
            }

            // Add your methods here
        }

        // Start the application
        document.addEventListener('DOMContentLoaded', () => {
            new MyApp();
        });
    </script>
</body>
</html>
```

### Free APIs to Use:

**No API Key Required:**
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API for testing
- [Random Quotes](https://api.quotable.io/random) - Inspirational quotes
- [Dog API](https://dog.ceo/dog-api/) - Random dog images
- [Cat Facts](https://catfact.ninja/) - Random cat facts

**Free with Registration:**
- [OpenWeatherMap](https://openweathermap.org/api) - Weather data
- [News API](https://newsapi.org/) - News headlines
- [OMDB](http://www.omdbapi.com/) - Movie database
- [GitHub API](https://docs.github.com/en/rest) - Repository and user data

---

## 🔧 Advanced Topics & Best Practices

### Handling Different API Response Types

```javascript
// Text response
const textResponse = await fetch('/api/status');
const statusText = await textResponse.text();

// JSON response
const jsonResponse = await fetch('/api/users');
const users = await jsonResponse.json();

// Blob response (for images)
const imageResponse = await fetch('/api/image/123');
const imageBlob = await imageResponse.blob();
const imageUrl = URL.createObjectURL(imageBlob);

// Check response type before parsing
async function fetchData(url) {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    } else if (contentType && contentType.includes('text/')) {
        return await response.text();
    } else {
        return await response.blob();
    }
}
```

### Performance Optimization

```javascript
// Debounce search input to avoid too many API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage
const searchInput = document.getElementById('search');
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

// Cache API responses to avoid repeated requests
class APICache {
    constructor() {
        this.cache = new Map();
        this.expiryTime = 5 * 60 * 1000; // 5 minutes
    }

    set(key, data) {
        const expiry = Date.now() + this.expiryTime;
        this.cache.set(key, { data, expiry });
    }

    get(key) {
        const cached = this.cache.get(key);
        if (cached && cached.expiry > Date.now()) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }
}
```

---

## 📅 Weekly Schedule

| Day | Activity | Time |
|-----|----------|------|
| **Monday** | Videos 1-2, practice DOM manipulation | 3 hours |
| **Tuesday** | Videos 3-4, API practice exercises | 2.5 hours |
| **Wednesday** | Start assignment, choose project option | 3 hours |
| **Thursday** | **Live Session 1**: API integration workshop | 1 hour |
| **Friday** | Complete core features, testing | 3 hours |
| **Saturday** | **Live Session 2**: Code review and debugging | 1 hour |
| **Sunday** | Final polishing, submission, peer review | 2 hours |

**Total Time Commitment:** 15.5 hours

---

## 🎓 Success Criteria

To pass Week 2, you must:
- [ ] Score 80%+ on the DOM & APIs quiz
- [ ] Submit fully functional web application
- [ ] Successfully integrate at least 2 external APIs
- [ ] Demonstrate proper error handling and loading states
- [ ] Participate actively in live sessions
- [ ] Provide constructive peer reviews

---

## 🆘 Common Challenges & Solutions

### Challenge 1: CORS Errors
**Problem:** Browser blocks API requests due to CORS policy
**Solution:** Use APIs that support CORS or a proxy service

### Challenge 2: API Rate Limits
**Problem:** Too many requests, API returns 429 error
**Solution:** Implement debouncing and caching

### Challenge 3: Inconsistent API Responses
**Problem:** API sometimes returns different data structures
**Solution:** Always validate and provide fallback values

```javascript
// Safe property access
const userName = data?.user?.name || 'Unknown User';
const userEmail = data?.user?.email || 'No email provided';
```

---

## 🚀 Week 3 Preview

Next week you'll dive into **Backend Development**:
- Node.js and Express server setup
- Creating REST APIs
- Database integration with MongoDB
- Authentication and user management
- Deployment to cloud platforms

You're becoming a real full-stack developer! 💪

---

**🎉 Congratulations on completing Week 2!** You now have the skills to create dynamic, data-driven web applications. Keep practicing and building!
```

---

# 📋 **QUIZZES INTERACTIVOS**

## Archivo: `docs/h5p/fs-quiz0/index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz 0: HTML/CSS Fundamentals</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f8fafc;
            color: #1e293b;
        }
        .quiz-container { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .question { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; background: #fafbfc; }
        .question h3 { margin-top: 0; color: #0f172a; }
        .options label { display: block; padding: 8px; margin: 5px 0; cursor: pointer; border-radius: 4px; }
        .options label:hover { background: #f1f5f9; }
        .options input[type="radio"] { margin-right: 8px; }
        .btn { padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #2563eb; }
        .result { margin: 20px 0; padding: 20px; border-radius: 8px; font-weight: 500; }
        .score-excellent { background: #d1fae5; color: #059669; border-left: 4px solid #10b981; }
        .score-good { background: #fef3c7; color: #d97706; border-left: 4px solid #f59e0b; }
        .score-needs-work { background: #fee2e2; color: #dc2626; border-left: 4px solid #ef4444; }
        .explanation { margin-top: 10px; padding: 10px; background: #f8fafc; border-radius: 4px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="quiz-container">
        <h1>Quiz 0: HTML/CSS Fundamentals 🌱</h1>
        <p>Test your knowledge from Week 0. This quiz covers HTML structure, CSS basics, and development environment setup.</p>

        <div id="quiz-questions">
            <div class="question">
                <h3>1. Which HTML tag is used to define the main content of a webpage?</h3>
                <div class="options">
                    <label><input type="radio" name="q1" value="a"> &lt;content&gt;</label>
                    <label><input type="radio" name="q1" value="b"> &lt;main&gt;</label>
                    <label><input type="radio" name="q1" value="c"> &lt;body&gt;</label>
                    <label><input type="radio" name="q1" value="d"> &lt;section&gt;</label>
                </div>
            </div>

            <div class="question">
                <h3>2. What does CSS stand for?</h3>
                <div class="options">
                    <label><input type="radio" name="q2" value="a"> Computer Style Sheets</label>
                    <label><input type="radio" name="q2" value="b"> Cascading Style Sheets</label>
                    <label><input type="radio" name="q2" value="c"> Creative Style System</label>
                    <label><input type="radio" name="q2" value="d"> Coded Style Syntax</label>
                </div>
            </div>

            <div class="question">
                <h3>3. Which CSS property is used to change text color?</h3>
                <div class="options">
                    <label><input type="radio" name="q3" value="a"> text-color</label>
                    <label><input type="radio" name="q3" value="b"> font-color</label>
                    <label><input type="radio" name="q3" value="c"> color</label>
                    <label><input type="radio" name="q3" value="d"> background-color</label