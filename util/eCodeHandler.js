const eCodeGlobal ={

    badRequest:{status:400, Message:"bad request: missing manadatory param"},
    '404':{status:404, Message:"Not found: The resource you trying to access isn't found"},
    '401':{status:401, Message:"Bad credentials"},
    '403':{status:403, Message:"Forbidden: max limit exceeded"},
    notAcceptableReq:{status:406, Message:"Not acceptable request: use Accept:application/json in header"},
    Success:{status:200, Message:"Success"},
    Unknown:{status:500, Message:"Unknown error"}

};

exports.eCodeHandler = (backendEcode)=>{
        return eCodeGlobal[backendEcode];
    };
