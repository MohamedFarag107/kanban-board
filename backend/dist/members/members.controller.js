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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersController = void 0;
const common_1 = require("@nestjs/common");
const members_service_1 = require("./members.service");
const create_member_dto_1 = require("./dto/create-member.dto");
const reorder_members_dto_1 = require("./dto/reorder-members.dto");
const order_helper_1 = require("../helper/order.helper");
const update_member_dto_1 = require("./dto/update-member.dto");
let MembersController = class MembersController {
    constructor(membersService, orderHelper) {
        this.membersService = membersService;
        this.orderHelper = orderHelper;
    }
    async create(memberData) {
        const { email, status } = memberData;
        const member = await this.membersService.findMemberByEmail(email);
        if (member) {
            throw new common_1.BadRequestException('Email Already Exists');
        }
        const lastMember = await this.membersService.getLastMemberOfStatus(status);
        const order = this.orderHelper.generateKeyBetween(lastMember?.order, null);
        return await this.membersService.create({ ...memberData, order });
    }
    async findAll() {
        return await this.membersService.findAll();
    }
    async findOne(id) {
        const member = await this.membersService.findOneById(+id);
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        return member;
    }
    async update(id, updateData) {
        const { status, email } = updateData;
        const data = updateData;
        const member = await this.membersService.findOneById(+id);
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        if (status && status !== member.status) {
            const lastMember = await this.membersService.getLastMemberOfStatus(status);
            const order = this.orderHelper.generateKeyBetween(lastMember?.order, null);
            data.order = order;
        }
        if (email && email !== member.email) {
            const member = await this.membersService.findMemberByEmail(email);
            if (member) {
                throw new common_1.BadRequestException('Cannot use this email because someone already uses it');
            }
        }
        return this.membersService.update(+id, data);
    }
    async reorderMembers(id, { status, bottomMemberId, topMemberId }) {
        const member = await this.membersService.findOneById(+id);
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        const topMember = topMemberId
            ? await this.membersService.findOneById(topMemberId)
            : null;
        if (topMemberId && !topMember) {
            throw new common_1.NotFoundException('Top Member not found');
        }
        const bottomMember = bottomMemberId
            ? await this.membersService.findOneById(bottomMemberId)
            : null;
        if (bottomMemberId && !bottomMember) {
            throw new common_1.NotFoundException('Bottom Member not found');
        }
        const newMemberOrder = this.orderHelper.generateKeyBetween(topMember?.order, bottomMember?.order);
        return await this.membersService.update(+id, {
            status,
            order: newMemberOrder,
        });
    }
    async remove(id) {
        const member = await this.membersService.remove(+id);
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        return member;
    }
};
exports.MembersController = MembersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_member_dto_1.CreateMemberDto]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_member_dto_1.UpdateMemberDto]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/reorder/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reorder_members_dto_1.ReorderMembersDto]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "reorderMembers", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "remove", null);
exports.MembersController = MembersController = __decorate([
    (0, common_1.Controller)('members'),
    __metadata("design:paramtypes", [members_service_1.MembersService,
        order_helper_1.OrderHelper])
], MembersController);
//# sourceMappingURL=members.controller.js.map