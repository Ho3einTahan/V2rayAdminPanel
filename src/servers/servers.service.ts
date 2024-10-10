import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { V2rayConfigEntity } from 'src/entities/v2ray.config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServersService {

    constructor(@InjectRepository(V2rayConfigEntity) private v2rayConfigRepository: Repository<V2rayConfigEntity>) { }

    async getServers(): Promise<V2rayConfigEntity[]> {
        return await this.v2rayConfigRepository.find();
    }


    async createNewServer(serverAddress: string, countryName: string): Promise<V2rayConfigEntity> {
        const newServer = new V2rayConfigEntity();
        newServer.address = serverAddress;
        newServer.country = countryName;
        return await this.v2rayConfigRepository.save(newServer);
    }


    async getServerById(id: number): Promise<V2rayConfigEntity> {
        return await this.v2rayConfigRepository.findOneBy({ id });
    }

    async updateServerById(id: number, serverAddress: string, countryName: string): Promise<void> {

        const existingServer = await this.v2rayConfigRepository.findOne({ where: { id } });

        if (!existingServer) {
            throw new NotFoundException(`Server with ID ${id} not found`);
        }

        await this.v2rayConfigRepository.update(id, {address: serverAddress, country: countryName });

    }


    async deleteServerById(id: number): Promise<void> {
        await this.v2rayConfigRepository.delete(id);
    }


}
