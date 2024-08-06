import type IMortgageFormula from "./IMortgageFormula";

class MortgageFormula implements IMortgageFormula {
    PMT(rate: number, nper: number, pv: number, fv: number = 0, type: number = 0): number {

        // pmt = r / ((1 + r)^N - 1) * -(pv * (1 + r)^N + fv)
        
        let pmt: number = rate / (Math.pow(1 + rate, nper) - 1) * -(pv * Math.pow(1 + rate, nper) + fv);
    
        // account for payments at beginning of period versus end.
        if (type === 1) {
            pmt /= (1 + rate);
        }
    
        return pmt;
    }

    PPMT(rate: number, per: number, nper: number, pv: number, fv: number = 0, type: number = 0): number {
        // Calculated payment per period minus interest portion of that period.
        // i.e., ppmt = c - i
        // where c = pmt(r, nper, pv, fv, type)
        // and i = ipmt(r, per, nper, pv, fv, type)

        return this.PMT(rate, nper, pv, fv, type) - this.IPMT(rate, per, nper, pv, fv, type);
    }

    IPMT(rate: number, per: number, nper: number, pv: number, fv: number  = 0, type: number = 0): number {
        // Prior period (i.e., per-1) balance times periodic interest rate.
        // i.e., ipmt = fv(r, per-1, c, pv, type) * r
        // where c = pmt(r, nper, pv, fv, type)
        let ipmt: number = this.FV(rate, per - 1, this.PMT(rate, nper, pv, fv, type), pv, type) * rate;
    
        // account for payments at beginning of period versus end.
        if (type == 1) {
            ipmt /= (1 + rate);
        }
    
        return ipmt;
    }

    FV(rate: number, nper: number, c: number, pv: number, type: number = 0): number {
        if (type == 1) {
            c *= (1 + rate);
        }
    
        // fv = -(((1 + r)^N - 1) / r * c + pv * (1 + r)^N);
        const fv: number = -((Math.pow(1 + rate, nper) - 1) / rate * c + pv * Math.pow(1 + rate, nper));
    
        return fv;
    }
}

export default new MortgageFormula();
