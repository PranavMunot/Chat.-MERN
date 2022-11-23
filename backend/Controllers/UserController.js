exports.login = (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)


    res.status(200).json({
        success: 'true',
        email,
        password,
    })
}