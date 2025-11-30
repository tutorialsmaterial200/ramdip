# CPN (Maoist Center) Political Portfolio Admin Panel

A complete modern political portfolio website with a powerful backend admin control panel for managing content, achievements, gallery, and messages.

## Features

### Public Website
- 🎯 **Hero Section** - Eye-catching landing page
- ℹ️ **About Section** - Party history and timeline
- 🎯 **Vision Section** - 6 key policy pillars
- 🏆 **Achievements** - Project showcase with impact metrics
- 🖼️ **Gallery** - Filterable photo gallery
- 💬 **Contact** - Message inbox with forms
- ☭ **Responsive Design** - Works on all devices

### Admin Panel
- 🔐 **Secure Login** - JWT-based authentication
- 📊 **Dashboard** - Overview of all content
- ✏️ **Hero Management** - Edit hero section content
- ✏️ **About Management** - Manage about section
- 🏆 **Achievements** - Add/Edit/Delete achievements
- 🖼️ **Gallery** - Manage gallery photos
- 💬 **Messages Inbox** - View and manage contact messages
- 👤 **User Authentication** - Secure admin access

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + HTTP-only Cookies
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)
- npm or yarn

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ramdip
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ramdip?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this
NEXTAUTH_URL=http://localhost:3000

# Optional: Admin defaults
ADMIN_EMAIL=admin@cpnmc.org.np
ADMIN_PASSWORD=admin123
```

4. **Initialize the database**

Run the seed endpoint to create the initial admin user:

```bash
curl -X POST http://localhost:3000/api/admin/seed
```

Or access it from the application at: `http://localhost:3000/api/admin/seed`

5. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Access Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Default credentials:
   - **Email**: admin@cpnmc.org.np
   - **Password**: admin123

3. Change password immediately in production!

### Admin Panel Pages

- **Dashboard** (`/admin/dashboard`) - Overview and statistics
- **Hero Section** (`/admin/hero`) - Manage hero content
- **About** (`/admin/about`) - Manage about section
- **Achievements** (`/admin/achievements`) - CRUD operations for achievements
- **Gallery** (`/admin/gallery`) - Manage gallery photos
- **Messages** (`/admin/messages`) - View and manage contact messages

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current admin
- `POST /api/admin/logout` - Logout
- `POST /api/admin/seed` - Seed initial admin (one-time only)

### Content Management
- `GET/PUT /api/hero` - Hero section
- `GET/PUT /api/about` - About section
- `GET/POST /api/achievements` - Achievements list
- `GET/PUT/DELETE /api/achievements/[id]` - Single achievement
- `GET/POST /api/gallery` - Gallery list
- `GET/PUT/DELETE /api/gallery/[id]` - Single gallery item
- `GET/POST /api/messages` - Messages list
- `PUT/DELETE /api/messages/[id]` - Single message

## Project Structure

```
ramdip/
├── app/
│   ├── api/                 # API routes
│   │   ├── admin/          # Admin endpoints
│   │   ├── about/
│   │   ├── achievements/
│   │   ├── gallery/
│   │   └── messages/
│   ├── admin/              # Admin panel pages
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── achievements/
│   │   ├── gallery/
│   │   └── messages/
│   ├── components/         # React components
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css
├── lib/
│   ├── mongodb.ts         # MongoDB connection
│   └── utils.ts
├── models/                # Mongoose schemas
│   ├── Admin.ts
│   ├── Hero.ts
│   ├── About.ts
│   ├── Achievement.ts
│   ├── Gallery.ts
│   ├── Contact.ts
│   └── Message.ts
├── public/               # Static files
├── .env.local           # Environment variables
└── package.json
```

## Security Notes

1. **Change Default Credentials**: Always change the default admin password in production
2. **Environment Variables**: Keep `.env.local` file out of version control
3. **HTTPS**: Use HTTPS in production
4. **NEXTAUTH_SECRET**: Use a strong, random secret in production
5. **CORS**: Configure CORS if needed for external integrations
6. **Rate Limiting**: Consider adding rate limiting for production

## Customization

### Adding New Admin Users

```javascript
// Create via MongoDB directly or through admin panel
// Only superadmin can create new users (implement role-based access)

const admin = await Admin.create({
  email: "newadmin@cpnmc.org.np",
  password: "securepassword",
  name: "New Admin",
  role: "admin",
  isActive: true
});
```

### Modifying Content Models

Edit the respective schema in `/models` and update the corresponding API routes.

### Customizing Styling

All pages use Tailwind CSS. Modify the color scheme by updating the component classes (red-600, etc.).

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in `.env.local`
- Check MongoDB username and password
- Ensure IP whitelist includes your current IP (for MongoDB Atlas)

### Admin Login Issues
- Verify credentials are correct
- Check if admin user exists in database
- Clear browser cookies and try again

### Build Errors
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Try `npm run build`

## Production Deployment

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 2. Environment Variables in Production
Set all `.env.local` variables in your hosting platform's environment settings.

### 3. Database
Use MongoDB Atlas for reliable cloud database hosting.

### 4. Security Checklist
- [ ] Changed default admin password
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Configured production MongoDB URI
- [ ] Enabled HTTPS
- [ ] Set NEXTAUTH_URL to production domain
- [ ] Configured CORS if needed
- [ ] Enabled environment variable encryption

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**CPN (Maoist Center)** - Serving the People | जनता सर्वोपरि
