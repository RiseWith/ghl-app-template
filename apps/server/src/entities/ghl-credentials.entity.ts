import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { AppUserType, IGhlCredentials } from '@cbnsndwch/ghl-app-contracts';

@Schema({ collection: 'ghl_credentials' })
export class GhlCredentials implements IGhlCredentials {
    _id!: string;

    @ApiProperty({
        description: 'Autogenerated ID.'
    })
    id!: string;

    @ApiProperty({
        description: 'The authorization level of this credentials record.'
    })
    @Prop({ required: true, enum: AppUserType })
    userType!: AppUserType;

    @ApiProperty({
        description: 'If an agency-level credentials set, the ID of the agency.'
    })
    @Prop()
    companyId?: string;

    @ApiProperty({
        description:
            'If a location-level credentials set, the ID of the location.'
    })
    @Prop()
    locationId?: string;

    @ApiProperty({
        description: 'The GHL APIv2 access token.'
    })
    @Prop({ required: true })
    accessToken!: string;

    @ApiProperty({
        description: 'The GHL APIv2 access token expiration date.'
    })
    @Prop({ required: true })
    expiresAt!: Date;

    @ApiProperty({
        description:
            'The GHL APIv2 refresh token. Refresh tokens are valid for up to a year and can be used to generate a new access token once.'
    })
    @Prop({ required: true })
    refreshToken!: string;

    @ApiProperty({
        description: 'The GHL APIv2 scopes this token grants access to.'
    })
    @Prop({ required: true })
    scopes!: string[];
}

export const GhlCredentialsSchema =
    SchemaFactory.createForClass(GhlCredentials);

GhlCredentialsSchema.index(
    { companyId: 1 },
    { name: 'sidx_ghlCredentials_companyId', sparse: true }
);
GhlCredentialsSchema.index(
    { locationId: 1 },
    { name: 'sidx_ghlCredentials_locationId', sparse: true }
);
GhlCredentialsSchema.index(
    { companyId: 1, locationId: 1 },
    {
        name: 'sidx_ghlCredentials_companyId_locationId',
        sparse: true
    }
);