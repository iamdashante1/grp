# MongoDB Local Setup Guide

## Prerequisites

1. **Install MongoDB Community Edition**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow the installation wizard for Windows
   - Make sure to install MongoDB Compass (GUI tool) when prompted

## Setup Steps

### 1. Start MongoDB Service

**Option A: Start as Windows Service (Recommended)**
```bash
# MongoDB usually installs as a Windows service by default
# Check if it's running:
net start MongoDB

# If not running, start it:
net start MongoDB
```

**Option B: Start Manually**
```bash
# Navigate to MongoDB bin directory (adjust path if needed)
cd "C:\Program Files\MongoDB\Server\8.0\bin"

# Start MongoDB
mongod --dbpath "C:\data\db"
```

### 2. Verify MongoDB is Running

**Using MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You should see the connection succeed

**Using Command Line:**
```bash
# In a new terminal
mongosh

# You should see the MongoDB shell
# Type: exit
```

### 3. Configure Environment Variables

The `.env.local` file has been created with:
```
MONGODB_URI=mongodb://localhost:27017/blood_donation_db
```

### 4. Seed the Database (Optional)

Run the seed script to populate initial data:

```bash
# Install ts-node if not already installed
npm install -D ts-node

# Run the seed script
npx ts-node scripts/seed-database.ts
```

This will create:
- ✅ Roles (donor, recipient, admin, staff)
- ✅ Sample users with test credentials
- ✅ Blood stock inventory for all blood types

**Test Credentials:**
- **Admin:** admin@blooddonation.local / Admin123!
- **Donor:** john@example.com / Donor123!
- **Donor:** jane@example.com / Donor123!

### 5. Start the Application

```bash
npm run dev
```

The app will connect to your local MongoDB at `mongodb://localhost:27017/blood_donation_db`

## Troubleshooting

### MongoDB Service Won't Start

1. **Check if port 27017 is in use:**
   ```bash
   netstat -ano | findstr :27017
   ```

2. **Create data directory if missing:**
   ```bash
   mkdir C:\data\db
   ```

3. **Check MongoDB logs:**
   - Located at: `C:\Program Files\MongoDB\Server\8.0\log\mongod.log`

### Connection Issues

1. **Verify MongoDB is running:**
   ```bash
   mongosh
   ```

2. **Check firewall settings:**
   - Ensure Windows Firewall allows MongoDB (port 27017)

3. **Test connection with MongoDB Compass:**
   - Connection string: `mongodb://localhost:27017`

### Database Not Found

- MongoDB creates databases automatically when data is first written
- The database `blood_donation_db` will be created on first connection

## MongoDB Compass (GUI)

**View Your Data:**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `blood_donation_db`
4. Browse collections: users, roles, bloodstocks, etc.

## Useful Commands

**Stop MongoDB Service:**
```bash
net stop MongoDB
```

**Restart MongoDB Service:**
```bash
net stop MongoDB
net start MongoDB
```

**Access MongoDB Shell:**
```bash
mongosh
```

**View Databases:**
```javascript
show dbs
```

**Use Blood Donation Database:**
```javascript
use blood_donation_db
```

**View Collections:**
```javascript
show collections
```

**View Users:**
```javascript
db.users.find().pretty()
```

**Clear All Data:**
```javascript
db.users.deleteMany({})
db.roles.deleteMany({})
db.bloodstocks.deleteMany({})
```

## Production Notes

For production deployment, consider:
- MongoDB Atlas (cloud-hosted)
- Proper authentication (username/password)
- SSL/TLS encryption
- Regular backups
- Monitoring and alerts

## Need Help?

- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB Community: https://www.mongodb.com/community/forums/
- MongoDB University (Free): https://university.mongodb.com/
