import { updateUser } from "../../models/users.js";
import { User } from "../../service/schemas/User.js";
export const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const correctVerifyToken = await verificationToken.replace(":", "");
  const user = await User.findOne({ verificationToken: correctVerifyToken });
  console.log(user);

  if (user) {
    const result = await updateUser(user.id, {
      verificationToken: null,
      verify: true,
    });
    res.status(200).json({ message: "Verification successful" });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
