import { NextResponse } from "next/server";
import Contact from "@/models/contact"; // Import the Contact model
import connectMongoDB from "@/db/db";
export async function GET() {
    try {
      await connectMongoDB(); // Connect to your MongoDB database
  
      const Contacts = await Contact.find({}); // Retrieve all Contacts from the database
  
      return NextResponse.json({ Contacts }, { status: 200 }); // Return the Contacts as JSON response with status code 200
    } catch (error) {
      console.error("Error fetching Contacts:", error);
      return NextResponse.error(error); // Return an error response if there's an error
    }
  }
  export async function POST(request) {
    try {
      await connectMongoDB();
  
      // Extract data from the request body
      const { email, listingUrl, heplTopic, reson, screenShot,   description} =
        await request.json();
  
      // Create a new contact document with the received data
      const contactMessage = await Contact.create({
        email,
        listingUrl,
        heplTopic,
        reson,
        screenShot,
        description,
      });
  
      // Return success response with the created contact message
      return NextResponse.json(
        { message: "Contact Created", contactMessage }, // Include helpTopic and reason in the response
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating Contact:", error);
      // Return error response if there's an error
      return NextResponse.error(error);
    }
  }
  