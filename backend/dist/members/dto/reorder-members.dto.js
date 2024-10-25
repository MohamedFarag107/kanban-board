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
exports.ReorderMembersDto = void 0;
const class_validator_1 = require("class-validator");
const member_entity_1 = require("../member.entity");
const swagger_1 = require("@nestjs/swagger");
class ReorderMembersDto {
}
exports.ReorderMembersDto = ReorderMembersDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `The status of a member. It should be one of the following values: 'Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send to Therapist'`,
        type: 'string',
        required: true,
        example: 'Unclaimed',
    }),
    (0, class_validator_1.IsEnum)(member_entity_1.Status),
    __metadata("design:type", String)
], ReorderMembersDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'top member id',
        type: 'number',
        required: false,
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReorderMembersDto.prototype, "topMemberId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'bottom member id',
        type: 'number',
        required: false,
        example: 2,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReorderMembersDto.prototype, "bottomMemberId", void 0);
//# sourceMappingURL=reorder-members.dto.js.map