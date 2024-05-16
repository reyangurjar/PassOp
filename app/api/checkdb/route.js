import dbConnect from '@/libs/utils/connectdb'
import { NextResponse } from 'next/server'
import Trial from '@/models/Trial'
export async function GET() {
    try {
         const conn = await dbConnect();
        const Trial1 = await Trial.findOne({
            name: "Trial1",
            description: "Trial1 description"
        });
        // const Trial1 = new Trial({
        //     name: "Trial1",
        //     description: "Trial1 description"
        // });
        console.log(Trial1)
        if (conn) {
          console.log('Connected to MongoDB successfully!');
         return NextResponse.json({ message: 'Success! Connected to MongoDB.' });
        } else {
          throw new Error('Failed to connect to MongoDB.');
        }
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return NextResponse.json({ message: 'Error: Failed to connect to MongoDB.', error: error });
      }
    }
