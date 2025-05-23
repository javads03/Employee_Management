"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyAddressTableModifyAddressTable1747997994662 = void 0;
class ModifyAddressTableModifyAddressTable1747997994662 {
    constructor() {
        this.name = 'ModifyAddressTableModifyAddressTable1747997994662';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying `);
            yield queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying `);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying `);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "data_of_joining" TIMESTAMP `);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer `);
            yield queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
            yield queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "data_of_joining"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        });
    }
}
exports.ModifyAddressTableModifyAddressTable1747997994662 = ModifyAddressTableModifyAddressTable1747997994662;
//# sourceMappingURL=1747997994662-modify-address-table-modify-address-table.js.map