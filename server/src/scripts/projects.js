//each project will be a class
class project{
    //name of project
    name;
    //description of project
    description;
    //image of project
    image;
    //concepts applied for each project
    concepts;

    //constructor for each project
    constructor(name, description, image, concepts){
        this.name = name;
        this.description = description; 
        this.image = image;
        this.concepts = concepts;
    }

    //getter methods for each field
    getName(){return this.name}
    getDescription(){return this.description}
    getImage(){return this.image}
    getConcepts(){return this.concepts}

    //setter methods for each field
    setName(name){
        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }

    setImage(image){
        this.image = image;
    }

    setConcepts(concepts){
        this.concepts = concepts;
    }

    //this will work for relative window depth
    displayProject(){
        
    }
}