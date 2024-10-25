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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const member_entity_1 = require("./member.entity");
let MembersService = class MembersService {
    constructor(membersRepository) {
        this.membersRepository = membersRepository;
    }
    getLastMemberOfStatus(status) {
        return this.membersRepository
            .createQueryBuilder('member')
            .where('member.status = :status', { status })
            .orderBy(`member.order COLLATE "C"`, 'DESC')
            .getOne();
    }
    create(memberData) {
        const member = this.membersRepository.create(memberData);
        return this.membersRepository.save(member);
    }
    findAll() {
        return this.membersRepository
            .createQueryBuilder('member')
            .orderBy('member.status', 'ASC')
            .addOrderBy(`member.order COLLATE "C"`, 'ASC')
            .getMany();
    }
    findOneById(id) {
        return this.membersRepository.findOneBy({ id });
    }
    async update(id, updateData) {
        const member = await this.findOneById(id);
        if (!member)
            return null;
        Object.assign(member, updateData);
        return this.membersRepository.save(member);
    }
    async remove(id) {
        const member = await this.findOneById(id);
        if (!member)
            return null;
        await this.membersRepository.delete(id);
        return member;
    }
    findMemberByEmail(email) {
        return this.membersRepository.findOne({ where: { email } });
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MembersService);
//# sourceMappingURL=members.service.js.map