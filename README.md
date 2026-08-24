# Ranking90 - Coming Soon

A basic ranking website launch page with a countdown timer to December 11, 2026.

## Features

- Modern, responsive design
- Live countdown timer to launch date
- Email subscription form for notifications
- Professional gradient background
- Mobile-friendly layout

## Files

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and responsive design
- `script.js` - Countdown timer and form handling
- `.gitignore` - Git ignore configuration

## Setup Instructions

### Local Development

1. Clone this repository
2. Open `index.html` in your web browser
3. The countdown timer will automatically start

### GitHub Pages Deployment

1. Create a new repository on GitHub
2. Push your code to the repository
3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages
   - Select source as "main" branch
   - Click Save
4. Your site will be available at `https://yourusername.github.io/repository-name`

## Customization

### Change Launch Date

Edit the launch date in `script.js`:
```javascript
const launchDate = new Date('December 11, 2026 00:00:00').getTime();
```

### Modify Colors

Update the gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Text Content

Edit the text in `index.html` to customize:
- Logo/brand name
- Tagline
- Launch information

## License

Free to use for personal and commercial projects.