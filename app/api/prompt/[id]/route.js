
import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (request , {params})  => {

try {
    await connectToDB()
    const singlePrompt = await Prompt.findById(params?.id).populate("creator")
    if(!singlePrompt) {
        return new Response('No such Prompt exist', {status : 404})
    }

    return new Response(JSON.stringify(singlePrompt) , {status : 200})
    
} catch (error) {
    return new Response('Failed to fetch prompt', {status: 500})
    
}

}




export const PATCH = async (request, {params}) =>{

    try {
        
        await connectToDB()
        const {prompt , tag} = await request.json()

        const singlePrompt = await Prompt.findById(params.id).populate("creator")

        if(!singlePrompt) {
            return new Response('No such prompt exist' , {status : 404})
        }

        singlePrompt.prompt = prompt
        singlePrompt.tag = tag
        
        const updatedPrompt = await singlePrompt.save()

        return new Response(JSON.stringify(updatedPrompt) , {message: 'Prompt successfully update', status: 201})


    } catch (error) {
        return new Response('Failed to fetch prompt', {status: 500})

        
    }

}



export const DELETE = async (request , {params}) =>{
    try {
        await connectToDB()
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id).populate("creator")
        
        if(!deletedPrompt) {
            return new Response("No such prompt exists" , {status : 404})
        }

        return new Response(deletedPrompt , {message : "prompt deleted successfully" , status : 200})
    } catch (error) {
        return new Response('Faild to find the prompt' , {status: 500})
        
    }
}