import express from 'express';
import mongoose from 'mongoose';

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const titulo = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({ titulo });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, autor: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { titulo, historia, autor, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay post con ID: ${id}`);

    const updatedPost = { titulo, historia, autor, selectedFile, tags, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};

export const delPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay post con ID: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post eliminado exitosamente' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Necesitas loggearte" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay post con ID: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router;