import { updateUser } from "../../models/users";
import { User } from "../../service/schemas/User";
export const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (user) {
    const result = await updateUser(user.id, {
      verificationToken: null,
      verify: true,
    });
    res.status(200);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
