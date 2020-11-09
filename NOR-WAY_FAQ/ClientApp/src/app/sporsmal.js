"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sporsmal = void 0;
var sporsmal = /** @class */ (function () {
    function sporsmal(epost, sporring) {
        this.muligeSvar = [];
        this.epost = epost;
        this.sporring = sporring;
    }
    sporsmal.prototype.setEtSvar = function (svarforslag) {
        this.muligeSvar.push(svarforslag);
    };
    sporsmal.prototype.setFaktiskSvar = function (svar) {
        this.godkjentSvar = svar;
    };
    return sporsmal;
}());
exports.sporsmal = sporsmal;
//# sourceMappingURL=sporsmal.js.map