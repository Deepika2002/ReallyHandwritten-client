import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prisma from "../../../../prisma/prisma"

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await compare(password, user.password);

    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userid = user.id;
    const token = sign({ userid }, process.env.TOKEN_SECRET);
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}