import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.entity";

const dataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'v2ray',
    entities: [UserEntity],
});

export async function seedAdmin() {

    await dataSource.initialize();

    const userRepository = dataSource.getRepository(UserEntity);

    const adminExists = await userRepository.findOne({ where: { role: 'admin' } });

    if (!adminExists) {
        const admin = new UserEntity();
        admin.role = 'admin';
        admin.phoneNumber = '09905891724';
        admin.userName = 'hoseinTahan';

        admin.password = '09395486064';

        await userRepository.save(admin);

        console.log('Admin user has been created');
    } else {
        console.log('Admin user already exists');
    }

    await dataSource.destroy();
}