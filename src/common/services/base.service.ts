import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Document } from 'mongoose';


@Injectable()
export class BaseService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: Partial<T>): Promise<T> {
    return this.model.create(createDto);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T> {
    const item = await this.model.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateDto: Partial<T>): Promise<T> {
    const updatedItem = await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updatedItem;
  }

  async delete(id: string): Promise<T> {
    const deletedItem = await this.model.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return deletedItem;
  }
}