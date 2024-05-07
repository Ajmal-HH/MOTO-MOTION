import User from '../model/userModel.js';

const is_blocked = async (req, res, next) => {
    try {
        const id = req.session.userId;
        const findUser = await User.findOne({ _id: id });
        if (findUser && findUser.isBlocked) {            
            req.session = null;
            res.cookie("jwt", "", {
                httpOnly: false,
                expires: new Date(0),
            });
            return res.redirect('/');
        } else {
            next();
        }
    } catch (error) {
        console.log(error.message);
    }
};

export { is_blocked };
