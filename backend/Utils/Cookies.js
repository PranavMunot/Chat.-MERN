module.exports = getCookieToken = (user, res) => {
    const userToken = user.createJWT()

    const cookieOptions = {
        expires: new Date(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)),
        httpOnly: true,

    }

    user.password = undefined

    res.status(200).cookie('token', userToken, cookieOptions).send({
        success: 'true',
        token: userToken,
        user
    })
}

