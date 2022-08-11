import { Pharmacist } from "#modules/pharmacist/domain/PharmacistEntity";

describe("PharmacistEntity", () => {
    it('should create an entity', function () {
        const entity = Pharmacist.new({
            name: "John Doe",
            email: "JohnDoe@Yahoo.com",
            password: "12345678"
        });
        expect(entity).toBeDefined();
    });
});