import prisma from "../prisma/prisma";

export default async function handler(req, res, next) {
  
    try {
      const { token } = req.headers;
      
      if (!token) {
        return res.sendStatus(400); // bad request
      }

      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const userid = decoded.userid;
      const user = await prisma.user.findUnique({ where: { userid: userid } });
      
      if (!user) {
        return res.status(403).json({ message: "Not authorized to use this resource" });
      } else{
        req.userid = userid;
        next();
      } 

    } catch (error) {
      console.error(error);
    }
};