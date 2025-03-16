//Basic apiresponse handling ki config. no need to understand this code. Can be used for every deveploment environment.

class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;  
    }
}

export { ApiResponse };