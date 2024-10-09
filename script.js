// Food data
const foodData = {
    "Bread": [
        { name: "Arabic bread", servingSize: "1/4 loaf", grams: 30, calories: 80, carbs: 15, protein: 2, fats: 1, arabicName: "خبز عربي" },
        { name: "Biscuit", servingSize: "6 cm from one side of the biscuit to the other", grams: 30, calories: 100, carbs: 12, protein: 2, fats: 5 },
        { name: "Chapatti bread", servingSize: "15 cm from one side of the bread to the other", grams: 30, calories: 90, carbs: 18, protein: 3, fats: 0.5 },
        { name: "English muffin", servingSize: "1", grams: 50, calories: 120, carbs: 25, protein: 4, fats: 1 },
        { name: "Hot dog bun", servingSize: "0.5", grams: 30, calories: 70, carbs: 13, protein: 2, fats: 1 },
        { name: "Hamburger bun", servingSize: "0.5", grams: 30, calories: 80, carbs: 14, protein: 3, fats: 1 },
        { name: "Pancake", servingSize: "10 cm from one side of the pancake to the other", grams: 30, calories: 90, carbs: 15, protein: 2, fats: 3 },
        { name: "Taco shell", servingSize: "2", grams: 20, calories: 70, carbs: 10, protein: 2, fats: 3 }
    ],
    "Cereals and Grains": [
        { name: "Barley, cooked", servingSize: "1/3 cup", grams: 50, calories: 70, carbs: 15, protein: 3, fats: 1 },
        { name: "Oat, dry", servingSize: "1/4 cup", grams: 30, calories: 120, carbs: 21, protein: 4, fats: 3 },
        { name: "Wheat, dry", servingSize: "1/2 cup", grams: 60, calories: 200, carbs: 43, protein: 7, fats: 1 },
        { name: "Bulghul, cooked", servingSize: "1/2 cup", grams: 70, calories: 150, carbs: 30, protein: 5, fats: 0.5 }
    ]
};

let customMacros = {
    meal1: { carbs: 0, protein: 0, fats: 0 },
    meal2: { carbs: 0, protein: 0, fats: 0 },
    meal3: { carbs: 0, protein: 0, fats: 0 }
};

// Update food options based on category
function updateFoodOptions(meal) {
    const category = document.getElementById(`${meal}Category`).value;
    const foodSelect = document.getElementById(`${meal}Food`);
    foodSelect.innerHTML = `<option value="">--Select Food--</option>`;
    if (category) {
        foodData[category].forEach(food => {
            const option = document.createElement('option');
            option.value = food.name;
            option.textContent = food.name;
            foodSelect.appendChild(option);
        });
    }
}

// Calculate meal based on food selection and serving size
function calculateMeal(meal) {
    const foodSelect = document.getElementById(`${meal}Food`);
    const selectedFood = foodData[document.getElementById(`${meal}Category`).value].find(food => food.name === foodSelect.value);
    const servingSize = parseFloat(document.getElementById(`${meal}ServingSize`).value) || 0;
    const gramsInput = parseFloat(document.getElementById(`${meal}Grams`).value) || 0;

    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFats = 0;

    if (selectedFood) {
        if (gramsInput === 0) {
            totalCalories = selectedFood.calories * servingSize;
            totalCarbs = selectedFood.carbs * servingSize;
            totalProtein = selectedFood.protein * servingSize;
            totalFats = selectedFood.fats * servingSize;
        } else {
            const ratio = gramsInput / selectedFood.grams;
            totalCalories = selectedFood.calories * ratio;
            totalCarbs = selectedFood.carbs * ratio;
            totalProtein = selectedFood.protein * ratio;
            totalFats = selectedFood.fats * ratio;
        }
    }

    document.getElementById(`${meal}Calories`).textContent = totalCalories.toFixed(2);
    document.getElementById(`${meal}Carbs`).textContent = totalCarbs.toFixed(2);
    document.getElementById(`${meal}Protein`).textContent = totalProtein.toFixed(2);
    document.getElementById(`${meal}Fats`).textContent = totalFats.toFixed(2);

    calculateTotal();
}

// Adjust macronutrients based on custom input and add to current values
function finalizeAdjustments(meal) {
    const currentCarbs = parseFloat(document.getElementById(`${meal}Carbs`).textContent) || 0;
    const currentProtein = parseFloat(document.getElementById(`${meal}Protein`).textContent) || 0;
    const currentFats = parseFloat(document.getElementById(`${meal}Fats`).textContent) || 0;

    const customCarbs = parseFloat(document.getElementById(`${meal}CustomCarbs`).value) || 0;
    const customProtein = parseFloat(document.getElementById(`${meal}CustomProtein`).value) || 0;
    const customFats = parseFloat(document.getElementById(`${meal}CustomFats`).value) || 0;

    const newCarbs = currentCarbs + customCarbs;
    const newProtein = currentProtein + customProtein;
    const newFats = currentFats + customFats;
    const totalCalories = (newCarbs * 4) + (newProtein * 4) + (newFats * 9);

    document.getElementById(`${meal}Carbs`).textContent = newCarbs.toFixed(2);
    document.getElementById(`${meal}Protein`).textContent = newProtein.toFixed(2);
    document.getElementById(`${meal}Fats`).textContent = newFats.toFixed(2);
    document.getElementById(`${meal}Calories`).textContent = totalCalories.toFixed(2);

    calculateTotal();
}

// Calculate total values for all meals
function calculateTotal() {
    const meals = ["meal1", "meal2", "meal3"];
    let totalCalories = 0, totalCarbs = 0, totalProtein = 0, totalFats = 0;

    meals.forEach(meal => {
        totalCalories += parseFloat(document.getElementById(`${meal}Calories`).textContent) || 0;
        totalCarbs += parseFloat(document.getElementById(`${meal}Carbs`).textContent) || 0;
        totalProtein += parseFloat(document.getElementById(`${meal}Protein`).textContent) || 0;
        totalFats += parseFloat(document.getElementById(`${meal}Fats`).textContent) || 0;
    });

    document.getElementById("totalCalories").textContent = totalCalories.toFixed(2);
    document.getElementById("totalCarbs").textContent = totalCarbs.toFixed(2);
    document.getElementById("totalProtein").textContent = totalProtein.toFixed(2);
    document.getElementById("totalFats").textContent = totalFats.toFixed(2);

    const calorieLimit = parseFloat(document.getElementById("calorieLimit").value) || 0;
    const calorieWarning = document.getElementById("calorieWarning");
    const calorieSuccess = document.getElementById("calorieSuccess");

    if (totalCalories > calorieLimit) {
        calorieWarning.style.display = "block";
        calorieSuccess.style.display = "none";
    } else if (totalCalories === calorieLimit) {
        calorieWarning.style.display = "none";
        calorieSuccess.style.display = "block";
    } else {
        calorieWarning.style.display = "none";
        calorieSuccess.style.display = "none";
    }
}
function calculateTotal() {
    const meals = ["meal1", "meal2", "meal3"];
    let totalCalories = 0, totalCarbs = 0, totalProtein = 0, totalFats = 0;

    meals.forEach(meal => {
        totalCalories += parseFloat(document.getElementById(`${meal}Calories`).textContent) || 0;
        totalCarbs += parseFloat(document.getElementById(`${meal}Carbs`).textContent) || 0;
        totalProtein += parseFloat(document.getElementById(`${meal}Protein`).textContent) || 0;
        totalFats += parseFloat(document.getElementById(`${meal}Fats`).textContent) || 0;
    });

    document.getElementById("totalCalories").textContent = totalCalories.toFixed(2);
    document.getElementById("totalCarbs").textContent = totalCarbs.toFixed(2);
    document.getElementById("totalProtein").textContent = totalProtein.toFixed(2);
    document.getElementById("totalFats").textContent = totalFats.toFixed(2);

    const calorieLimit = parseFloat(document.getElementById("calorieLimit").value) || 0;
    const calorieWarning = document.getElementById("calorieWarning");
    const calorieSuccess = document.getElementById("calorieSuccess");

    if (calorieLimit > 0) {
        if (totalCalories > calorieLimit) {
            calorieWarning.style.display = "block";
            calorieSuccess.style.display = "none";
        } else if (totalCalories === calorieLimit) {
            calorieWarning.style.display = "none";
            calorieSuccess.style.display = "block";
        } else {
            calorieWarning.style.display = "none";
            calorieSuccess.style.display = "none";
        }
    } else {
        calorieWarning.style.display = "none";
        calorieSuccess.style.display = "none";
    }
}