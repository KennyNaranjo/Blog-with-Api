import Post from '../models/Post.js'
import { uploadImage, deleteImage } from '../librs/cloudinary.js'
import fs from 'fs-extra'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.json(posts);
    } catch (error) {
        return res.status(500).json ({message: error.message})
    }
};

export const createPosts = async (req, res) => {
    try {
        const {title, description} = req.body
        
        let image = null;

        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            
        }
        const newPost = new Post({title, description, image })
        
        await newPost.save()
        
        

        return res.json(newPost)
    } catch (error) {
    
        return res.status(500).json ({ message: error.message })
    }
    
}

export const updatingPosts = async (req, res) => {
    try {
        const updatedPost= await Post.updateOne({_id:req.params.id}, req.body, { new: true})
        return res.json(updatedPost)
    } catch (error) {

        return res.status(500).json ({ message: error.message})
    }
}

export const deletingPosts = async (req, res) => {
    try {
        const postRemove = await Post.findByIdAndDelete(req.params.id)

        if (!postRemove) return res.sendStatus (404)

        if (postRemove.image.public_id){
            await deleteImage(postRemove.image.public_id)
        }

        return res.sendStatus(204)
    } catch (error) {
        return res.json(500).json ({message: error.message})
    }
}

export const getPost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        return res.json(500).json ({message: error.message})

    }
}