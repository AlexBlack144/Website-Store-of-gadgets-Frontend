export class myPurchases{
    private id: Number;
    private image: String;
    private name: String;
    private model: String;
    private count: Number;
    private total_price: Number;
    private date: String;

    constructor(id, image, name, model, count, total_price, date){
        this.id = id;
        this.image = image;
        this.name = name;
        this.model = model;
        this.count = count;
        this.total_price = total_price;
        this.date = date;
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
   getModel(): String{
   return this.model;
   }
   getCount(): Number{
    return this.count;
    }
   getTotalPrice(): Number{
        return this.total_price;
   }
   getDate(): String{
    return this.date;
}
}