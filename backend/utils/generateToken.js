import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    const token = jwt.sign({userId},'abc123',{
        expiresIn : '30d'
    })
    return token
}

export default generateToken