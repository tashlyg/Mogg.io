# Mogg.io

A small multi-page website built for the HTML & CSS Basics assignment,
themed around grooming, style, and general "looksmaxxing" tips.

## Team

| Name | Role |
|---|---|
| Bekzhan Duzeldikov | Built `about1.html`, contributed to shared styling |
| Didar Marat | Built `about2.html`, contributed to shared styling |

## Pages

| File | Description |
|---|---|
| `index.html` | Homepage with mogging/looksmaxxing tips (skincare, grooming, posture, fitness, confidence) |
| `about1.html` | About page for Bekzhan, with bio, hobbies table, routine, and goals |
| `about2.html` | About page for Didar, with bio, hobbies table, fish tier list, and goals |
| `contacts.html` | Contact page with a form (name, email, color picker, message) |
| `gallery.html` | Didar's nine-image fish gallery with hover and keyboard-focus captions |

## Project Structure

```
Mogg.io/
├── index.html
├── about1.html
├── about2.html
├── contacts.html
├── gallery.html
├── css/
│   └── style.css
├── assets/
│   ├── beka.jpg
│   ├── fish.png
│   ├── contactus.png
│   ├── mogg_face.png
│   ├── skincare.png
│   ├── grooming.png
│   ├── posture.png
│   └── fih/ (fih1.png through fih9.png)
└── README.md
```

## Tech Used

- HTML5 (semantic tags, tables, forms, lists)
- CSS3 (custom properties, Flexbox, Grid, box model) — no frameworks
- All pages share a single stylesheet: `css/style.css`
- Flexbox navigation and equal-height homepage cards with a hover effect
- Grid page layout with a header, left sidebar, main content, and full-width footer
- Three-column image gallery with equal-sized cells and caption overlays

## Running Locally

1. Clone the repo:
   ```
   git clone https://github.com/tashlyg/Mogg.io.git
   ```
2. Open `index.html` in your browser — no build step or server required.

## Live Site

Hosted via GitHub Pages: _https://tashlyg.github.io/Mogg.io/_
