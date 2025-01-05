import jwt from 'jsonwebtoken'

// doctor authentication middleware
const authCompany = async (req, res, next) => {
    const { dtoken } = req.headers
    if (!dtoken) {
        return res.json({ success: false, message: 'Not Authorized Company Login Again' })
    }
    try {
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId = token_decode.id
        next()
    } catch (error) {
        
        res.json({ success: false, message: error.message })
    }
}

export default authCompany;