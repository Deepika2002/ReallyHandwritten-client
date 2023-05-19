import { hash } from "bcryptjs";
import prisma from "../../../../prisma/prisma"




export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, password } = req.body;

    

    try {
      // check if email exists
      const emailExist = await prisma.user.findUnique({ where: { email: email }});
      if (emailExist) {
        return res.status(404).json({ message: 'An account with this email already exists' });
      }

      // hash passwords
      const hashedPassword = await hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: hashedPassword
        },
      });


      res.status(200).json({
        message: "User registration successful",
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error registering user",
        error: error,
      });
    }
  } else {
    res.status(404).json({ message: 'HTTP method not supported' });
  }
}