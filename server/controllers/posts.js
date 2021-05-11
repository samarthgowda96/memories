import PostMessage from '../models/postMessage.js'


export const getPosts=async(req,res) => {
    try {
        const postMessages = await PostMessage.find() 
        //console.log(postMessages)
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}


export const createPost=async(req,res)=>{
    const post = req.body;
    const newPost= new PostMessage(post);
    try {
        await newPost.save();
        res.status(200).json(newPost)
        
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}

export const updatePost= async(req,res) => {
    const {id:_id}= req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.send("No Post with that Id")

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true})
        res.status(200).json(updatedPost)
        
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}