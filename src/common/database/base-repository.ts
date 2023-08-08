export class BaseRepository<T> {
  private readonly items: Array<T & FindOptions>;

  constructor() {
    this.items = [];
  }

  find() {
    return this.items;
  }

  findOneBy({ id }: FindOptions) {
    return this.items.find((item) => item.id === id) || null;
  }

  remove({ id }: FindOptions) {
    const foundIndex = this.items.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
      return false;
    }

    this.items.splice(foundIndex, 1);

    return true;
  }

  create(dto: T) {
    this.items.push(dto);

    return dto;
  }

  update(id: string, dto: T) {
    const foundIndex = this.items.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
      return null;
    }

    this.items[foundIndex] = dto;

    return dto;
  }

  has(id: string) {
    return Boolean(this.findOneBy({ id }));
  }
}

type FindOptions = {
  id?: string;
};
