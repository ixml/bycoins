const apiError = function(code,message){

    this.message = message;
    this.code = code;
    this.name = "ApiError"
}


module.exports = apiError;