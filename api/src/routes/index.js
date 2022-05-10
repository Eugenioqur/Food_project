const { Router } = require('express');

const axios= require('axios')


const {Recipe,Diet} = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async()=>{
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`);
     
        const recipe = await recipes.data.results.map(el =>{
            return{
                id: el.id,
                title: el.title,
                summary: el.summary,
                spoonacularScore: el.spoonacularScore,
                healthScore: el.healthScore,
                analyzedInstructions: el.analyzedInstructions.map(e =>e),
                diets: el.diets.map(e => e),
                image: el.image
            }
        })
        return recipe;
}

const getDbInfo = async()=>{
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes:['title'],
            through:{
                attributes:[],
            }
        }
    })
}

const allInfo = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const info = apiInfo.concat(dbInfo)
    return info
}

router.get('/recipes',async (req,res)=>{
    const {name} = req.query;
    const recipes = await allInfo();

    if(name){
        let recipeFound = await recipes.filter(el=> el.title.toUpperCase().includes(name.toUpperCase()))
        if(recipeFound.length){
            res.status(200).send(recipeFound)
        }else{
            res.status(404).json({msg:'recipe not found'})
        }
    }else{
        res.status(200).send(recipes)
    }
})

router.post('/recipe',async (req,res)=>{
    const {title ,summary,spoonacularScore,healthScore,analyzedInstructions,diets} = req.body
    const recipe = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
    })
    
    let dietsInDb = await Diet.findAll({
        where: {title : diets}
    })

    recipe.addDiet(dietsInDb)
    
    res.send(recipe)
})

router.get('/recipes/:idReceta', async(req,res)=>{
    const id = req.params.idReceta;
    const recipes = await allInfo();
    idFound = await recipes.find(e => e.id == id)
    if(idFound){
        res.status(200).send(idFound)
    }else{
        res.status(404).json({msg:'id is not valid'})
    }
})

router.get('/types', async(req,res)=>{
    const allInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`)
    const types = allInfo.data.results.flatMap(e => e.diets)
    const onePer =[]
    types.map(el => {
        if(!onePer.includes(el)){
            onePer.push(el)
        }
    })
    onePer.forEach(e=>{
        if(e){
             Diet.findOrCreate({
                where: {title: e}
            })
        }
    })
    const allTypes = await Diet.findAll()
    res.send(allTypes)
})

module.exports = router;
