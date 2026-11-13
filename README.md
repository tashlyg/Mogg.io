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
| `profile.html` | Sign-up, login, and a locally stored demo profile with logout |

## Project Structure

```
Mogg.io/
├── index.html
├── about1.html
├── about2.html
├── contacts.html
├── gallery.html
├── profile.html
├── css/
│   └── style.css
├── js/
│   ├── scripts.js
│   ├── assignment5.js
│   └── challenges.js
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
| Navigation bar | Five links on every page, including My Profile, with a hamburger menu below 992px |
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

## Assignment 5 (tasks 1-5)

Examples use plain JavaScript in `js/assignment5.js` and `js/challenges.js` and
continue the existing website. Earlier assignment features remain in
`js/scripts.js`.

### Task 1: DOM manipulation and styling

Open `index.html` and find **Build Your Daily Routine**.

- **Read more** shows extra advice; **Read less** hides it again.
- Click a star to select a rating and update the message below it.
- For the defense: `getElementById` selects one element, while `querySelectorAll`
  selects all five stars. `textContent` changes text, `style.display` shows or
  hides advice, and `style.color` colors the stars. `setAttribute` updates
  `aria-expanded` and `aria-pressed` so the controls describe their current state.

### Task 2: Event handling

Open **Plan Your Routine** on `index.html`.

- Click **Show current time** to display the time at that click.
- Enter your name, click **Next**, and choose a focus. **Back** returns to the
  first step without clearing either input. **Save my plan** displays a summary
  without reloading the page. The plan lasts for the current page visit.
- Focus a link in the top navigation on any page, then use the arrow keys to
  move between links. Navigation wraps from the last link to the first and back.
  On mobile, open the hamburger menu first.
- For the defense: `addEventListener` registers callbacks. `goToNextStep` is a
  named callback that validates the name and calls `showStep`. The `currentStep`
  variable tracks progress, and `hidden` changes the visible step without
  deleting its inputs. `preventDefault` stops form submission from reloading
  the page. The keyboard handler uses `switch (event.key)` to choose a direction,
  then `focus()` moves to that link. `%` wraps the link index.

### Task 3: JavaScript advanced concepts

Open **Daily Basics** on `index.html`.

- The habit list and its 15-minute total are created from JavaScript data.
- **Mark routine done** plays a short local sound, moves the card upward, and
  changes its color. **Start again** stops the sound and resets the card.
- For the defense: `dailyRoutine` is an object with a `title`, a `habits` array,
  and the `getTotalMinutes` method. `this` refers to that object. A `for` loop
  adds the minutes. `forEach` is a higher-order function because it accepts a
  callback; the callback creates each list item with `createElement` and
  `appendChild`. `classList.toggle` triggers the CSS transition. `play`, `pause`,
  and `currentTime` control one audio element so sounds do not overlap.
- The sound file is `assets/routine-complete.wav`; it needs no external service.
  Reduced-motion settings disable the movement.

### Task 4: Structure and separation of concerns

- HTML files contain page structure and accessible controls, `css/style.css`
  contains presentation, and external JavaScript files contain behavior.
  The contact icon's inline dimensions were moved into the `contact-icon` class.
- `js/assignment5.js` uses separate named initialization functions for read-more,
  ratings, check-in time, menu navigation, the planner, and the daily routine.
  Each function keeps its variables local and skips pages without that feature.
- Repeated state changes are handled by functions such as `showStep` and
  `updateChallenge`. Meaningful variable names and short comments explain logic.
- For the defense: scripts load after the HTML, so the controls already exist
  when initialization runs. Event listeners connect controls to behavior without
  inline event handlers. Task 1 still demonstrates JavaScript's `style` API;
  those dynamic changes live in the external script, not in HTML attributes.

### Task 5: Creativity and engagement

Open **Daily Mogg Challenge** on `index.html`.

- Complete three small habits based on grooming, movement, and confidence.
  Click a habit card or use Tab and Space to check it off.
- **Pick my next habit** suggests an unfinished habit, highlights its card,
  and focuses its checkbox. It avoids the previous suggestion when possible.
- The progress bar, count, and encouragement update together. Completing all
  three earns the **Daily Mogg Champion!** badge with a short animation.
- Uncheck a habit to undo it or use **Start fresh** to reset the challenge.
  Progress lasts for the current page visit. The layout stacks on small screens,
  status updates are announced to screen readers, and reduced-motion settings
  disable the celebration animation.
- For the defense: `js/challenges.js` keeps checkbox state as the source of truth.
  `filter` counts completed habits and finds suggestions; `Math.random` picks a
  suggestion. `updateChallenge` synchronizes progress, messages, button states,
  and CSS classes. Task 3 supplies the separate sound interaction.

### Quick defense demo

1. Show and hide the extra advice, then select a high and a low star rating.
2. Show the time. Move through the planner and back to show that inputs remain.
   Focus a top navigation link and demonstrate arrow-key navigation.
3. Explain the habit object, loop, and callback. Complete and restart the routine
   to demonstrate the sound and transition.
4. Show the separate HTML, CSS, and JavaScript files and the named initialization
   functions. Point out the contact icon class and the absence of inline handlers.
5. Ask for a suggested challenge habit, complete all three, undo one, and reset.
   Demonstrate the checkboxes with the keyboard and the layout on a narrow screen.

## Assignment 6

The examples use jQuery in `js/script.js` on `index.html`; `gallery.html` also
loads the script for lazy loading.

- **Task 0:** jQuery 4.0.0 loads from the CDN in the HTML head. The external
  script uses `$(document).ready()` and prints `jQuery is ready!` in the console.
- **Task 1:** type in **Find a Daily Habit** to filter six tips immediately.
  Matching ignores case and extra spaces at the ends. Clear the field to show
  all tips; an unmatched search displays a message. Uses `.on()`, `.each()`,
  `.text()`, and `.toggle()`.
- **Task 2:** the same field offers matching tip names in a dropdown. Select
  one by clicking it or using Tab and Enter. Escape or clicking outside closes
  the dropdown. Empty and unmatched searches show no suggestions.
- **Task 3:** searching also highlights every matching occurrence in page text,
  ignoring case. Clear the field to remove the highlights. A regular expression
  finds matches, and `<mark>` elements wrap them. Only text nodes change, so
  existing controls keep working. Search symbols are treated literally, and
  form values, scripts, and the suggestions dropdown are excluded.
- **Task 4:** the orange gradient bar at the top fills as you scroll. Its width
  is the scroll position divided by the scrollable page height, multiplied by
  100. It updates on scrolling, resizing, loading, and filtering the tips.
- **Task 5:** **Your Routine at a Glance** counts up to 6 tips, 3 daily habits,
  and 15 minutes. jQuery `.animate()` updates the numbers over 1.5 seconds when
  the section first enters view. Each counter finishes at its exact target and
  does not restart on later scrolls. Reduced-motion settings skip the animation.
- **Task 6:** enter a valid email in **Try a Routine Reminder** and click
  **Submit**. The button shows a spinner and **Please wait...**, then disables
  itself for a simulated 1.5-second request. It returns to **Submit** afterward,
  with a completion message. Invalid emails use browser validation; repeated
  submits during the delay are ignored. This demo never sends or stores the
  email. Uses `.on("submit")`, `.prop()`, `.text()`, and `setTimeout`.
- **Task 7:** completing the reminder demo also shows a notification in the
  bottom-right corner. It stays for three seconds, then fades out. The latest
  action replaces the previous message and restarts its timer. A polite live
  region announces feedback without moving focus. Uses `.fadeIn()`, `.fadeOut()`,
  `.stop()`, and `clearTimeout`; reduced-motion settings skip the fades.
- **Task 8:** **Keep Your Routine Handy** has two snippets with **Copy** buttons.
  A successful copy changes the icon to a checkmark, displays **Copied!**, and
  opens a **Copied to clipboard!** tooltip for 2.5 seconds. Escape dismisses the
  tooltip, and a notification also announces success. Clipboard permission
  failures show a manual-copy message without claiming success. Uses the
  Clipboard API with `.on("click")`, `.text()`, and `.prop()`; browsers without
  that API use a temporary textarea and `execCommand("copy")`, restoring focus
  and selection afterward. The buttons also work with Tab and Enter or Space.
- **Task 9:** homepage challenge/card images and all nine gallery fish start
  with tiny inline placeholders. `IntersectionObserver` detects entry into the
  viewport; jQuery `.attr("src")` then loads the real `data-src` image once.
  Hidden carousel slides wait until they are shown. The logo loads immediately.
  Existing icon dimensions, card image heights, and the carousel's 4:3 frame
  reserve space, and loaded images fade in (unless reduced motion is enabled).
  Older browsers fall back to scroll, resize, and carousel events plus viewport
  bounds checks. The stats initializer skips pages without counters.

### Tasks 6-9 review demo

1. Submit an invalid email, then a valid one. Confirm the busy button ignores
   repeated submits and returns to normal after 1.5 seconds.
2. Watch the completion notification disappear. Submit again before it hides
   to see the notification timer restart.
3. Copy each snippet, paste it into your notes, and check the checkmark and
   tooltip. Try keyboard activation and Escape; blocked clipboard permission
   should display a manual-copy message.
4. Reload at the top with the browser's Network panel open. Scroll to the
   illustrations, then open the gallery and switch slides. Image files should
   be requested only as their images enter view; revisiting a slide reuses it.

## Light and dark modes

Use the **Dark mode** switch in **Explore Mogg.io** on any of the six pages.
Unchecked selects light mode; checked selects dark mode. The choice is stored
under `mogg.theme` in localStorage and restored before styles load, including
when navigating between pages. Open tabs and Back/Forward navigation also sync
the preference. If storage is blocked, the switch still works for the visit.

`js/theme.js` sets Bootstrap's `data-bs-theme` attribute and updates the switch
and status text. CSS variables swap background and text colors while keeping
images and videos in their original colors. Cards, tables, forms, field errors,
ratings, search suggestions, completed habits, and carousel controls adapt too.
The earlier background-color demo uses matching light/dark color variants.

## Final project part 5

The account and validation features cover part 5; the existing live habit search supplies 5.3.

- **5.1 Authentication simulation:** choose **My Profile** in the navigation on
  any page. Create an account with a name, email, phone number, password, and
  matching confirmation. Sign-up stores accounts in `localStorage` under
  `mogg.users`; email addresses are trimmed and lowercased, and duplicate emails
  are rejected. Log In checks the saved credentials, stores the active email in
  `mogg.currentUser`, and redirects to `profile.html`. The profile displays the
  saved name, email, and phone, plus working links to habits and the challenge.
  Log Out removes the active session but keeps registered accounts. Reloading
  preserves login; missing or invalid sessions show the login form instead.
- **5.2 Form validation:** `js/validation.js` shares validation rules between
  sign-up, login, the contact form, the reminder, and the two-step planner.
  All forms use `novalidate`. JavaScript checks required fields and applicable
  email, password, confirmation, phone, and focus values. Passwords need 8–32
  characters, uppercase and lowercase letters, a digit and a symbol, with no
  whitespace. Phones accept 10–15 digits, an optional leading +, spaces,
  parentheses and hyphens. Errors appear beside fields, are associated through
  `aria-describedby`, and focus moves to the first invalid field. No alerts,
  `required`, `pattern`, length attributes, or `type="email"` validation is used.
- **5.3 Search/filtering:** **Find a Daily Habit** on the homepage already filters
  six tips as you type, offers title suggestions, and handles no-match and clear
  states. Profile links take visitors directly to that search. Saving results
  is optional in the requirements, so the search remains per visit.

This is deliberately a frontend classroom simulation: passwords are stored as
plain text locally, accounts are browser-specific, and the session marker is
editable. It does not provide real authentication or protect sensitive data.
Use made-up details and a test password. For consistent storage, serve all pages
from the same origin (for example GitHub Pages or a local development server);
`file://` storage behavior varies between browsers. No backend or email is used.

### Part 5 demo

1. Open My Profile, choose Create an account, and submit empty/invalid values.
   Try a malformed email, weak password, short phone, and mismatched passwords.
2. Register valid demo details, then attempt the same email with different case.
   Confirm the duplicate is rejected.
3. Log in with an incorrect password, then the correct one. Confirm the profile
   shows saved details without displaying the password, including after reload.
4. Log out and revisit My Profile. Confirm the login form returns. Sign in again
   to show that registration persists.
5. Check contact, reminder and planner errors, then search for `walk` and an
   unmatched word on the homepage. Clear the search to restore all six tips.

## Live Site

Hosted via GitHub Pages: _https://tashlyg.github.io/Mogg.io/_
