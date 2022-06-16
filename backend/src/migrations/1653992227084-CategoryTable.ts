import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryTable1653992227084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO Category (id, name, description) VALUES (1, 'hotel', 'Un hotel est un lieu génial');`,
    );
    queryRunner.query(
      `INSERT INTO Category (id, name, description) VALUES (2, 'appartement', 'Vous vous sentirez comme chez vous');`,
    );
    queryRunner.query(
      `INSERT INTO Category (id, name, description) VALUES (3, 'guesthouse', 'Rencontrez des habitants');`,
    );
    queryRunner.query(
      `INSERT INTO Category (id, name, description) VALUES (4, 'villa', 'Si vous cherchez plus grand, vous ne trouverez pas');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DELETE FROM Category;');
  }
}
