# Quick Admin Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Environment Setup
```bash
cd /Users/aasish/Project/ramdip

# Make sure .env.local exists with MongoDB URL
cat .env.local
```

Your `.env.local` should have:
```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Step 4: Initialize Admin (First Time Only)
```bash
# Call the seed endpoint
curl -X POST http://localhost:3000/api/admin/seed
```

Response should be:
```json
{
  "success": true,
  "message": "Admin created successfully",
  "admin": {
    "email": "admin@cpnmc.org.np",
    "name": "Super Admin",
    "role": "superadmin"
  }
}
```

### Step 5: Login to Admin Panel
1. Go to: `http://localhost:3000/admin/login`
2. Email: `admin@cpnmc.org.np`
3. Password: `admin123`
4. Click "Login"

## 📊 Admin Panel URLs

| Section | URL | Purpose |
|---------|-----|---------|
| Login | `/admin/login` | Admin authentication |
| Dashboard | `/admin/dashboard` | Overview & stats |
| Hero | `/admin/hero` | Edit hero section |
| About | `/admin/about` | Edit about section |
| Achievements | `/admin/achievements` | Manage achievements |
| Gallery | `/admin/gallery` | Manage photos |
| Messages | `/admin/messages` | View contact messages |

## 🔑 Default Credentials

- **Email**: admin@cpnmc.org.np
- **Password**: admin123

⚠️ **Change these in production!**

## 📱 Public Website URLs

| Section | URL |
|---------|-----|
| Home | `/` |
| Hero | `/#home` |
| About | `/#about` |
| Vision | `/#vision` |
| Achievements | `/#achievements` |
| Gallery | `/#gallery` |
| Contact | `/#contact` |

## 🛠️ API Endpoints Reference

### Admin Authentication
```bash
# Login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cpnmc.org.np","password":"admin123"}'

# Check auth status
curl http://localhost:3000/api/admin/me

# Logout
curl -X POST http://localhost:3000/api/admin/logout
```

### Hero Section
```bash
# Get hero data
curl http://localhost:3000/api/hero

# Update hero
curl -X PUT http://localhost:3000/api/hero \
  -H "Content-Type: application/json" \
  -d '{"titleEnglish":"New Title"}'
```

### Achievements
```bash
# Get all achievements
curl http://localhost:3000/api/achievements

# Create achievement
curl -X POST http://localhost:3000/api/achievements \
  -H "Content-Type: application/json" \
  -d '{"title":"Achievement","description":"...","status":"Ongoing","year":"2024"}'

# Update achievement
curl -X PUT http://localhost:3000/api/achievements/ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated"}'

# Delete achievement
curl -X DELETE http://localhost:3000/api/achievements/ID
```

### Gallery
```bash
# Get all gallery items
curl http://localhost:3000/api/gallery

# Create gallery item
curl -X POST http://localhost:3000/api/gallery \
  -H "Content-Type: application/json" \
  -d '{"title":"Photo","description":"...","category":"Events","image":"/path"}'
```

### Messages
```bash
# Get all messages
curl http://localhost:3000/api/messages

# Update message status
curl -X PUT http://localhost:3000/api/messages/ID \
  -H "Content-Type: application/json" \
  -d '{"status":"read"}'

# Delete message
curl -X DELETE http://localhost:3000/api/messages/ID
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'mongoose'"
**Solution**: Run `npm install`

### Issue: "MongoDB connection failed"
**Solution**: Check `.env.local` has correct MONGODB_URI

### Issue: Admin seed already exists error
**Solution**: This is normal after first run. Just login with provided credentials.

### Issue: "Cannot find module '.css'"
**Solution**: TypeScript CSS declaration file exists (`global.d.ts`). Clear `.next` folder: `rm -rf .next`

### Issue: Login redirect loop
**Solution**: Clear browser cookies for localhost

## 📝 File Locations

- **Models**: `/models/*.ts` - Database schemas
- **API Routes**: `/app/api/**/*.ts` - Backend endpoints
- **Admin Pages**: `/app/admin/**/*.tsx` - Admin UI
- **Public Components**: `/components/*.tsx` - Website components
- **Config**: `.env.local` - Environment variables

## 🔒 Security Tips

1. **Change default password immediately**
2. **Use strong NEXTAUTH_SECRET** (min 32 characters)
3. **Never commit `.env.local`** - it's in `.gitignore`
4. **Use HTTPS in production**
5. **Restrict admin IP addresses if possible**

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Mongoose ORM](https://mongoosejs.com)

## 📞 Support

For issues or questions:
1. Check the main `ADMIN_SETUP.md` file
2. Review error messages in browser console
3. Check server logs in terminal
4. Verify MongoDB connection

---

**Happy administrating!** 🎉

جनता सर्वोपरि | People First
