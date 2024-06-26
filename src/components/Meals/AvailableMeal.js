import classes from "./AvailableMeal.module.css";
import Card from '../UI/Card';
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        setIsLoading(true);
        const fetchMeals = async () => {
        const response = await fetch('https://react-recipe-23b3d-default-rtdb.firebaseio.com/meals.json');

        if(!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        console.log(responseData)
        const loadedMeals = [];
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false)
      }
        fetchMeals().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
    }, [])
    if (isLoading) {
      return <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    }

    if(httpError) {
      return <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    }
    const mealList = meals.map(meal => 
    <MealItem 
    key={meal.id} 
    id={meal.id}
    name={meal.name} 
    description={meal.description} 
    price={meal.price}/>);

    return (
    <section className={classes.meals}>
      <Card>
        <ul>
            {mealList}
        </ul>
        </Card>
    </section>
    )
};

export default AvailableMeals;