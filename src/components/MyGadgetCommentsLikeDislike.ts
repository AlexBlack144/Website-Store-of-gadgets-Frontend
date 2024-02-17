export class MyGadgetCommentsLikeDislike {

    private id: Number;
    private fkGadgetsId: Number;
    private fkAspNetUsersId: String;
    private comment: String;
    private isLiked: Boolean;
    private isDisliked: Boolean;

    constructor(id, fkGadgetsId, fkAspNetUsersId, comment, isLiked, isDisliked){
        this.id = id;
        this.fkGadgetsId = fkGadgetsId;
        this.fkAspNetUsersId = fkAspNetUsersId;
        this.comment = comment;
        this.isLiked = isLiked;
        this.isDisliked = isDisliked;
    }

    getId(): Number{
        return this.id;
    }
    getFkGadgetsId(): Number{
        return this.fkGadgetsId;
    }
    getFkAspNetUsersId(): String{
        return this.fkAspNetUsersId;
    }
    getComment(): String{
        return this.comment;
    }
    getIsLiked(): Boolean{
        return this.isLiked;
    }
    getIsDisliked(): Boolean{
        return this.isDisliked;
    }
}