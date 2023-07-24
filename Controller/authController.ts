import {Request,Response} from "express"
import bcrypt from "bcrypt"
import authModel from "../Model/authModel";

export const createUser = async(req:Request,res:Response):Promise<Response>=>{
  try {
    const {email,password,userName} = req.body;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user= await authModel.create({
        email,
        password:hash,
        userName,
    })

    return res.status(201).json({
        messsage:"user created",
        data:user
    })
  } catch (error) {
    return res.status(404).json({
        message:"unable to create user"
    })
  }
}

export const SignUpUser = async(req:Request,res:Response):Promise<Response>=>{
try {
    const {email,password} = req.body;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await authModel.findOne({email})
    if (user) {
        const checkpassword = await bcrypt.compare(password,user?.password!);
        if (checkpassword) {
            return res.status(201).json({
                message:"user in",
                data:user._id,
            })
        } else {
            return res.status(404).json({
                message:"user password not correct"
            })
        }
    } else {
       return res.status(404).json({
        messsage:"user does not stay here"
       })
    }

} catch (error) {
   return res.status(404).json({
    message:"user does not exit "
   })
}
}

export const viewUser = async(req:Request,res:Response):Promise<Response>=>{
try {
    const user = await authModel.find()
    return res.status(200).json({
        message:"view user",
        data:user
    })
} catch (error) {
    return res.status(404).json({
        message:"unable to view user"
    })
}
}

export const updateOneUser = async(req:Request,res:Response):Promise<Response>=>{
try {
     const {userName} = req.body;
     const {UserID} = req.body;

     const user = await authModel.findByIdAndUpdate(
        UserID,
        {
            userName,
        },
        {new:true}
     )
     return res.status(201).json({
        message: "update user",
        data: user,
      });
} catch (error) {
   return res.status(404).json({
    message:"Unable to update user"
   })
}
}
export const ViewOneUser = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const { userID } = req.params;
      const user = await authModel.findById(userID);
  
      return res.status(200).json({
        message: "view user",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Unable to view user",
      });
    }
  };
  export const deleteOneUser = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const { userID } = req.params;
      const user = await authModel.findByIdAndDelete(userID);
  
      return res.status(201).json({
        message: "user deleted",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Unable to delete user",
      });
    }
  };