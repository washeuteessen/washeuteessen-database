//Pipeline
//Create view to find unparsed recipes
db.recipes.aggregate(
[
        //step 1: join with other collection
        { 
            "$lookup" : {
                "from" : "recipes", 
                "localField" : "url", 
                "foreignField" : "url", 
                "as" : "recipes_parsed_raw"
            }
        }, 

        //step 2: define which elements to keep and create
        { 
            "$project" : {
                "url" : 1.0, 
                "domain" : 1.0,
		"htmlbody" : 1.0, 
                "AlreadyParsed" : {
                    "$anyElementTrue" : [
                        "$recipes_parsed_raw"
                    ]
                }
            }
        },

        //step 3: exclude ealready parsed elements by filtering
        { 
            "$match" : {
                "AlreadyParsed" : false
            }
        }
    ]
)

//View
db.createView(
    //name of view
	"unparsedURLS",

    //name source collection
	"recipes_raw",

    //pipeline
    [
        //step 1: join with other collection
        { 
            "$lookup" : {
                "from" : "recipes", 
                "localField" : "url", 
                "foreignField" : "url", 
                "as" : "recipes_parsed_raw"
            }
        }, 

        //step 2: define which elements to keep and create
        { 
            "$project" : {
                "url" : 1.0, 
                "domain" : 1.0,
		"htmlbody" : 1.0, 
                "AlreadyParsed" : {
                    "$anyElementTrue" : [
                        "$recipes_parsed_raw"
                    ]
                }
            }
        },

        //step 3: exclude ealready parsed elements by filtering
        { 
            "$match" : {
                "AlreadyParsed" : false
            }
        }
    ], 

    { 
        "allowDiskUse" : false
    }
);