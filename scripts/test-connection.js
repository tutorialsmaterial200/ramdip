const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://dri:n6NA4TenpIfDYH9q@dri.31cmj8.mongodb.net/jbsimkhada?retryWrites=true&w=majority";

async function testConnection() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('✓ Connected successfully!');
    
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('✓ Database accessible');
    console.log(`Collections found: ${collections.length}`);
    
    // Test a simple operation
    const testCollection = db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    await testCollection.deleteOne({ test: true });
    console.log('✓ Read/write operations working');
    
  } catch (error) {
    console.error('✗ Connection failed:', error.message);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

testConnection();