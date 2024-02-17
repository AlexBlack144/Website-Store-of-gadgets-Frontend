export class myBasketGadjets{
    private id: Number;
    private image: String;
    private name: String;
    private description: String;
    private model: String;
    private price: Number;
    private quantity: Number;
    private sold: Number;
    private status: String;
    private idCategory: Number;
    private count: Number;
 
    constructor(id, image, name, description, model, price, quantity, sold, status, idCategory, count){
         this.id = id;
         this.image = image;
         this.name = name;
         this.description = description;
         this.model = model;
         this.price = price;
         this.quantity = quantity;
         this.sold = sold;
         this.status = status;
         this.idCategory = idCategory;
         this.count = count;
     }
     getId(): Number{
         return this.id;
     }
     getImage(): String{
          return this.image;
     }
     getName(): String{
         return this.name;
     }
     getDescription(): String{
          return this.description;
     }
     getModel(): String{
     return this.model;
     }
     getPrice(): Number{
          return this.price;
     }
     getQuantity(): Number{
          return this.quantity;
     }
     getSold(): Number{
          return this.sold;
     }
     getStatus(): String{
          return this.status;
     }
     getIdCategory(): Number{
          return this.idCategory;
     }
     getCount(): Number{
          return this.count;
     }
 }