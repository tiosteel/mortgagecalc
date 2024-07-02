const cds = require('@sap/cds');

class CalculatorService extends cds.ApplicationService {
    init() {
        super.init();
    }

    async getEuribor(day, period) {
        const result = await SELECT.one.from(cds.db.entities['mortgagecalc.db.tables.Euribor']).where({day: {'<=': day}});
        
        return result?.[period];
    }
}

module.exports = CalculatorService;