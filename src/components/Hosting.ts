export class Hosting{
    private host: String;

    constructor(){
        //this.host = 'webapplicationclient20230302194755.azurewebsites.net';
        this.host = 'localhost:7020';
    }
    getHost(): String{
        return this.host;
    }
     
 }