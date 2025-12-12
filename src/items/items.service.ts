import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop',
      price: 999.99,
      quantity: 10,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Mouse',
      description: 'Wireless mouse',
      price: 29.99,
      quantity: 50,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Keyboard',
      description: 'Mechanical keyboard',
      price: 79.99,
      quantity: 25,
      createdAt: new Date(),
    },
  ];
  private idCounter = 4;

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  create(createItemDto: CreateItemDto): Item {
    const newItem: Item = {
      id: this.idCounter++,
      ...createItemDto,
      createdAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, updateItemDto: UpdateItemDto): Item {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items[itemIndex] = {
      ...this.items[itemIndex],
      ...updateItemDto,
    };
    return this.items[itemIndex];
  }

  remove(id: number): { deleted: boolean; message: string } {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(itemIndex, 1);
    return { deleted: true, message: `Item with ID ${id} has been deleted` };
  }

  search(query: string): Item[] {
    return this.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
