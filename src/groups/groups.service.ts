import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateGroupRelationDto, UpdateGroupDto } from './groups.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class GroupsService {
    constructor(private readonly databaseService : DatabaseService){}

    async createGroup(createGroupRelationDto : CreateGroupRelationDto) : Promise<number>
    {
        const {groupOwnerId,groupName, description,memberIds} = createGroupRelationDto;
        const groupResponse = await this.databaseService.group.create({
            data : {
                userId : groupOwnerId,
                groupName,
                description
            },
            select: {
                id: true
            }
        })
        const groupId = groupResponse.id;
        const userGroupRelation: Prisma.UserGroupCreateInput[] = [
            {
              userId: groupOwnerId,
              groupId,
              role: Role.OWNER,
            },
            ...memberIds.map(userId => ({
              userId,
              groupId,
              role: Role.MEMBER,
            })),
          ];

        await this.databaseService.userGroup.createMany({
            data : userGroupRelation
        })
        return groupId;      
    }

// this is the all the groups user have created, but we also need to show all the groups he is a member of
    @Inject(UserService)
    private readonly userService: UserService;
    async getGroupById(groupId : number){
        try {
            const group = await this.databaseService.group.findFirst({
                where : {
                    id : groupId
                }
            })
            if (!group) {
                // No group was found
                throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
            }            
            const membersData = await this.databaseService.userGroup.findMany({
                where : {
                    groupId
                }
            }) 
            const memberIds = membersData.map(memberData => memberData.userId);
            console.log(memberIds);
            const users  = await this.userService.getUsersByIds(memberIds);
            console.log(users);

            return {
                ...group,
                members: users
            };
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    // get all the groups for a user
    async getAllGroups(userId : number){
        // for this user id get all the group he is a member in and all the groups he is owner of
        const userExists = await this.databaseService.user.findUnique({
            where: { id: userId }
        });
    
        if (!userExists) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const groupData = await this.databaseService.userGroup.findMany({
            where : {
                userId
            }
        })
        const groupIds = groupData.map(gd => gd.groupId);

        if(groupIds.length > 0){
            const group =  await this.databaseService.group.findMany({
                where : {
                    id : {
                        in : groupIds
                    }
                },
                select : {
                    id :  true,
                    userId : true,
                    groupName : true,
                    description : true
                }
            })
            return group;
        }
        // no groups exists for the user
        return [];
    }



    async deleteGroup(groupId: number): Promise<string> {
        const groupExists = await this.databaseService.group.findUnique({
            where: { id: groupId },
        });
        console.log(groupExists);

        if (!groupExists) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }

        await this.databaseService.userGroup.deleteMany({
            where: { groupId },
        });

        await this.databaseService.group.delete({
            where: { id: groupId },
        });

        return `Group with ID ${groupId} deleted successfully`;
    }

    // update a group

    async updateGroup(groupId: number, updateGroupDto: UpdateGroupDto) {
        const { groupName, description, memberIds } = updateGroupDto;

        const groupExists = await this.databaseService.group.findUnique({
            where: { id: groupId },
        });

        if (!groupExists) {
            throw new NotFoundException(`Group with ID ${groupId} not found`);
        }

        try {
            const updatedGroup = await this.databaseService.group.update({
                where: { id: groupId },
                data: {
                    groupName,
                    description,
                },
                select: {
                    id: true,
                    groupName: true,
                    description: true,
                },
            });

            // Deleting existing user-group relations for the group
            await this.databaseService.userGroup.deleteMany({
                where: { groupId },
            });

            const userGroupRelation: Prisma.UserGroupCreateInput[] = [
                ...memberIds.map((userId) => ({
                    userId,
                    groupId,
                    role: Role.MEMBER,
                })),
                {
                    userId: updatedGroup.id,
                    groupId: updatedGroup.id,
                    role: Role.OWNER,
                },
            ];

            await this.databaseService.userGroup.createMany({
                data: userGroupRelation,
            });

            return {
                message: 'Group updated successfully',
                data: updatedGroup,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                'An unexpected error occurred while updating the group',
            );
        }
    }


}




