const User = require('../Models/user.model');

const UserController = {}

UserController.register = async (req, res, next) => {
    const { username, email, password, joined } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            res.status(400);
            return res.send({ error: "User already exists" });
        }
        const newUser = new User({
            username,
            email,
            password,
            joined
        });
          user = await newUser.save();
        return res.send({ user });
    } catch (err) {
        res.status(500);

        return res.send({ error: "server error" });
    }
}
module.exports = UserController;