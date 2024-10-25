"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMemberDto = void 0;
const class_validator_1 = require("class-validator");
const member_entity_1 = require("../member.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateMemberDto {
}
exports.CreateMemberDto = CreateMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of a member',
        type: 'string',
        required: true,
        example: 'John Doe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of a member',
        type: 'string',
        required: true,
        example: 'Software Engineer',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The age of a member',
        type: 'number',
        required: true,
        example: 30,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(150),
    __metadata("design:type", Number)
], CreateMemberDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of a member',
        type: 'string',
        required: true,
        example: 'example@gmail.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The mobile number of a member',
        type: 'string',
        required: true,
        example: '+201234567890',
    }),
    (0, class_validator_1.IsPhoneNumber)(undefined, {
        message: 'Mobile number must be a valid phone number with country code',
    }),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "mobile_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `The status of a member. It should be one of the following values: 'Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send to Therapist'`,
        type: 'string',
        required: true,
        example: 'Unclaimed',
    }),
    (0, class_validator_1.IsEnum)(member_entity_1.Status),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "status", void 0);
//# sourceMappingURL=create-member.dto.js.map