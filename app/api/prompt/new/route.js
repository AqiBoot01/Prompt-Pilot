import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json(); // Awaiting the JSON payload

  try {
    await connectToDB(); // Ensure you're connected to the DB

    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    }); // Use Prompt.create to simplify the creation and saving

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error("Error creating prompt:", error); // Logging error for debugging
    return new Response("Failed to create prompt.", { status: 500 });
  }
};
