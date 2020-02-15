const eCodeGlobal ={

    badRequest:{status:400, Message:"bad request: missing manadatory param"},
    resourceNotFound:{status:404, Message:"Not found: The resource you trying to access isn't found"},
    notAcceptableRes:{status:406, Message:"Not acceptable response: used application/json in header"},
    Success:{status:200, Message:"Success"}

};

   function eCodeHandler (usecase){
        return eCodeGlobal[usecase];
    }



module.exports = eCodeHandler;