const eCodeGlobal ={

    badRequest:{status:400, Message:"bad request: missing manadatory param"},
    '404':{status:404, Message:"Not found: The resource you trying to access isn't found"},
    '401':{status:401, Message:"Bad credentials"},
    '403':{status:403, Message:"Forbidden: max limit exceeded"},
    notAcceptableReq:{status:406, Message:"Not acceptable request: use Accept:application/json in header"},
    Success:{status:200, Message:"Success"},
    Unknown:{status:500, Message:"Unknown error"}

};

exports.eCodeMapper = (backendEcode)=>{
        return eCodeGlobal[backendEcode];
    };

exports.eCodeHandler = (finalResponse)=>{
    let resObj ={};
    if(finalResponse){
        if (finalResponse=="401" || finalResponse=="403"|| finalResponse=="404"){
        const eCode = eCodeGlobal[finalResponse];
        resObj.status = eCode.status;
        resObj.res=eCode;
        }
        else if (Array.isArray(finalResponse)){
        const eCode= eCodeGlobal['Success'];
        resObj.status = eCode.status;
        resObj.res=finalResponse;}
        else{
            const eCode= eCodeGlobal['Unknown'];
            resObj.status = eCode.status;
            resObj.res=eCode;
        }}

    else{
        const eCode= eCodeGlobal['Unknown'];
        resObj.status = eCode.status;
        resObj.res=eCode;
    }
    return resObj;
};
