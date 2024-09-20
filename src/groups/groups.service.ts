import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GroupsService {
    constructor(private readonly databaseService : DatabaseService){}
    // input : groupDto and list of all the users in the group
    async createGroup(createGroupDto : Prisma.GroupCreateInput,userIds? : number[])
    {
        try {
            const groupResponse = await this.databaseService.group.create({
                data : createGroupDto,
                select: {
                    id: true
                }
            })
            const groupId = groupResponse.id;
            // for this group id create user Entries in the user group
            const userGroupRelation : Prisma.UserGroupCreateInput[] = userIds.map(userId => ({
                        userId,
                        groupId,
                        role : Role.MEMBER 
                }))
            await this.databaseService.userGroup.createMany({
                data : userGroupRelation
            })
            return groupId;


            }catch (error)
            {
                return -1;  
            }
    }

    async getGroupData(groupId : number){
        try {
            const group = await this.databaseService.group.findFirst({
                where : {
                    id : groupId
                }
            })
            return group;
        } catch (error) {
            return null;
        }
    }
    



}
