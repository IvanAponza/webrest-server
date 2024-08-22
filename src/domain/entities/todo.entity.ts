


export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public createAt?: Date|null
    ){}

    get isCreated () {
        return !!this.createAt; //doble negacion ! false !! true
    }

    //Mapper
    public static fromObject (object: {[key: string]: any}): TodoEntity{
        const { id, text, createAt } = object;

        if( !id ) throw 'Id is required';
        if( !text ) throw 'Text is required';

        //comprueba que sea una fecha validad
        let newCreateAt;
        if( createAt ){
            newCreateAt = new Date(createAt);
            if( isNaN(newCreateAt.getTime())){
                throw 'CreateAt is not a valid date'
            }
        }

        //Creamos la instancia desde el obj
        return new TodoEntity( id, text, createAt );
    }
}