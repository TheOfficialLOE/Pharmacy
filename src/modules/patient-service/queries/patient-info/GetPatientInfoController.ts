import { Body, Controller, Get, Inject } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { QueryBusPort } from "#libs/message/QueryBusPort";
import { GetPatientInfoQuery } from "#modules/patient-service/queries/patient-info/GetPatientInfoQuery";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { ExtractToken } from "#libs/decorators/ExtractTokenDecorator";
import { GetPatientInfoRequestDto } from "#modules/patient-service/queries/patient-info/GetPatientInfoRequestDto";
import { CoreApiResponse } from "#modules/experimental/CoreApiResponse";

@Controller("patient-service")
export class GetPatientInfoController {
    constructor(
        @Inject(InfrastructureDiTokens.queryBus)
        private readonly queryBus: QueryBusPort
    ) {}

    @Get("info")
    @AccessibleBy(PharmacyRoles.PHARMACIST)
    public async getPatientInfo(
        @ExtractToken("id") pharmacistId: string,
        @Body() body: GetPatientInfoRequestDto,
    ) {
        return CoreApiResponse.success(await this.queryBus.sendQuery(
            new GetPatientInfoQuery(pharmacistId, body.patientCode)
        ));
    }
}