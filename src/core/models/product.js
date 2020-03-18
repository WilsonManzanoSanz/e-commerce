export class Product{
    constructor(id, name, description, price, categoryId, photoUrl, disable){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.photoUrl = photoUrl;
        this.disable = disable;
    }
}