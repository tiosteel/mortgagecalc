import { IMortgageFormula } from "./types";
export class MortgageFormula implements IMortgageFormula {
    PMT(r: number, nper: number, pv: number, fv: number, type: number): number {

        // pmt = r / ((1 + r)^N - 1) * -(pv * (1 + r)^N + fv)
        
        let pmt: number = r / (Math.pow(1 + r, nper) - 1) * -(pv * Math.pow(1 + r, nper) + fv);
    
        // account for payments at beginning of period versus end.
        if (type === 1) {
            pmt /= (1 + r);
        }
    
        return pmt;
    }

    PPMT(r: number, per: number, nper: number, pv: number, fv: number, type: number): number {
        // Calculated payment per period minus interest portion of that period.
        // i.e., ppmt = c - i
        // where c = pmt(r, nper, pv, fv, type)
        // and i = ipmt(r, per, nper, pv, fv, type)

        return this.PMT(r, nper, pv, fv, type) - this.IPMT(r, per, nper, pv, fv, type);
    }

    IPMT(r: number, per: number, nper: number, pv: number, fv: number, type: number): number {
        // Prior period (i.e., per-1) balance times periodic interest rate.
        // i.e., ipmt = fv(r, per-1, c, pv, type) * r
        // where c = pmt(r, nper, pv, fv, type)
        let ipmt: number = this.FV(r, per - 1, this.PMT(r, nper, pv, fv, type), pv, type) * r;
    
        // account for payments at beginning of period versus end.
        if (type == 1) {
            ipmt /= (1 + r);
        }
    
        return ipmt;
    }

    FV(r: number, nper: number, c: number, pv: number, type: number): number {
        if (type == 1) {
            c *= (1 + r);
        }
    
        // fv = -(((1 + r)^N - 1) / r * c + pv * (1 + r)^N);
        const fv: number = -((Math.pow(1 + r, nper) - 1) / r * c + pv * Math.pow(1 + r, nper));
    
        return fv;
    }
}