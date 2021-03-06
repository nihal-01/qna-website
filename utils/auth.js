import jwt from 'jsonwebtoken';

const signToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
        'secret',
        { expiresIn: '30d' }
    );
};

export default signToken;