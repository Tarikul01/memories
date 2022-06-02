import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts=async (req,res)=>{
    try {
        const postMessage=await PostMessage.find();
        res.status(200).json(postMessage);
        
    } catch (err) {
        res.status(404).json({message:err.message});
        
    }
   
}

export  const createPosts=async(req,res)=>{
    const post=req.body;
    const  newPost= new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost)
        
    } catch (err) {
        res.status(409).json({message:err.message});
        
    }
    
}
export  const updatePost=async (req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost= await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
    res.json(updatePost);
}

export const deletePost=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const deletePost= await PostMessage.findByIdAndRemove(id);
    if(deletePost){
        res.json({message:"Post deleted successfully !"});
    }else{
        res.json({message:"Post not deleted!"})

    }
}

export const likePost=async(req,res)=>{
    const {id}=req.params;
    if(!req.userId) return res.json(({message:'Unauthenticated !'}));
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');


    const post=await PostMessage.findById(id);

    const index=post.likes.findIndex((id)=> id===String(req.userId));
    if(index===-1){
        // Like the post 
        post.likes.push(req.userId);
    }else{
        // dislike the post 
        post.likes=post.likes.filter((id)=>id !==String(req.userId))
    }
    // const updatePost= await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount+1},{new:true});
    const updatePost= await PostMessage.findByIdAndUpdate(id, post,{new:true});
    res.json(updatePost);

}