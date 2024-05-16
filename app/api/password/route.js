import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/utils/connectdb';
import Password from '@/models/password';
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId')

    try {
        await connectMongoDB();

        const passwords = await Password.find({ userId: userId });
        
        if (!passwords) {
          return NextResponse.json({ message: 'Passwords not found for this userId',status: 404});
        }
        return NextResponse.json({ message: 'Success', passwords: passwords ,status: 200});
      } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ message: 'Error: Failed to Get Passwords.', error: error });
      }
  
}

export async function POST(request) {
  try {
    await connectMongoDB();

    const { userId, username, url, password } = await request.json();

    // Create a new Password document
    const newPassword = new Password({
      userId,
      username,
      url,
      password
    });

    await newPassword.save();

    return NextResponse.json({ message: 'Password created successfully',password: newPassword, status: 201 });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: 'Error: Failed to create a new password.', error: error });
  }
}
export async function DELETE(request) {
  try {
    await connectMongoDB();

    const {  _id } = await request.json();

    // Create a new Password document
    try {
      await Password.findByIdAndDelete(_id);
      return NextResponse.json({ message: 'Password Deleted successfully',status: 200});
    } catch (error) {
         return NextResponse.json({ message: 'Error: Failed to delete the password.', error: error, status: 500 });
      }
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: 'Error: Failed to connect to mongodb or request problem.', error: error, status: 404 });
  }
}
export async function PATCH(request) {

  try {
    await connectMongoDB();

    const {  _id, userId, username, url, password } = await request.json();
    
    try {
      let updatedPassword =await Password.findByIdAndUpdate({_id},{userId, username, url, password},{
        // Return the updated document
        new: true
      }); 
      return NextResponse.json({ message: 'Password Updated successfully', updatedPassword ,status: 200});
    } catch (error) {
         return NextResponse.json({ message: 'Error: Failed to update the password.', error: error, status: 500 });
      }
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: 'Error: Failed to connect to mongodb or request problem.', error: error, status: 404 });
  }
}


