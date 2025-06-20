export class Facility {
    id: string;
    name: string;
    address: string;
    description: string;
    coverImageUrl: string;
    openTime: string;
    closeTime: string;
    isFavorite: boolean;

  constructor(
    id: string,
    name: string,
    address: string,
    description: string,
    coverImageUrl: string, 
    openTime: string,
    closeTime: string,
    isFavorite: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.description = description;
    this.coverImageUrl = coverImageUrl;
    this.openTime = openTime;
    this.closeTime = closeTime;
    this.isFavorite = isFavorite;
  }
}