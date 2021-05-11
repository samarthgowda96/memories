import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'



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
        const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
        res.status(200).json(updatedPost)
        
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}

export const deletePost= async(req, res) => {
    //const {id}= req.params; same thing as below line
    const {id:_id}= req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.send("No Post to delete")
    try {
        await PostMessage.findByIdAndRemove(_id)
        res.status(200).json({message:'Post Deleted Successfully!!'})
        
    } catch (error) {
        res.send(404).json({message:error.message})
        
    }
}

export const likePost= async(req, res) => {
    const{id:_id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.send("No Post to Like!")
    try {
            const post = await PostMessage.findById(_id);
            const updatedPost= await PostMessage.findByIdAndUpdate(_id,{likeCount:post.likeCount+1},{new:true})
            res.status(200).json(updatedPost)

        
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}