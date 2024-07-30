export default interface IMortgageFormula {

    /**
     * @description Emulates Excel/Calc's PMT(interest_rate, number_payments, PV, FV, Type)
     * function, which calculates the mortgage or annuity payment / yield per period.
     * 
     * @param r - periodic interest rate represented as a decimal.
     * @param nper - number of total payments / periods.
     * @param pv - present value -- borrowed or invested principal.
     * @param fv - future value of loan or annuity.
     * @param type - when payment is made: beginning of period is 1; end, 0.
     * 
     * @return <code>double</code> representing periodic payment amount.
     * 
     * @link https://www.experts-exchange.com/articles/1948/A-Guide-to-the-PMT-FV-IPMT-and-PPMT-Functions.html
     * @link https://support.microsoft.com/en-us/office/pmt-function-0214da64-9a63-4996-bc20-214433fa6441
     */
    PMT(r: number, nper: number, pv: number, fv: number, type: number): number;

    /**
     * @description Emulates Excel/Calc's PPMT(interest_rate, period, number_payments, PV, FV, Type) function, 
     * which calculates the portion of the payment at a given period that will apply to principal.
     * 
     * @param r - periodic interest rate represented as a decimal.
     * @param per - period (payment number) to check value at.
     * @param nper - number of total payments / periods.
     * @param pv - present value -- borrowed or invested principal.
     * @param fv - future value of loan or annuity.
     * @param type - when payment is made: beginning of period is 1; end, 0.
     * 
     * @return representing principal portion of payment.
     * 
     * @link https://www.experts-exchange.com/articles/1948/A-Guide-to-the-PMT-FV-IPMT-and-PPMT-Functions.html
     * @link https://support.microsoft.com/en-us/office/ppmt-function-c370d9e3-7749-4ca4-beea-b06c6ac95e1b
     */
    PPMT(r: number, per: number, nper: number, pv: number, fv: number, type: number): number;

    /**
     * @description Emulates Excel/Calc's IPMT(interest_rate, period, number_payments, PV, FV, Type) function, 
     * which calculates the portion of the payment at a given period that is the interest on previous balance.
     * 
     * @param r - periodic interest rate represented as a decimal.
     * @param per - period (payment number) to check value at.
     * @param nper - number of total payments / periods.
     * @param pv - present value -- borrowed or invested principal.
     * @param fv - future value of loan or annuity.
     * @param type - when payment is made: beginning of period is 1; end, 0.
     * 
     * @return representing interest portion of payment.
     * 
     * @link https://www.experts-exchange.com/articles/1948/A-Guide-to-the-PMT-FV-IPMT-and-PPMT-Functions.html
     * @link https://support.microsoft.com/en-us/office/ipmt-function-5cce0ad6-8402-4a41-8d29-61a0b054cb6f
     */
    IPMT(r: number, per: number, nper: number, pv: number, fv: number, type: number): number;

    /**
     * @description Emulates Excel/Calc's FV(interest_rate, number_payments, payment, PV, Type) function, 
     * which calculates future value or principal at period N.
     * @param r - periodic interest rate represented as a decimal.
     * @param nper - number of total payments / periods.
     * @param c - periodic payment amount.
     * @param pv - present value -- borrowed or invested principal.
     * @param type - when payment is made: beginning of period is 1; end, 0.
     * 
     * @return representing future principal value.
     * 
     * @link https://www.experts-exchange.com/articles/1948/A-Guide-to-the-PMT-FV-IPMT-and-PPMT-Functions.html
     * @link https://support.microsoft.com/en-us/office/fv-function-2eef9f44-a084-4c61-bdd8-4fe4bb1b71b3
     */
    FV(r: number, nper: number, c: number, pv: number, type: number): number;

}