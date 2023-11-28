const jwt=require("jsonwebtoken")


exports.auth= async(req, res,next) => {
    let token = req.header("x-api-key")
    if (!token) {
        return res.status(401).json({ msg: "you need to send token to this endpoint url6666" })
    }
    try {
        let tokenData = jwt.verify(token, "Hadarsecret");
        console.log(tokenData);
       req.tokenData=tokenData;
       next();
    }
    catch (err) {
        return res.status(401).json({ msg: "Token not valid or expired!" })
    }
}