import { MigrationInterface, QueryRunner } from 'typeorm';

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum maximus cursus. Nunc aliquam arcu est, quis sodales ante elementum euismod. Curabitur faucibus diam ut facilisis tincidunt. Morbi blandit dui et nunc euismod, nec tristique enim facilisis. Duis sagittis mattis neque, vel iaculis risus pulvinar non.';
const description2 = 'Une deuxième description possible.';
const description3 = 'Cette hotel a une description originale';
export class LocationTable1654004933146 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (1, 'Super Hotel', '${description}', 'London', 'https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg', 4, 2, 90, 1);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (2, 'Super B&B', '${description2}', 'Paris', 'https://cdn.pixabay.com/photo/2016/11/06/23/31/breakfast-1804457_1280.jpg', 5, 1, 105, 3);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (3, 'Super Villa', '${description3}', 'Biarritz', 'https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_1280.jpg', 4, 8, 300, 4);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (4, 'Super Appartment', '${description3}', 'Berlin', 'https://cdn.pixabay.com/photo/2014/08/11/21/40/bedroom-416062_1280.jpg', 3, 2, 150, 2);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (5, 'Another Hotel', '${description}', 'Paris', 'https://cdn.pixabay.com/photo/2012/11/21/10/24/building-66789_1280.jpg', 5, 1, 100, 1);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (6, 'Beautiful Hotel', '${description2}', 'Santiago', 'https://cdn.pixabay.com/photo/2019/05/28/00/15/indoors-4234071_1280.jpg', 4, 2, 50, 1);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (7, 'Horrible Hotel', '${description}', 'Moon', 'https://cdn.pixabay.com/photo/2014/02/08/08/17/architecture-261597_1280.jpg', 1, 1, 30000, 1);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (8, 'Cosy Appartment', '${description2}', 'Lyon', 'https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg', 4, 1, 48, 2);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (9, 'Big Appartment', '${description3}', 'Marseille', 'https://cdn.pixabay.com/photo/2020/03/09/23/59/buildings-4917447_1280.jpg', 2, 4, 147, 2);`,
    );
    queryRunner.query(
      `INSERT INTO Location (id, title, description, location, picture, stars, number_of_rooms, price, category_id) VALUES (10, 'Medium Appartment With a really long title', '${description}', 'Saint-Père-Marc-en-Poulet', 'https://cdn.pixabay.com/photo/2017/07/10/08/22/mont-saint-michel-2489345_1280.jpg', 5, 2, 177, 2);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DELETE FROM Location;');
  }
}
