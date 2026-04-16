# Study Portal

A simple, clean, and fully working study portal website built with **HTML, CSS, and JavaScript** only (no backend required).

## 🎯 Features

### User Features
- **Simple Login**: Enter only your name to access the dashboard
- **Persistent Sessions**: Username stored in localStorage
- **Study Dashboard**: Access list of study materials
- **External Links**: Open study materials in new tabs
- **Responsive Design**: Works on desktop and mobile devices

### Admin Features
- **Secure Login**: Email and password authentication
- **Add Materials**: Add new study material links
- **Delete Materials**: Remove outdated materials
- **Real-time Updates**: Changes reflect instantly for all users

## 📁 Project Structure

```
BCA-2/
├── index.html              # User login page
├── dashboard.html          # User dashboard
├── admin.html              # Admin login page
├── admin-dashboard.html    # Admin panel
├── app.js                  # Shared JavaScript logic
├── styles.css              # Responsive styling
├── server.js               # Local development server
├── package.json            # Project metadata
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔐 Admin Credentials

```
Email:    10717vishal@gmail.com
Password: Vishal@@2004
```

⚠️ **Note**: Credentials are only in the client-side code for this demo. For production, use proper authentication backends.

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended for Deployment)

1. Push to GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch → main**
4. Your site will be live at: `https://<username>.github.io/<repo>/`

### Option 2: Local Development Server

Requires Node.js installed.

```bash
# Install dependencies
npm install

# Start the server
npm start

# Access the application
# Open http://localhost:3000 in your browser
```

### Option 3: Direct File Access (Simple Method)

1. Clone the repository
2. Open `index.html` directly in your browser
3. The application will work using localStorage

## 🌐 Alternative Deployment Options

### Vercel (Recommended)

1. Create account at [vercel.com](https://vercel.com)
2. Import this GitHub repository
3. Click "Deploy"
4. Your site will be live in seconds

**Vercel URL**: `https://your-project-name.vercel.app`

### Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the project folder or connect GitHub
3. Your site will be live instantly

**Netlify URL**: `https://your-project.netlify.app`

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### AWS S3 + CloudFront

1. Upload files to S3 bucket
2. Configure CloudFront distribution
3. Point domain to CloudFront URL

## 💾 Data Storage

- All data is stored in **localStorage** (client-side)
- No database or backend required
- Data persists in the browser
- Clearing browser cache will reset data

### localStorage Keys

```javascript
studyAppUser       // Current logged-in user
studyAppAdmin      // Admin login status
studyMaterials     // Array of study materials
```

## 📱 Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Change Admin Credentials

Edit `admin.html` and find:

```javascript
const ADMIN_EMAIL = '10717vishal@gmail.com';
const ADMIN_PASSWORD = 'Vishal@@2004';
```

Replace with your desired credentials.

### Change Colors/Styling

Edit `styles.css` and modify the CSS variables:

```css
:root {
  --primary: #3c68ff;      /* Button color */
  --danger: #f05454;       /* Delete button color */
  --success: #2dce89;      /* Success alerts */
  --text: #24355c;         /* Text color */
}
```

### Add Default Materials

Edit `app.js` and update the `defaultMaterials` array:

```javascript
const defaultMaterials = [
  { title: 'Your Title', url: 'https://example.com' },
  // Add more...
];
```

## 🔒 Security Notes

1. **Client-side only**: This is a demo application
2. **No real authentication**: Credentials are hardcoded
3. **localStorage is not secure**: For production, use:
   - Real authentication backends (Firebase, Auth0)
   - Encrypted sessions
   - HTTPS connections
4. **Never deploy real passwords**: Use environment variables

For a production application:
- Use proper authentication backends
- Validate all inputs server-side
- Use HTTPS
- Implement proper access controls
- Use secure databases

## 📝 Features Checklist

- ✅ User login with name only
- ✅ User dashboard with welcome message
- ✅ Study materials list with external links
- ✅ Admin login with email/password
- ✅ Add new materials
- ✅ Delete existing materials
- ✅ localStorage persistence
- ✅ Responsive design
- ✅ Input validation
- ✅ Success/error alerts
- ✅ Session management
- ✅ Clean UI

## 🐛 Troubleshooting

### "Cannot find index.html"
- Ensure you're running the server from the project root directory
- Check that all HTML files exist in the directory

### localStorage not working
- Ensure you're not in private/incognito mode
- Some browsers limit localStorage in local file access
- Use the Node.js server (`npm start`) instead

### Admin credentials not working
- Ensure you're entering exactly: `10717vishal@gmail.com` and `Vishal@@2004`
- Check for extra spaces
- Clear browser cache and try again

### Changes not reflecting
- Clear browser cache (Ctrl+Shift+Delete)
- Clear application storage in DevTools
- Refresh the page

## 📄 License

MIT License - Feel free to use this for learning and personal projects.

## 👤 Author

Created for study portal demonstration.

---

**Happy Studying!** 📚