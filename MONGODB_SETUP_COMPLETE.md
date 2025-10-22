# 🗄️ MongoDB Local Database Setup Complete!

Your application is now configured to use a local MongoDB database for storing all data.

## ✅ What's Been Set Up

### 1. Environment Configuration
- **File:** `.env.local` (created)
- **Database:** `blood_donation_db`
- **Connection:** `mongodb://localhost:27017/blood_donation_db`

### 2. Database Connection
- **File:** `lib/db/connection.ts` (already exists)
- Automatic connection with caching
- Handles reconnection logic

### 3. Data Models
All models are already configured in `lib/models/`:
- ✅ User (authentication, profile)
- ✅ Role (permissions)
- ✅ Donor (donor profiles)
- ✅ Donation (donation records)
- ✅ Request (blood requests)
- ✅ Appointment (scheduling)
- ✅ BloodStock (inventory)
- ✅ Notification (user notifications)

### 4. API Routes
Working API endpoints in `app/api/`:
- ✅ `/api/auth/register` - User registration
- ✅ `/api/auth/login` - User login

### 5. Database Scripts
New scripts in `scripts/`:
- ✅ `seed-database.ts` - Populate database with sample data
- ✅ `check-mongodb.ts` - Verify MongoDB connection

### 6. NPM Scripts
Added to `package.json`:
```json
{
  "seed": "ts-node scripts/seed-database.ts",
  "check-db": "ts-node scripts/check-mongodb.ts"
}
```

## 🚀 Quick Start Guide

### Step 1: Install MongoDB

**Download MongoDB Community Edition:**
1. Visit: https://www.mongodb.com/try/download/community
2. Select Windows platform
3. Download and run installer
4. ✅ Install MongoDB Compass when prompted
5. ✅ Install as Windows Service (recommended)

### Step 2: Start MongoDB

**MongoDB should auto-start as a Windows service. To verify:**

```bash
# Check if running
net start | findstr MongoDB

# If not running, start it
net start MongoDB
```

### Step 3: Verify Connection

```bash
npm run check-db
```

**Expected output:**
```
✅ Successfully connected to MongoDB!
📊 Database: blood_donation_db
📚 Collections (0):
```

### Step 4: Seed Database (Optional)

Populate with sample data:

```bash
npm run seed
```

**This creates:**
- 4 user roles (donor, recipient, admin, staff)
- Blood stock inventory (8 blood types × 6 parishes)
- No test users (register your own accounts!)

**Test Credentials:**
```
Users can register through the application at /register
No pre-created test accounts - start fresh!
```

### Step 5: Start Your App

```bash
npm run dev
```

Visit: http://localhost:3000

## 🔧 Troubleshooting

### MongoDB Won't Start

**Check MongoDB Service:**
```bash
# Windows Services
services.msc
# Look for "MongoDB Server" and ensure it's running
```

**Manual Start:**
```bash
cd "C:\Program Files\MongoDB\Server\8.0\bin"
mongod --dbpath "C:\data\db"
```

### Port 27017 Already In Use

```bash
# Find what's using port 27017
netstat -ano | findstr :27017

# Kill the process (replace PID with actual process ID)
taskkill /F /PID <PID>
```

### Connection Timeout

1. **Verify MongoDB is installed:**
   - Check: `C:\Program Files\MongoDB\`

2. **Check Windows Firewall:**
   - Allow MongoDB on port 27017

3. **Test with MongoDB Compass:**
   - Open Compass
   - Connect to: `mongodb://localhost:27017`

### Database Not Showing Data

**Run seed script:**
```bash
npm run seed
```

**Or manually check in MongoDB shell:**
```bash
mongosh
use blood_donation_db
db.users.find()
```

## 📊 View Your Data

### Using MongoDB Compass (Recommended GUI)

1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. Select database: `blood_donation_db`
5. Browse collections

### Using MongoDB Shell

```bash
# Start shell
mongosh

# Switch to database
use blood_donation_db

# View collections
show collections

# View users
db.users.find().pretty()

# View blood stock
db.bloodstocks.find().pretty()

# Count documents
db.users.countDocuments()
```

## 📁 Database Structure

```
blood_donation_db/
├── users              # User accounts (donors, recipients, admins)
├── roles              # User roles and permissions
├── donors             # Donor profiles (linked to users)
├── donations          # Donation records
├── requests           # Blood requests from recipients
├── appointments       # Donation appointments
├── bloodstocks        # Blood inventory by type and location
└── notifications      # User notifications
```

## 🔐 Data Security

**Current Setup (Development):**
- ✅ No authentication required for local MongoDB
- ✅ JWT tokens for API authentication
- ✅ Password hashing with bcrypt
- ✅ Data validation on all models

**Production Recommendations:**
- Enable MongoDB authentication
- Use MongoDB Atlas (cloud)
- Enable SSL/TLS encryption
- Regular backups
- IP whitelisting

## 📝 Useful Commands

**Check Database Size:**
```bash
mongosh
use blood_donation_db
db.stats()
```

**Backup Database:**
```bash
mongodump --db=blood_donation_db --out=C:\backup\mongodb
```

**Restore Database:**
```bash
mongorestore --db=blood_donation_db C:\backup\mongodb\blood_donation_db
```

**Clear All Data:**
```bash
mongosh
use blood_donation_db
db.dropDatabase()
```

**Then re-seed:**
```bash
npm run seed
```

## 📚 Next Steps

1. ✅ Start MongoDB service
2. ✅ Run `npm run check-db` to verify connection
3. ✅ Run `npm run seed` to populate sample data
4. ✅ Run `npm run dev` to start the app
5. ✅ Try registering a new user
6. ✅ Check MongoDB Compass to see the data

## 🆘 Need Help?

**Documentation:**
- MongoDB Setup Guide: `MONGODB_SETUP.md`
- MongoDB Docs: https://docs.mongodb.com/
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

**Common Issues:**
- MongoDB service not starting → Check Windows Services
- Connection timeout → Verify MongoDB is running on port 27017
- "Database not found" → Normal! MongoDB creates it on first write
- Seed script fails → Make sure MongoDB is running first

## 🎉 You're All Set!

Your blood donation system is now using MongoDB to store:
- 👥 User accounts and profiles
- 🩸 Blood inventory and stock levels
- 📅 Donation appointments
- 📋 Blood requests
- 🔔 Notifications
- 📊 Donation history

Everything is persisted to your local MongoDB database at:
`mongodb://localhost:27017/blood_donation_db`

Happy coding! 🚀
