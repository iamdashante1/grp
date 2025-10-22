# Quick Start Guide - BloodBridge Next.js

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd merged
npm install
```

### Step 2: Set Up Database
Make sure MongoDB is running:
```bash
# If you have MongoDB installed locally:
mongod

# OR use MongoDB Atlas (cloud database - recommended)
# Sign up at https://www.mongodb.com/cloud/atlas
# Create a free cluster and get your connection string
```

### Step 3: Configure Environment
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your values:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (any random string)
# - EMAIL credentials (optional for now)
```

Minimum `.env.local` content:
```env
MONGODB_URI=mongodb://localhost:27017/bloodbridge
JWT_SECRET=my-super-secret-key-12345
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 4: Run the App
```bash
npm run dev
```

### Step 5: Open Browser
Visit: **http://localhost:3000**

You should see the BloodBridge home page! 🎉

## ✅ What Works Right Now

### Pages
- ✅ **Home Page** (`/`) - Fully functional with stats, features, blood types

### API Endpoints
- ✅ **POST /api/auth/register** - Create new user
- ✅ **POST /api/auth/login** - Login user

### Database
- ✅ **8 Models Ready**: User, Role, Donor, BloodStock, Appointment, Donation, Request, Notification
- ✅ **MongoDB Connection**: Auto-connects when API is called

## 🧪 Test the API

### Register a New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "876-123-4567",
    "role": "donor"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 📁 Project Structure Quick Reference

```
merged/
├── app/
│   ├── api/auth/          ← API endpoints here
│   ├── page.tsx           ← Home page
│   └── layout.tsx         ← Main layout
├── lib/
│   ├── db/connection.ts   ← Database connection
│   └── models/            ← 8 data models
├── .env.local             ← Your config (create this!)
└── package.json
```

## 🛠️ Common Tasks

### Add a New API Route
1. Create `app/api/[name]/route.ts`
2. Import models: `import { User, Donor } from '@/lib/models'`
3. Connect to DB: `await dbConnect()`
4. Export `GET`, `POST`, `PUT`, `DELETE` functions

### Add a New Page
1. Create `app/[page-name]/page.tsx`
2. Export default function component
3. Access at `http://localhost:3000/page-name`

### Use a Model
```typescript
import dbConnect from '@/lib/db/connection';
import { User } from '@/lib/models';

await dbConnect();
const users = await User.find();
```

## ⚠️ Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running: `mongod`
- Check MONGODB_URI in `.env.local`
- For Atlas, check IP whitelist settings

### "Module not found"
- Run: `npm install`
- Restart dev server: `npm run dev`

### Port 3000 already in use
- Kill process: `npx kill-port 3000`
- Or use different port: `PORT=3001 npm run dev`

### TypeScript errors
- Clean build: `rm -rf .next`
- Reinstall: `npm install`

## 📚 Next Steps

1. **Explore the code**
   - Check `lib/models/` to see data structures
   - Look at `app/api/auth/` for API examples
   - View `app/page.tsx` for frontend example

2. **Add more features**
   - Create more API routes (donors, appointments, etc.)
   - Add more pages (login, dashboard, etc.)
   - Build components in `components/`

3. **Read documentation**
   - `README.md` - Full project documentation
   - `MIGRATION_SUMMARY.md` - Technical details
   - Original `backend/` and `frontend/` folders - Reference

## 🎯 Goals

- [ ] Set up local environment
- [ ] Run the app successfully
- [ ] Test register/login APIs
- [ ] View the home page
- [ ] Understand project structure
- [ ] Make your first change

## 🆘 Need Help?

1. Check the error message in terminal
2. Look at `MIGRATION_SUMMARY.md` for technical details
3. Review the original `backend/` and `frontend/` code
4. Check Next.js documentation: https://nextjs.org/docs

---

**You're ready to build! Start with creating more API routes or frontend pages.** 🚀
