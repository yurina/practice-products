import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductsTable1769028199319 implements MigrationInterface {
    name = 'UpdateProductsTable1769028199319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "isAvailable" TO "isActive"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "isActive" TO "isAvailable"`);
    }

}
