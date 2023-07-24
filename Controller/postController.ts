import { Request,Response } from "express";
import postModel from "../Model/postModel";
import authModel from "../Model/authModel";
import mongoose from "mongoose";

export const writeSong = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {authID} = req.body
        const {title,content}= req.body

        const post:any = await authModel.findById(authID)
        const user =await postModel.create({
            title,
            content,
        })
        post?.user?.push(new mongoose.Types.ObjectId(user._id))
        post?.save();
        return res.status(201).json({
            messsage:"song created",
            data:user
        })
    } catch (error) {
        return res.status(404).json({
            message:"unable to write song"
        })
    }
}
export const viewSongs = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const user = await postModel.find()
        return res.status(200).json({
            message:"view song",
            data:user
        })
    } catch (error) {
        return res.status(404).json({
            message:"unable to write song"
        })
    }
    }

export const viewOneSong = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { songID } = req.params;
    const post = await postModel.findById(songID);

    return res.status(200).json({
      message: "read Post",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts",
    });
  }
};
export const UpdateOneSong = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const { title, content } = req.body;
      const { songID } = req.params;
      const post = await postModel.findByIdAndUpdate(
        songID,
        { title, content },
        { new: true },
      );
  
      return res.status(201).json({
        message: "song updated",
        data: post,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Unable to read Posts",
      });
    }
  };

  export const deleteOnesong = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const { songID } = req.params;
      const post = await postModel.findByIdAndDelete(songID);
  
      return res.status(201).json({
        message: "song delete",
        data: post,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Unable to read Posts",
      });
    }
  };