# Mogg.io

A small multi-page website built for the HTML, CSS, and Bootstrap assignments,
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
| `contacts.html` | Responsive Bootstrap form with name, email, color picker, message type radios, message, and reply checkbox |
| `gallery.html` | Nine-image Bootstrap fish carousel with captions, indicators, and previous/next controls |

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
- HTML and CSS with no build tools required
- Bootstrap 5.3.8 CSS and JavaScript bundle loaded through jsDelivr CDN
- Shared custom styles in `css/style.css`, loaded after Bootstrap
- CSS custom properties, Flexbox, Grid, and media queries

## Implemented Features

| Feature | Implementation |
|---|---|
| Responsive typography | Body text uses 14px on mobile, 16px from 768px, and 18px from 1024px |
| Bootstrap grid | Containers, rows, and responsive columns; the homepage introduction and video use `col-lg-6` |
| Spacing utilities | Bootstrap padding, margin, and gap classes, including responsive variants |
| Navigation bar | Four links on every page, with a hamburger menu below 992px |
| Buttons | Primary, secondary, and outline buttons, a small button group, and a large form submit button |
| Carousel | Nine fish images with captions, nine indicators, and previous/next controls in `gallery.html` |
| Cards | Three homepage cards use `card-group`, `card-img-top`, `card-body`, and `card-title`; they stack below 992px |
| Responsive form | `form-control`, `input-group`, `form-check`, and `row g-3`; name and email share a row from 768px |
| Accessibility | Associated form labels, grouped radio buttons, navigation labels, table column headers, and visible keyboard focus styles |

The homepage, gallery, and contact page use Bootstrap columns for the sidebar
and main content, stacking them on smaller screens. The about pages retain their
custom CSS Grid layout.

The contact form demonstrates frontend controls only; it is not connected to a
backend or email service.

## Running Locally

1. Clone the repo:
   ```
   git clone https://github.com/tashlyg/Mogg.io.git
   ```
2. Open `index.html` in your browser — no build step or server required.

An internet connection is needed to load Bootstrap from the CDN and the embedded
YouTube video.

## Assignment 5 (tasks 1, 2, and 3 only)

New examples use plain JavaScript in `js/assignment5.js` and continue the existing
website. Earlier assignment features remain in `js/scripts.js`.

### Task 1: DOM manipulation and styling

Open `index.html` and find **Build Your Daily Routine**.

- **Read more** shows extra advice; **Read less** hides it again.
- Click a star to select a rating and update the message below it.
- For the defense: `getElementById` selects one element, while `querySelectorAll`
  selects all five stars. `textContent` changes text, `style.display` shows or
  hides advice, and `style.color` colors the stars. `setAttribute` updates
  `aria-expanded` and `aria-pressed` so the controls describe their current state.

## Live Site

Hosted via GitHub Pages: _https://tashlyg.github.io/Mogg.io/_
