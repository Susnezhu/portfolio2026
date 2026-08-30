# Susnezhu Portfolio

A personal portfolio website created to showcase my projects, skills, experience, and background as a Full Stack Developer.

The website is built with JavaScript, HTML and CSS. It uses a simple content-driven structure where content is stored in JSON files and rendered dynamically with JavaScript.

The main goal of the project is to keep the website easy to maintain while still having a personal and interactive design.

## Features

* Features
* Multi-language support in English, Finnish and Russian
* Dynamic page rendering with JavaScript
* Navigation between different portfolio pages
* Content separated from rendering logic
* Language selection saved in localStorage
* Personal information and skills
* Links to GitHub, LinkedIn, TikTok and Instagram
* Downloadable CV
* Font Awesome icons
* Custom visual design

## Pages

The portfolio currently includes:

* Home
  Short introduction, current status, location, social links and contact actions.
* About
  Information about my background, how I approach problems, my programming journey and what I currently work with.
* Projects
  A collection of personal and educational projects with descriptions and links to their repositories.
* Contact
  Contact and social media information.

## Technologies

* JavaScript
* HTML/CSS
* JSON
* LocalStorage
* Font Awesome

No frontend framework is used in this project.

## Content Management

The website separates content from the rendering logic.

Each supported language has its own JSON file containing the text used throughout the website. JavaScript loads the language file and renders the current page dynamically.

For example:

lang_data/
├── en.json
├── fi.json
└── ru.json

This means that changing text or adding translated content does not require rewriting the page structure.

The selected language is stored in localStorage, so it remains selected when the visitor returns to the website.

## Dynamic Rendering

Instead of creating separate HTML files for every portfolio page, the website uses JavaScript functions to render the content depending on the current page.

The navigation and page content are generated dynamically from the selected language data.

The basic structure is:

User selects language -> Language JSON is loaded -> Current page is rendered with current language

This keeps the HTML structure simple and allows the content to be managed separately from the application logic.

## Why I Built It This Way

I wanted to create a portfolio that I could continue updating without constantly changing the HTML structure or rewriting the same code.

Separating the content from the rendering logic also gave me an opportunity to experiment with dynamic rendering, reusable JavaScript structures and multi-language content without using a framework.

At the same time, I wanted the website to feel personal rather than looking like a generic developer portfolio.

## Live Website

https://susnezhu.github.io/portfolio2026/

## Repository

https://github.com/Susnezhu/portfolio2026

## Author

Created and designed by Susnezhu.
