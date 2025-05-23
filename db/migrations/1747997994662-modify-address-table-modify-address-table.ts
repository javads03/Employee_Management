import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyAddressTableModifyAddressTable1747997994662 implements MigrationInterface {
    name = 'ModifyAddressTableModifyAddressTable1747997994662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying `);
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "data_of_joining" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer `);
        await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "data_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
    }

}
