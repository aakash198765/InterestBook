import Utils from "../../libs/Utils";

class Parser {

    static formatStatisticData = (statistics, formData) => {
        if(!formData || !Object.keys(formData).length) {
            return [];
        }
        for(let i in statistics) {
            let statistic = Object.assign({}, statistics[i]);
            let value = 0;
            if(Object.keys(formData).includes(statistic.key)) {
                value = formData[statistic.key];
            }
            statistic["value"] =  Utils.getCurrency(formData["Currency"]) +  value;
            statistics[i] = statistic;
        }
        return statistics;
    }
}

export default Parser;