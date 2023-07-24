import express from "express";
import mongoose from "mongoose";

interface iPost {
  title?: string;
  content?: string;
}

interface iPostData extends iPost, mongoose.Document {}

const postModel = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<iPostData>("posts", postModel);
