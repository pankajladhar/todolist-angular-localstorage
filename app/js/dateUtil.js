var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var dateUtil = {
    getDateAndMonth : function(providedDate){
        var dateAndMonth = providedDate.getDate()+ " " + month[providedDate.getMonth()];
        return dateAndMonth;
    },

    toDay : function(){
        return new Date()
    }
}