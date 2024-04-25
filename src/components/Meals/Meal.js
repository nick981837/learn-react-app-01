import {Fragment} from  'react';
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeal";



const Meal = () => {
    return <Fragment>
        <MealsSummary/>
        <AvailableMeals/>
    </Fragment>
}

export default Meal;