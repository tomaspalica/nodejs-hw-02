import { updateUser } from "../../models/users.js";
import { User } from "../../service/schemas/User.js";
import { sendAuthEmail } from "./sendAuthEmail.js";
import { nanoid } from "nanoid";

export const resendEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      res.status(400).json({ message: "missing required field email" });
    }
    const user = await User.findOne({ email });

    if (user.verify) {
      res.status(400).json({ message: "Email already verified" });
    }

    const newVeriToken = nanoid();
    console.log(newVeriToken);
    const result = await updateUser(user.id, {
      verificationToken: newVeriToken,
    });

    await sendAuthEmail(newVeriToken);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {}
};
