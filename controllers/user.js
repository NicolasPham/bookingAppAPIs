import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const updateUser = async(req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).send(updateUser)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been deleted")
    } catch (error) {
        next(error)
    }
}