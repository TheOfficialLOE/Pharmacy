import { Accountant } from "#modules/staff/accountant/domain/AccountantEntity";

describe("AccountantEntity", () => {
    it('should create an entity', function () {
        const entity = Accountant.new({
            name: "John Doe",
            email: "JohnDoe@Yahoo.com",
            password: "12345678"
        });
        expect(entity).toBeDefined();
    });
});