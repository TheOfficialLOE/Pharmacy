import { Body, Controller, Get, Inject } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { QueryBusPort } from "#libs/message/QueryBusPort";
import { GetPatientInfoQuery } from "#modules/patient-service/queries/patient-info/GetPatientInfoQuery";
import { PatientStatus } from "#modules/patient-service/domain/PatientDomainEntity";
import { SoldDrugEvent } from "#modules/patient-service/domain/PatientDecider";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { ExtractToken } from "#libs/decorators/ExtractTokenDecorator";
import { GetPatientInfoRequestDto } from "#modules/patient-service/queries/patient-info/GetPatientInfoRequestDto";

@Controller("patient-service")
export class GetPatientInfoController {
    constructor(
        @Inject(InfrastructureDiTokens.queryBus)
        private readonly queryBus: QueryBusPort
    ) {}

    @Get("info")
    @AccessibleBy(PharmacyRoles.PHARMACIST)
    public async getPatientInfo(
        @ExtractToken("if") pharmacistId: string,
        @Body() body: GetPatientInfoRequestDto,
    ): Promise<PatientStatus | SoldDrugEvent>
    {
        return await this.queryBus.sendQuery(
            new GetPatientInfoQuery(pharmacistId, body.patientCode)
        );
    }
}