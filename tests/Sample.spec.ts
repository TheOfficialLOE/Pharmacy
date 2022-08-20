import { Pharmacist } from "#modules/pharmacist/domain/PharmacistDomainEntity";

describe("VOs", () => {
    it('should test', function () {
        const entity = Pharmacist.registerNew({
                name: "qqwodkqw",
                email: "qwdqwd",
                password: "qwdq"
        });
    });
});