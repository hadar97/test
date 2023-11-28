require("dotenv").config()
exports.config={
    userDb:process.env.USER_DB,
    passDb:process.env.PASS_DB,
    token:process.env.TOKEN_SECRET,
    port:process.env.PORT
}