import { Accountant } from "#modules/accountant/domain/AccountantDomainEntity";

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