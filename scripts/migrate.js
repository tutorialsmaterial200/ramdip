const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = "mongodb+srv://dri:n6NA4TenpIfDYH9q@dri.31cmj8.mongodb.net/jbsimkhada?retryWrites=true&w=majority";

async function migrate() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Create collections with indexes
    const collections = [
      'appointments',
      'messages', 
      'admins',
      'blogposts',
      'galleries',
      'achievements'
    ];
    
    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      
      // Create indexes based on collection
      switch (collectionName) {
        case 'appointments':
          await collection.createIndex({ date: 1, time: 1 });
          await collection.createIndex({ status: 1 });
          break;
        case 'messages':
          await collection.createIndex({ status: 1 });
          await collection.createIndex({ createdAt: -1 });
          break;
        case 'admins':
          await collection.createIndex({ username: 1 }, { unique: true });
          break;
        case 'blogposts':
          await collection.createIndex({ slug: 1 }, { unique: true });
          await collection.createIndex({ published: 1 });
          break;
      }
      
      console.log(`✓ Collection '${collectionName}' ready`);
    }
    
    // Create default admin if not exists
    const adminCollection = db.collection('admins');
    const existingAdmin = await adminCollection.findOne({ username: 'admin' });
    
    if (!existingAdmin) {
      await adminCollection.insertOne({
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date()
      });
      console.log('✓ Default admin created (admin/admin123)');
    }
    
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.close();
  }
}

migrate();