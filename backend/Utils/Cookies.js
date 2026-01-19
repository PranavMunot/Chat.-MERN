module.exports = getCookieToken = (statusCode, user, res) => {
    const userToken = user.createJWT()

    const cookieOptions = {
        expires: new Date(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)),
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    user.password = undefined

    res.status(statusCode || 200).cookie('token', userToken, cookieOptions).send({
        success: 'true',
        user
    })
}

