import { User } from "../../service/schemas/User.js";
import { nanoid } from "nanoid";
import { sendAuthEmail } from "./sendAuthEmail.js";
import "dotenv/config";
export const registration = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const newUser = new User({
      email,
      subscription,
      verificationToken: nanoid(),
    });
    await sendAuthEmail(newUser.verificationToken)
    newUser.setPassword(password);
    await newUser.save();
   
    const newUserAfterSave = await User.findOne({ email });
    res.status(201).json({ newUserAfterSave });
  } catch (error) {
    next(error);
  }
};
