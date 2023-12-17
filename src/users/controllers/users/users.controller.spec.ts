import {Test, TestingModule} from "@nestjs/testing";
import {UsersService} from "../../services/users/users.service";


describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async() => {
        const module = await Test.createTestingModule({
            providers: [UsersService]
        }).compile()

        service = module.get<UsersService>(UsersService)
    });

    it('should be defind', () => {
        expect(service).toBeDefined();
    })
})