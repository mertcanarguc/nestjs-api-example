import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto,UserUpdateDto } from 'src/user/user.dto';
import { UserModel } from 'src/user/models/user.model';
import { Model } from 'mongoose'
import env from '../../environments/env'

const bcrypt = require('bcrypt')
const saltRound = 10
const hastText = env.hastText


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userMongo: Model<UserModel>,
  ) {}

  async create(user: UserCreateDto): Promise<UserModel>{
    const createdUser = new this.userMongo(user)
    return await createdUser.save()
  }

  async findAll(): Promise<UserModel[]>{
    return await this.userMongo.find().exec()
  }

  async findOne(id:string): Promise<UserModel>{
    return await this.userMongo.findOne({_id:id}).exec()
  }

  async delete(id:string): Promise<UserModel>{
    return await this.userMongo.findByIdAndRemove({_id:id}).exec()
  }

  async update(id:string,user:UserUpdateDto): Promise<UserModel>{
    let newModel = this.userMongo.findOne({_id:id}).exec()
    newModel = {...newModel, ...user};

    return await this.userMongo.findByIdAndUpdate(id,newModel,{new:true}).exec()
  }

  async convertToHash(value:string){
    let hashPwd;
    await bcrypt.hash(`${hastText}${value}`,saltRound).then(hash=>{
      hashPwd = hash
    });
    return await hashPwd
  }

  async compareToHash(password,hashed){
    const match = await bcrypt.compareSync(`${hastText}${password}`,hashed)
    return await match
  }
}