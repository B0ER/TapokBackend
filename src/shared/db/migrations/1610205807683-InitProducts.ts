import { MigrationInterface, QueryRunner } from "typeorm";

export class InitProducts1610205807683 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO Products(id, price, count, title, imageUrl) VALUES ('33587082-bfbc-461f-ac34-f21187d45875', 10, 10, 'Magic slipper', 'https://regnum.ru/uploads/pictures/news/2016/11/23/regnum_picture_147990652561358_normal.jpg')`);
    await queryRunner.query(`INSERT INTO Products(id, price, count, title, imageUrl) VALUES ('68c21683-aabc-4e03-9ef5-189c19e4fce9', 15, 10, 'Dadys slipper', 'https://moizver.com/upload/resize_cache/iblock/107/400_400_140cd750bba9870f18aada2478b24840a/10788141816f9ae836058cad86a51f21.jpg')`);
    await queryRunner.query(`INSERT INTO Products(id, price, count, title, imageUrl) VALUES ('2abe3386-c309-42a9-a58b-e09bf530e26d', 20, 10, 'Gucci red slipper', 'https://cdn-images.farfetch-contents.com/12/72/88/51/12728851_27218960_1000.jpg')`);
    await queryRunner.query(`INSERT INTO Products(id, price, count, title, imageUrl) VALUES ('900f05f8-e7b7-4147-8109-40b26df2fbbb', 25, 10, 'Alexander McQueen slipper', 'https://cdn-images.farfetch-contents.com/15/59/10/13/15591013_28978951_1000.jpg')`);
    await queryRunner.query(`INSERT INTO Products(id, price, count, title, imageUrl) VALUES ('548c3e3b-0476-404d-bea3-b676e69a0653', 320, 10, 'Gucci black', 'https://cdn-images.farfetch-contents.com/14/83/95/77/14839577_23995085_1000.jpg')`);
    await queryRunner.query(`INSERT INTO Products(id, price, count, title, imageUrl) VALUES ('489e8601-70ff-4a8d-9385-5cc73f285470', 35, 10, 'Off-white', 'https://cdn-images.farfetch-contents.com/15/28/17/99/15281799_28568130_1000.jpg')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Products WHERE id='33587082-bfbc-461f-ac34-f21187d45875'`);
    await queryRunner.query(`DELETE FROM Products WHERE id='68c21683-aabc-4e03-9ef5-189c19e4fce9'`);
    await queryRunner.query(`DELETE FROM Products WHERE id='2abe3386-c309-42a9-a58b-e09bf530e26d'`);
    await queryRunner.query(`DELETE FROM Products WHERE id='900f05f8-e7b7-4147-8109-40b26df2fbbb'`);
    await queryRunner.query(`DELETE FROM Products WHERE id='548c3e3b-0476-404d-bea3-b676e69a0653'`);
    await queryRunner.query(`DELETE FROM Products WHERE id='489e8601-70ff-4a8d-9385-5cc73f285470'`);
  }

}
