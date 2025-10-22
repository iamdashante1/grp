import mongoose from 'mongoose';
import Role from '../lib/models/Role';
import BloodStock from '../lib/models/BloodStock';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blood_donation_db';

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Role.deleteMany({});
    await BloodStock.deleteMany({});

    // Create roles
    console.log('📝 Creating roles...');
    const roles = await Role.create([
      {
        name: 'donor',
        description: 'Blood donor role',
        permissions: ['donate', 'view_profile', 'book_appointment']
      },
      {
        name: 'recipient',
        description: 'Blood recipient role',
        permissions: ['request_blood', 'view_profile', 'view_availability']
      },
      {
        name: 'admin',
        description: 'Administrator role',
        permissions: [
          'manage_users',
          'manage_inventory',
          'manage_appointments',
          'manage_requests',
          'view_reports',
          'manage_donors'
        ]
      },
      {
        name: 'staff',
        description: 'Staff member role',
        permissions: [
          'manage_inventory',
          'manage_appointments',
          'view_reports'
        ]
      }
    ]);

    console.log(`✅ Created ${roles.length} roles`);

    // Create blood stock
    console.log('🩸 Creating blood stock inventory...');
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const parishes = ['Kingston', 'St. Andrew', 'St. Catherine', 'Manchester', 'St. James', 'Westmoreland'];

    const bloodStockData = [];
    for (const bloodType of bloodTypes) {
      for (const location of parishes) {
        bloodStockData.push({
          bloodType,
          quantity: Math.floor(Math.random() * 50) + 10,
          location,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          status: 'available'
        });
      }
    }

    const bloodStock = await BloodStock.create(bloodStockData);
    console.log(`✅ Created ${bloodStock.length} blood stock entries`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 What was created:');
    console.log('   ✅ 4 user roles (donor, recipient, admin, staff)');
    console.log('   ✅ 48 blood stock entries (8 blood types × 6 parishes)');
    console.log('\n💡 Users can now register through the application!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected from MongoDB');
    process.exit(0);
  }
}

seedDatabase();
