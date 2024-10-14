import { v4 as uuidv4 } from "uuid";
// Define the Product interface for type safety
export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  creationDate: Date;
}

export class Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  creationDate: Date;

  constructor(
    name: string,
    description: string,
    price: number,
    creationDate: Date
  ) {
    // generate ID
    let uniqueId = uuidv4();
    this.id = BigInt("0x" + uniqueId.replace(/-/g, "")).toString();

    // Name validation: Required and up to 30 characters
    if (!name || name.length > 30) {
      throw new Error("Name is required and must be up to 30 characters.");
    }
    this.name = name;

    // Description validation: Optional and up to 200 characters
    if (description && description.length > 200) {
      throw new Error("Description must be up to 200 characters.");
    }
    this.description = description || ""; // Optional

    // Price validation: Must be a positive number
    if (!price || price <= 0) {
      throw new Error("Price is required and must be greater than zero.");
    }
    this.price = price;

    // Creation date validation: Must be a valid date
    if (!creationDate || isNaN(creationDate.getTime())) {
      throw new Error("Creation date is required and must be a valid date.");
    }
    this.creationDate = creationDate;
  }
}
