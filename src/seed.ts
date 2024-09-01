import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'v2ray',
    entities: [UserEntity],
    synchronize: true,
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

        // هش کردن رمز عبور قبل از ذخیره‌سازی
        const saltRounds = 10;
        admin.password = await bcrypt.hash('09395486064', saltRounds);

        // ذخیره ادمین در دیتابیس
        await userRepository.save(admin);

        console.log('Admin user has been created');
    } else {
        console.log('Admin user already exists');
    }

    await dataSource.destroy();
}
