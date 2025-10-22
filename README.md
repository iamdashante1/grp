# BloodBridge - Blood Bank Management System (Next.js)

A comprehensive blood bank management system built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. This is a merged full-stack application combining the original separate frontend and backend into a unified Next.js application.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with role-based access control
- **Donor Management**: Complete donor registration, eligibility tracking, and donation history
- **Blood Inventory**: Real-time blood stock management with compatibility checking
- **Appointment Scheduling**: Book and manage blood donation appointments
- **Blood Requests**: Hospital blood request management with priority handling
- **Notifications**: Multi-channel notification system for reminders and alerts
- **Admin Dashboard**: Comprehensive admin panel for system management

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **Logging**: Winston
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB database (local or MongoDB Atlas)
- Git

## ⚙️ Installation

1. **Clone or navigate to the merged project**:
   ```bash
   cd merged
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/bloodbridge
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bloodbridge

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=7d

   # Email Configuration (Nodemailer)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=BloodBridge <noreply@bloodbridge.com>

   # Application
   NODE_ENV=development
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
merged/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── users/           # User management
│   │   ├── donors/          # Donor operations
│   │   ├── appointments/    # Appointment management
│   │   ├── donations/       # Donation tracking
│   │   ├── inventory/       # Blood stock management
│   │   ├── requests/        # Blood request handling
│   │   └── notifications/   # Notification system
│   ├── page.tsx             # Home page
│   └── layout.tsx           # Root layout
├── lib/                      # Shared utilities
│   ├── db/                  # Database connection
│   ├── models/              # Mongoose models (8 models)
│   ├── middleware/          # Custom middleware
│   └── utils/               # Helper functions
├── components/               # React components
│   ├── ui/                  # UI components
│   ├── layout/              # Layout components
│   └── auth/                # Auth components
├── public/                   # Static assets
└── tailwind.config.js       # Tailwind configuration
```

## 🔑 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Password reset request

### Donors
- `GET /api/donors` - List all donors
- `POST /api/donors` - Create donor profile
- `GET /api/donors/:id` - Get donor details
- `PUT /api/donors/:id` - Update donor
- `GET /api/donors/:id/eligibility` - Check donation eligibility

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Blood Inventory
- `GET /api/inventory` - Get blood stock levels
- `POST /api/inventory/add` - Add blood units
- `PUT /api/inventory/reserve` - Reserve units
- `PUT /api/inventory/dispatch` - Dispatch units

### Blood Requests
- `GET /api/requests` - List blood requests
- `POST /api/requests` - Create new request
- `PUT /api/requests/:id` - Update request
- `PUT /api/requests/:id/approve` - Approve request

## 🗄️ Database Models

1. **User** - Authentication and user profiles
2. **Role** - Role-based access control
3. **Donor** - Donor information and eligibility
4. **BloodStock** - Blood inventory management
5. **Appointment** - Donation appointments
6. **Donation** - Donation records and testing
7. **Request** - Blood requests from hospitals
8. **Notification** - System notifications

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🤝 Contributing

This is a student project. For major changes, please open an issue first.

## 📄 License

This project is for educational purposes.

## 🆘 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and TypeScript**

