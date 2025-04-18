import User from '../models/User.js'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'

const saltRounds = 10;

export const login = async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "invalid username" })
    }

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" })
    }

    const token = generateToken(user._id);

    res.cookie("token", token)

    res.status(200).json({ message: "login successful", user })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}

export const logout = async (req, res) => {
  res.cookie("token", "")
  res.json({ message: "Logged out successfully" })
}

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: `Missing username or password or email.` })
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already registered." });
      } else {
        return res.status(400).json({ message: "Email already registered." });
      }
    }

    const passwordHash = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
      username,
      password: passwordHash,
      email,
      role: "employee"
    })

    await newUser.save();
    res.status(201).json({message: `Registration successful!`})

  }
  catch (error) {
    console.error({ error: error.message });
  }
}
