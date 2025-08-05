// Initialize all game data in window object to avoid redeclarations
window.gameState = {
    playerName: '',
    playerEmail: '',
    currentDifficulty: '',
    timeLeft: 60,
    timer: null,
    preTimer: null,
    preTimeLeft: 10,
    currentProduct: null,
    score: 0,
    selectedItems: new Set(),
    players: JSON.parse(localStorage.getItem('players')) || [],
    leaderboard: JSON.parse(localStorage.getItem('leaderboard')) || [],
    attempts: [],
    completedProducts: new Set(),
    TIME_LIMITS: {
        beginner: 30,
        intermediate: 45,
        expert: 60
    },
    PRE_TIMER: 10,
    itemsPool: {
        ingredients: [
            { name: "Milk", img: "https://img.icons8.com/color/96/000000/milk-bottle.png" },
            { name: "Sugar", img: "https://img.icons8.com/color/96/000000/sugar-cubes.png" },
            { name: "Flour", img: "https://img.icons8.com/color/96/000000/flour.png" },
            { name: "Eggs", img: "https://img.icons8.com/color/96/000000/eggs.png" },
            { name: "Butter", img: "https://img.icons8.com/color/96/000000/butter.png" },
            { name: "Yeast", img: "https://img.icons8.com/color/96/000000/yeast.png" },
            { name: "Salt", img: "https://img.icons8.com/color/96/000000/salt.png" },
            { name: "Water", img: "https://img.icons8.com/color/96/000000/water.png" },
            { name: "Chocolate", img: "https://img.icons8.com/color/96/000000/chocolate-bar.png" },
            { name: "Vanilla Extract", img: "https://img.icons8.com/color/96/000000/vanilla.png" }
        ],
        processes: [
            { name: "Mixing", img: "https://img.icons8.com/color/96/000000/mixer.png" },
            { name: "Kneading", img: "https://img.icons8.com/color/96/000000/dough.png" },
            { name: "Proofing", img: "https://img.icons8.com/color/96/000000/bread.png" },
            { name: "Baking", img: "https://img.icons8.com/color/96/000000/oven.png" },
            { name: "Cooling", img: "https://img.icons8.com/color/96/000000/fridge.png" },
            { name: "Packaging", img: "https://img.icons8.com/color/96/000000/box.png" },
            { name: "Fermentation", img: "https://img.icons8.com/color/96/000000/fermentation.png" },
            { name: "Pasteurization", img: "https://img.icons8.com/color/96/000000/thermometer.png" },
            { name: "Cutting", img: "https://img.icons8.com/color/96/000000/knife.png" },
            { name: "Aging", img: "https://img.icons8.com/color/96/000000/cheese.png" }
        ],
        equipment: [
            { name: "Mixer", img: "https://img.icons8.com/color/96/000000/stand-mixer.png" },
            { name: "Oven", img: "https://img.icons8.com/color/96/000000/oven.png" },
            { name: "Proofing Chamber", img: "https://img.icons8.com/color/96/000000/greenhouse.png" },
            { name: "Cooling Tunnel", img: "https://img.icons8.com/color/96/000000/fridge.png" },
            { name: "Packaging Machine", img: "https://img.icons8.com/color/96/000000/box.png" },
            { name: "Fermentation Tank", img: "https://img.icons8.com/color/96/000000/fermentation.png" },
            { name: "Pasteurizer", img: "https://img.icons8.com/color/96/000000/thermometer.png" },
            { name: "Cheese Vat", img: "https://img.icons8.com/color/96/000000/cheese.png" },
            { name: "Curd Knives", img: "https://img.icons8.com/color/96/000000/knife.png" },
            { name: "Aging Room", img: "https://img.icons8.com/color/96/000000/warehouse.png" }
        ]
    },
    instructions: {
        beginner: "Welcome to Build-A-Bite! In this level, you will see a list of ingredients, processes, and equipment needed to make a product. You have 10 seconds to review all items before the timer starts. Click on the correct items to build the product. Take your time and learn as you go!",
        intermediate: "In Advanced Level, you have less time and more challenge. Review the items in 10 seconds, then select the correct ones quickly!",
        expert: "Expert Level: You have the most time, but the challenge is highest. Use the 10-second preview to plan your moves and aim for a high score!"
    }
};

// Replace gameContent with window.gameContent
window.gameContent = {
    products: [
        { name: "Yogurt", image: "yogurt.png" },
        { name: "Cheese", image: "cheese.png" },
        { name: "Bread", image: "bread.png" },
        { name: "Jam", image: "jam.png" },
        { name: "Ice Cream", image: "ice-cream.png" },
        { name: "Chocolate", image: "chocolate.png" },
        { name: "Butter", image: "butter.png" },
        { name: "Sausage", image: "sausage.png" },
        { name: "Pickles", image: "pickles.png" },
        { name: "Pasta", image: "pasta.png" }
    ],
    beginner: {
    intermediate: {
        "Yogurt": {
            availableIngredients: ["Milk", "Bacterial Culture", "Sugar", "Salt", "Cream"],
            availableProcesses: ["Pasteurization", "Fermentation", "Cooling", "Packaging"],
            availableEquipment: ["Pasteurizer", "Fermentation Tank", "Packaging Machine"],
            correctOrder: ["Milk", "Pasteurizer", "Pasteurization", "Bacterial Culture", "Fermentation Tank", "Fermentation", "Cooling", "Packaging Machine", "Packaging"]
        },
        "Cheese": {
            availableIngredients: ["Milk", "Rennet", "Salt", "Bacterial Culture", "Calcium Chloride"],
            availableProcesses: ["Pasteurization", "Curdling", "Cutting", "Pressing", "Aging"],
            availableEquipment: ["Pasteurizer", "Cheese Vat", "Curd Knives", "Cheese Press"],
            correctOrder: ["Milk", "Pasteurizer", "Pasteurization", "Cheese Vat", "Curdling", "Curd Knives", "Cutting", "Cheese Press", "Pressing", "Aging"]
        },
        "Bread": {
            availableIngredients: ["Flour", "Yeast", "Water", "Salt", "Sugar"],
            availableProcesses: ["Mixing", "Kneading", "Proofing", "Baking", "Cooling"],
            availableEquipment: ["Mixer", "Oven", "Proofing Chamber"],
            correctOrder: ["Flour", "Mixer", "Mixing", "Yeast", "Water", "Kneading", "Proofing Chamber", "Proofing", "Oven", "Baking", "Cooling"]
        },
        "Jam": {
            availableIngredients: ["Fruits", "Sugar", "Pectin", "Citric Acid"],
            availableProcesses: ["Washing", "Cooking", "Cooling", "Packaging"],
            availableEquipment: ["Washing Unit", "Cooking Kettle", "Filling Machine"],
            correctOrder: ["Fruits", "Washing Unit", "Washing", "Sugar", "Pectin", "Cooking Kettle", "Cooking", "Cooling", "Filling Machine", "Packaging"]
        },
        "Ice Cream": {
            availableIngredients: ["Milk", "Cream", "Sugar", "Stabilizers"],
            availableProcesses: ["Mixing", "Pasteurization", "Freezing", "Packaging"],
            availableEquipment: ["Mixing Tank", "Pasteurizer", "Freezer", "Packaging Unit"],
            correctOrder: ["Milk", "Cream", "Mixing Tank", "Mixing", "Pasteurizer", "Pasteurization", "Freezer", "Freezing", "Packaging Unit", "Packaging"]
        },
        "Chocolate": {
            availableIngredients: ["Cocoa Beans", "Sugar", "Cocoa Butter", "Milk Powder"],
            availableProcesses: ["Roasting", "Grinding", "Mixing", "Conching"],
            availableEquipment: ["Roaster", "Grinder", "Mixer", "Conche"],
            correctOrder: ["Cocoa Beans", "Roaster", "Roasting", "Grinder", "Grinding", "Mixer", "Mixing", "Conche", "Conching"]
        },
        "Butter": {
            availableIngredients: ["Cream", "Salt", "Cultures"],
            availableProcesses: ["Pasteurization", "Churning", "Washing", "Kneading"],
            availableEquipment: ["Pasteurizer", "Churn", "Washing Unit", "Kneading Machine"],
            correctOrder: ["Cream", "Pasteurizer", "Pasteurization", "Churn", "Churning", "Washing Unit", "Washing", "Kneading Machine", "Kneading", "Salt"]
        },
        "Sausage": {
            availableIngredients: ["Meat", "Fat", "Salt", "Spices"],
            availableProcesses: ["Grinding", "Mixing", "Stuffing", "Cooking"],
            availableEquipment: ["Grinder", "Mixer", "Stuffer", "Cooker"],
            correctOrder: ["Meat", "Grinder", "Grinding", "Mixer", "Mixing", "Stuffer", "Stuffing", "Cooker", "Cooking"]
        },
        "Pickles": {
            availableIngredients: ["Cucumbers", "Salt", "Vinegar", "Spices"],
            availableProcesses: ["Washing", "Brining", "Fermenting", "Packing"],
            availableEquipment: ["Washing Unit", "Brine Tank", "Fermentation Vat", "Packing Unit"],
            correctOrder: ["Cucumbers", "Washing Unit", "Washing", "Brine Tank", "Brining", "Fermentation Vat", "Fermenting", "Packing Unit", "Packing"]
        },
        "Pasta": {
            availableIngredients: ["Flour", "Eggs", "Water", "Salt"],
            availableProcesses: ["Mixing", "Kneading", "Extruding", "Drying"],
            availableEquipment: ["Mixer", "Kneader", "Extruder", "Dryer"],
            correctOrder: ["Flour", "Eggs", "Mixer", "Mixing", "Kneader", "Kneading", "Extruder", "Extruding", "Dryer", "Drying"]
        }
    },
        "Yogurt": {
            availableIngredients: ["Milk", "Bacterial Culture", "Sugar", "Salt", "Cream", "Stabilizers", "Preservatives", "Food Coloring", "Flavoring", "Milk Powder", "Whey Protein", "Fruit Puree", "Natural Sweeteners", "Thickeners", "Enzymes"],
            correctOrder: ["Milk", "Bacterial Culture", "Sugar"]
        },
        "Cheese": {
            availableIngredients: ["Milk", "Rennet", "Salt", "Bacterial Culture", "Calcium Chloride", "Starter Culture", "Cream", "Whey Protein", "Enzymes", "Preservatives", "Flavoring", "Coloring", "Stabilizers", "Milk Powder", "Minerals"],
            correctOrder: ["Milk", "Rennet", "Salt"]
        },
        "Bread": {
            availableIngredients: ["Flour", "Yeast", "Water", "Salt", "Sugar", "Oil", "Milk Powder", "Butter", "Eggs", "Malt", "Gluten", "Preservatives", "Enzymes", "Emulsifiers", "Vitamins"],
            correctOrder: ["Flour", "Yeast", "Water", "Salt"]
        },
        "Jam": {
            availableIngredients: ["Fruits", "Sugar", "Pectin", "Citric Acid", "Water", "Natural Colors", "Preservatives", "Flavor Enhancers", "Spices", "Stabilizers", "Artificial Sweeteners", "Fruit Concentrate", "Thickeners", "Minerals", "Vitamins"],
            correctOrder: ["Fruits", "Sugar", "Pectin"]
        },
        "Ice Cream": {
            availableIngredients: ["Milk", "Cream", "Sugar", "Stabilizers", "Emulsifiers", "Flavoring", "Colors", "Fruits", "Nuts", "Chocolate", "Vanilla", "Preservatives", "Milk Solids", "Egg Yolks", "Sweeteners"],
            correctOrder: ["Cream", "Milk", "Sugar"]
        },
        "Chocolate": {
            availableIngredients: ["Cocoa Beans", "Sugar", "Cocoa Butter", "Milk Powder", "Lecithin", "Vanilla", "Nuts", "Dried Fruits", "Flavoring", "Emulsifiers", "Salt", "Preservatives", "Sweeteners", "Minerals", "Vitamins"],
            correctOrder: ["Cocoa Beans", "Roasting", "Grinding", "Sugar", "Conching"]
        },
        "Butter": {
            availableIngredients: ["Cream", "Salt", "Cultures", "Water", "Milk Solids", "Preservatives", "Vitamins", "Minerals", "Colors", "Flavoring", "Stabilizers", "Emulsifiers", "Antioxidants", "Proteins", "Enzymes"],
            correctOrder: ["Cream", "Pasteurization", "Churning", "Washing", "Salt"]
        },
        "Sausage": {
            availableIngredients: ["Meat", "Fat", "Salt", "Spices", "Preservatives", "Nitrites", "Proteins", "Starches", "Sugars", "Flavoring", "Colors", "Vitamins", "Minerals", "Antioxidants", "Water"],
            correctOrder: ["Meat", "Grinding", "Mixing", "Spices", "Stuffing"]
        },
        "Pickles": {
            availableIngredients: ["Cucumbers", "Salt", "Vinegar", "Water", "Spices", "Herbs", "Sugar", "Preservatives", "Flavoring", "Colors", "Calcium Chloride", "Garlic", "Dill", "Turmeric", "Bay Leaves"],
            correctOrder: ["Cucumbers", "Washing", "Salt", "Brining", "Fermenting"]
        },
        "Pasta": {
            availableIngredients: ["Flour", "Eggs", "Water", "Salt", "Oil", "Semolina", "Vitamins", "Minerals", "Colors", "Flavoring", "Preservatives", "Gluten", "Protein", "Emulsifiers", "Stabilizers"],
            correctOrder: ["Flour", "Eggs", "Mixing", "Kneading", "Rolling"]
        }
    },
    expert: {
        "Yogurt": {
            availableIngredients: ["Milk", "Bacterial Culture", "Sugar", "Salt", "Cream", "Stabilizers", "Preservatives", "Food Coloring", "Flavoring", "Milk Powder", "Whey Protein", "Fruit Puree", "Natural Sweeteners", "Thickeners", "Enzymes"],
            availableProcesses: ["Pasteurization", "Homogenization", "Fermentation", "Cooling", "Quality Testing", "Packaging", "Sterilization", "Temperature Control", "pH Adjustment", "CIP Cleaning"],
            availableEquipment: ["Pasteurizer", "Homogenizer", "Fermentation Tank", "Cooling System", "Testing Equipment", "Packaging Machine", "Storage Tank", "CIP System", "Heat Exchanger", "Control Panel"],
            correctOrder: ["Milk", "Pasteurizer", "Pasteurization", "Homogenizer", "Homogenization", "Bacterial Culture", "Fermentation Tank", "Fermentation"]
        },
        "Cheese": {
            availableIngredients: ["Milk", "Rennet", "Salt", "Bacterial Culture", "Calcium Chloride", "Starter Culture", "Cream", "Whey Protein", "Enzymes", "Preservatives", "Flavoring", "Coloring", "Stabilizers", "Milk Powder", "Minerals"],
            availableProcesses: ["Pasteurization", "Standardization", "Curdling", "Cutting", "Draining", "Molding", "Pressing", "Aging", "Quality Testing", "Packaging"],
            availableEquipment: ["Pasteurizer", "Cheese Vat", "Curd Knives", "Cheese Press", "Aging Room", "pH Meter", "Temperature Control", "Cooling System", "Packaging Machine", "Testing Equipment"],
            correctOrder: ["Milk", "Pasteurizer", "Pasteurization", "Cheese Vat", "Curdling", "Curd Knives", "Cutting", "Cheese Press", "Pressing", "Aging Room", "Aging"]
        },
        "Bread": {
            availableIngredients: ["Flour", "Yeast", "Water", "Salt", "Sugar", "Oil", "Milk Powder", "Butter", "Eggs", "Malt", "Gluten", "Preservatives", "Enzymes", "Emulsifiers", "Vitamins"],
            availableProcesses: ["Mixing", "Kneading", "Fermentation", "Proofing", "Baking", "Cooling", "Slicing", "Testing", "Packaging", "Quality Control"],
            availableEquipment: ["Industrial Mixer", "Kneading Machine", "Fermentation Chamber", "Proofing Chamber", "Industrial Oven", "Cooling System", "Slicer", "Packaging Unit", "Testing Equipment", "Control Panel"],
            correctOrder: ["Flour", "Industrial Mixer", "Mixing", "Yeast", "Water", "Kneading Machine", "Kneading", "Proofing Chamber", "Proofing", "Industrial Oven", "Baking"]
        },
        "Jam": {
            availableIngredients: ["Fruits", "Sugar", "Pectin", "Citric Acid", "Water", "Natural Colors", "Preservatives", "Flavor Enhancers", "Spices", "Stabilizers", "Artificial Sweeteners", "Fruit Concentrate", "Thickeners", "Minerals", "Vitamins"],
            availableProcesses: ["Washing", "Sorting", "Crushing", "Cooking", "Testing", "Filtering", "Sterilizing", "Cooling", "Packaging", "Quality Control"],
            availableEquipment: ["Washing Unit", "Sorting Machine", "Fruit Crusher", "Cooking Kettle", "Testing Equipment", "Filter Press", "Sterilizer", "Cooling System", "Filling Machine", "Control Panel"],
            correctOrder: ["Fruits", "Washing Unit", "Washing", "Fruit Crusher", "Crushing", "Cooking Kettle", "Cooking", "Testing Equipment", "Testing", "Filling Machine", "Packaging"]
        },
        "Ice Cream": {
            availableIngredients: ["Milk", "Cream", "Sugar", "Stabilizers", "Emulsifiers", "Flavoring", "Colors", "Fruits", "Nuts", "Chocolate", "Vanilla", "Preservatives", "Milk Solids", "Egg Yolks", "Sweeteners"],
            availableProcesses: ["Mixing", "Pasteurization", "Homogenization", "Aging", "Freezing", "Hardening", "Testing", "Rippling", "Packaging", "Quality Control"],
            availableEquipment: ["Mixing Tank", "Pasteurizer", "Homogenizer", "Aging Vat", "Freezer", "Hardening Tunnel", "Testing Equipment", "Ripple Pump", "Packaging Unit", "Control Panel"],
            correctOrder: ["Milk", "Cream", "Mixing Tank", "Mixing", "Pasteurizer", "Pasteurization", "Homogenizer", "Homogenization", "Freezer", "Freezing"]
        },
        "Chocolate": {
            availableIngredients: ["Cocoa Beans", "Sugar", "Cocoa Butter", "Milk Powder", "Lecithin", "Vanilla", "Nuts", "Dried Fruits", "Flavoring", "Emulsifiers", "Salt", "Preservatives", "Sweeteners", "Minerals", "Vitamins"],
            availableProcesses: ["Roasting", "Grinding", "Mixing", "Conching", "Tempering", "Molding", "Cooling", "Testing", "Packaging", "Quality Control"],
            availableEquipment: ["Roaster", "Grinder", "Mixer", "Conche", "Tempering Machine", "Molds", "Cooling Tunnel", "Testing Equipment", "Packaging Unit", "Control Panel"],
            correctOrder: ["Cocoa Beans", "Roaster", "Roasting", "Grinder", "Grinding", "Conche", "Conching", "Tempering Machine", "Tempering", "Molds", "Molding"]
        },
        "Butter": {
            availableIngredients: ["Cream", "Salt", "Cultures", "Water", "Milk Solids", "Preservatives", "Vitamins", "Minerals", "Colors", "Flavoring", "Stabilizers", "Emulsifiers", "Antioxidants", "Proteins", "Enzymes"],
            availableProcesses: ["Pasteurization", "Cream Ripening", "Churning", "Washing", "Kneading", "Testing", "Cooling", "Molding", "Packaging", "Quality Control"],
            availableEquipment: ["Pasteurizer", "Ripening Vat", "Churn", "Washing Unit", "Kneading Machine", "Testing Equipment", "Cooling System", "Molds", "Packaging Unit", "Control Panel"],
            correctOrder: ["Cream", "Pasteurizer", "Pasteurization", "Churn", "Churning", "Washing Unit", "Washing", "Kneading Machine", "Kneading"]
        },
        "Sausage": {
            availableIngredients: ["Meat", "Fat", "Salt", "Spices", "Preservatives", "Nitrites", "Proteins", "Starches", "Sugars", "Flavoring", "Colors", "Vitamins", "Minerals", "Antioxidants", "Water"],
            availableProcesses: ["Grinding", "Mixing", "Stuffing", "Linking", "Smoking", "Cooking", "Cooling", "Testing", "Packaging", "Quality Control"],
            availableEquipment: ["Grinder", "Mixer", "Stuffer", "Linker", "Smoker", "Cooker", "Cooling System", "Testing Equipment", "Packaging Unit", "Control Panel"],
            correctOrder: ["Meat", "Grinder", "Grinding", "Mixer", "Mixing", "Stuffer", "Stuffing", "Smoker", "Smoking", "Cooling System", "Cooling"]
        },
        "Pickles": {
            availableIngredients: ["Cucumbers", "Salt", "Vinegar", "Water", "Spices", "Herbs", "Sugar", "Preservatives", "Flavoring", "Colors", "Calcium Chloride", "Garlic", "Dill", "Turmeric", "Bay Leaves"],
            availableProcesses: ["Washing", "Sorting", "Brining", "Fermenting", "Testing", "Packing", "Sealing", "Pasteurizing", "Labeling", "Quality Control"],
            availableEquipment: ["Washing Unit", "Sorting Machine", "Brine Tank", "Fermentation Vat", "Testing Equipment", "Packing Unit", "Sealing Machine", "Pasteurizer", "Labeling Machine", "Control Panel"],
            correctOrder: ["Cucumbers", "Washing Unit", "Washing", "Brine Tank", "Brining", "Fermentation Vat", "Fermenting", "Packing Unit", "Packing"]
        },
        "Pasta": {
            availableIngredients: ["Flour", "Eggs", "Water", "Salt", "Oil", "Semolina", "Vitamins", "Minerals", "Colors", "Flavoring", "Preservatives", "Gluten", "Protein", "Emulsifiers", "Stabilizers"],
            availableProcesses: ["Mixing", "Kneading", "Extruding", "Shaping", "Drying", "Cooling", "Testing", "Cutting", "Packaging", "Quality Control"],
            availableEquipment: ["Mixer", "Kneader", "Extruder", "Shaper", "Dryer", "Cooling System", "Testing Equipment", "Cutter", "Packaging Unit", "Control Panel"],
            correctOrder: ["Flour", "Eggs", "Mixer", "Mixing", "Kneader", "Kneading", "Extruder", "Extruding", "Dryer", "Drying"]
        }
    }
};

// Utility to render game items as images
function renderGameItem(item) {
    return `<div class="game-item" tabindex="0" data-name="${item.name}">
        <img src="${item.img}" alt="${item.name}" />
        <span>${item.name}</span>
    </div>`;
}

// Show instructions based on difficulty
function showInstructions(difficulty) {
    const bot = document.getElementById('instructionBot');
    if (window.gameState.instructions[difficulty]) {
        bot.textContent = window.gameState.instructions[difficulty];
    }
}

// Pre-timer logic
function startPreTimer(callback) {
    window.gameState.preTimeLeft = window.gameState.PRE_TIMER;
    const timerBox = document.getElementById('timerBox');
    timerBox.style.display = 'block';
    timerBox.textContent = `Preview: ${window.gameState.preTimeLeft}s`;
    window.gameState.preTimer = setInterval(() => {
        window.gameState.preTimeLeft--;
        timerBox.textContent = `Preview: ${window.gameState.preTimeLeft}s`;
        if (window.gameState.preTimeLeft <= 0) {
            clearInterval(window.gameState.preTimer);
            timerBox.textContent = '';
            if (callback) callback();
        }
    }, 1000);
}

// Patch selectDifficulty to show instructions and start pre-timer
window.selectDifficulty = function(difficulty) {
    window.gameState.currentDifficulty = difficulty;
    showInstructions(difficulty);
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('gameContent').style.display = 'block';
    // Show product selection, then pre-timer before game starts
    startPreTimer(() => {
        // ...existing logic to start the game timer and show items...
    });
};

// Patch rendering of items to use images
function renderItemsGrid(category, items) {
    // Render all 10 items in a single column, add arrows for process/equipment
    const grid = document.createElement('div');
    grid.className = 'items-grid';
    items.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'game-item';
        itemDiv.setAttribute('data-category', category);
        itemDiv.setAttribute('tabindex', '0');
        if (typeof item === 'string') {
            itemDiv.textContent = item;
        } else {
            itemDiv.innerHTML = `<img src="${item.img}" alt="${item.name}" /><span>${item.name}</span>`;
        }
        // Add arrow for process/equipment except last item
        if ((category === 'processes' || category === 'equipment') && idx < items.length - 1) {
            const arrow = document.createElement('span');
            arrow.className = 'arrow';
            arrow.innerHTML = '&#8595;'; // Down arrow
            itemDiv.appendChild(arrow);
        }
        grid.appendChild(itemDiv);
    });
    return grid.outerHTML;
}

// Function to handle difficulty selection
function selectDifficulty(level) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (!nameInput || !emailInput) {
        console.error('Input elements not found');
        return;
    }

    // Get player info
    gameState.playerName = nameInput.value;
    gameState.playerEmail = emailInput.value;

    // Validate inputs
    if (!gameState.playerName || !gameState.playerEmail) {
        alert('Please enter both your name and email to start the game.');
        return;
    }

    // Set difficulty and start game
    gameState.currentDifficulty = level;
    startGame();

    updateBotMessage(`Ready to rock! Let's make some amazing products! 🚀`);
}

// Function to start the game
function startGame() {
    const inputSection = document.getElementById('inputSection');
    const gameContent = document.getElementById('gameContent');
    const instructionBot = document.getElementById('instructionBot');

    if (!inputSection || !gameContent || !instructionBot) {
        console.error('Required elements not found');
        return;
    }

    // Hide input section and show game content
    inputSection.style.display = 'none';
    gameContent.style.display = 'block';

    // Update bot message based on difficulty
    const botMessage = `Get ready ${gameState.playerName}! You've selected ${gameState.currentDifficulty} level. Choose a product to begin!`;
    instructionBot.textContent = botMessage;

    // Display product selection
    displayProducts();
}

// Function to shuffle arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to check if product is completed
function isProductCompleted(productName) {
    return gameState.completedProducts.has(productName);
}

// Function to display available products
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    // Shuffle only available products
    const availableProducts = gameContent.products.filter(p => !isProductCompleted(p.name));
    const shuffledProducts = shuffleArray([...availableProducts]);
    if (shuffledProducts.length === 0) {
        productGrid.innerHTML = '<p style="font-size:1.2em;color:#e74c3c;">All products completed! Restart to play again.</p>';
        return;
    }
    shuffledProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${getProductEmoji(product.name)}</div>
            <h3>${product.name}</h3>
        `;
        card.onclick = () => {
            selectProduct(product.name);
            updateBotMessage(`You selected <b>${product.name}</b>! Now pick the correct steps to make it.`);
        };
        card.onmouseenter = () => updateBotMessage(`Click to make <b>${product.name}</b>!`);
        card.onmouseleave = () => updateBotMessage('Select a product to begin.');
        productGrid.appendChild(card);
    });
    updateBotMessage('Select a product to begin.');
}

function updateBotMessage(msg) {
    const bot = document.getElementById('instructionBot');
    if (bot) bot.innerHTML = msg;
}

// Helper function to get emoji for products
function getProductEmoji(productName) {
    const emojis = {
        "Yogurt": "🥛",
        "Cheese": "🧀",
        "Bread": "🍞",
        "Jam": "🍯",
        "Ice Cream": "🍦",
        "Chocolate": "🍫",
        "Butter": "🧈",
        "Sausage": "🌭",
        "Pickles": "🥒",
        "Pasta": "🍝"
    };
    return emojis[productName] || "🍴";
}

// Modify selectProduct function to prevent reselection
function selectProduct(productName) {
    if (isProductCompleted(productName)) {
        alert('You have already completed this product!');
        return;
    }
    gameState.currentProduct = productName;
    gameState.selectedItems.clear();
    document.getElementById('productSelection').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'grid';

    // Show the items for preview (but do not start timer yet)
    previewGameItems();


    // Adjust item size for expert/intermediate mode
    document.body.classList.remove('expert-mode', 'intermediate-mode');
    if (gameState.currentDifficulty === 'expert') {
        document.body.classList.add('expert-mode');
    } else if (gameState.currentDifficulty === 'intermediate') {
        document.body.classList.add('intermediate-mode');
    }

    // Show pre-timer while items are visible
    let preTime = 10;
    if (gameState.currentDifficulty === 'intermediate' || gameState.currentDifficulty === 'expert') {
        preTime = 20;
    }
    showPreTimer(preTime, () => {
        // Flash 'Game Starts!' message
        flashGameStart(() => {
            setupGame();
            // Always clear any previous timer before starting a new one
            if (gameState.timer) {
                clearInterval(gameState.timer);
                gameState.timer = null;
            }
            startFreshTimer();
        });
    });
// Always start a fresh timer after pre-timer ends
// Always start a fresh timer after pre-timer ends
function startFreshTimer() {
    // Defensive: clear any previous timer
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
    gameState.timeLeft = gameState.TIME_LIMITS[gameState.currentDifficulty];
    var timerBox = document.getElementById('timerBox');
    var timeCount = document.getElementById('timeCount');
    if (timerBox) {
        timerBox.style.display = 'block';
        timerBox.textContent = `Time Left: ${gameState.timeLeft}s`;
    }
    if (timeCount) timeCount.textContent = gameState.timeLeft;
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        if (timerBox) timerBox.textContent = `Time Left: ${gameState.timeLeft}s`;
        if (timeCount) timeCount.textContent = gameState.timeLeft;
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            gameState.timer = null;
            endGame(false);
        }
    }, 1000);
}
    // Update instruction bot
    var botElem = document.getElementById('instructionBot');
    if (botElem) {
        botElem.textContent = `Select the correct items needed for ${productName} production in the right order!`;
    }
}

function showPreTimer(seconds, callback) {
    const timerBox = document.getElementById('timerBox');
    timerBox.style.display = 'block';
    timerBox.textContent = `Preview: ${seconds}s`;
    let timeLeft = seconds;
    const interval = setInterval(() => {
        timeLeft--;
        timerBox.textContent = `Preview: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerBox.textContent = '';
            if (callback) callback();
        }
    }, 1000);
}

// Show the items for preview (ingredients/process/equipment) but do not start timer or allow selection
function previewGameItems() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
        <div class="game-status">
            <h2 id="productTitle">${gameState.currentProduct} Production</h2>
            <div id="selectionStatus"></div>
        </div>
        <div class="categories-container"></div>
    `;

    const productData = gameContent[gameState.currentDifficulty][gameState.currentProduct];
    const categoriesContainer = gameBoard.querySelector('.categories-container');
    if (!categoriesContainer) return;
    // Set width to 90% and center
    categoriesContainer.style.width = '90%';
    categoriesContainer.style.margin = '0 auto';
    categoriesContainer.innerHTML = '';

    if (gameState.currentDifficulty === 'beginner') {
        createCategorySectionPreview('Ingredients', [...productData.availableIngredients], categoriesContainer);
    } else if (gameState.currentDifficulty === 'intermediate' || gameState.currentDifficulty === 'expert') {
        // Show as 3 rows: Ingredients (top), Processes (middle), Equipment (bottom), each max 10
        createCategorySectionPreview('Ingredients', [...productData.availableIngredients].slice(0, 10), categoriesContainer);
        createCategorySectionPreview('Processes', [...(productData.availableProcesses || [])].slice(0, 10), categoriesContainer);
        createCategorySectionPreview('Equipment', [...(productData.availableEquipment || [])].slice(0, 10), categoriesContainer);
        // Style: stack vertically
        categoriesContainer.style.display = 'flex';
        categoriesContainer.style.flexDirection = 'column';
        categoriesContainer.style.gap = '18px';
    }
    // Show preview status
    const statusElement = document.getElementById('selectionStatus');
    if (statusElement) statusElement.textContent = `Preview: Review all items before the game starts!`;
}

// Helper to create category section for preview (no selection)
function createCategorySectionPreview(category, items, container) {
    if (!container) return;
    const section = document.createElement('div');
    section.className = `category-section ${category.toLowerCase()}`;
    section.style.marginBottom = '0';
    section.innerHTML = `
        <h3 style="margin-bottom:8px;">${category}</h3>
        <div class="items-grid"></div>
    `;
    const itemsGrid = section.querySelector('.items-grid');
    if (!itemsGrid) return;
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'game-item';
        itemElement.textContent = item;
        itemsGrid.appendChild(itemElement);
    });
    // For preview, show as grid with up to 5 columns
    itemsGrid.style.display = 'grid';
    itemsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
    itemsGrid.style.gap = '10px';
    container.appendChild(section);
}

// Flash a 'Game Starts!' message for 1 second, then call callback
function flashGameStart(callback) {
    const gameBoard = document.getElementById('gameBoard');
    const flashDiv = document.createElement('div');
    flashDiv.className = 'flash-message';
    flashDiv.textContent = 'Game Starts!';
    flashDiv.style.position = 'absolute';
    flashDiv.style.top = '50%';
    flashDiv.style.left = '50%';
    flashDiv.style.transform = 'translate(-50%, -50%)';
    flashDiv.style.background = 'rgba(255,255,0,0.95)';
    flashDiv.style.color = '#222';
    flashDiv.style.fontSize = '2.5em';
    flashDiv.style.fontWeight = 'bold';
    flashDiv.style.padding = '32px 64px';
    flashDiv.style.borderRadius = '24px';
    flashDiv.style.zIndex = '9999';
    flashDiv.style.boxShadow = '0 0 32px #ff0';
    gameBoard.appendChild(flashDiv);
    setTimeout(() => {
        flashDiv.remove();
        if (callback) callback();
    }, 1000);
}

// Modify startTimer function to maintain timer across products in beginner mode
function startTimer() {
    // Only reset timeLeft if it's not already running in beginner mode
    if (!gameState.timer || gameState.currentDifficulty !== 'beginner') {
        gameState.timeLeft = gameState.TIME_LIMITS[gameState.currentDifficulty];
    }
    
    const timerBox = document.getElementById('timerBox');
    const timeCount = document.getElementById('timeCount');
    if (timerBox) {
        timerBox.style.display = 'block';
        timerBox.textContent = `Time Left: ${gameState.timeLeft}s`;
    }
    if (timeCount) timeCount.textContent = gameState.timeLeft;

    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        if (timerBox) timerBox.textContent = `Time Left: ${gameState.timeLeft}s`;
        if (timeCount) timeCount.textContent = gameState.timeLeft;
        if (gameState.timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Function to calculate score based on time
function calculateScore(timeLeft, difficulty) {
    let baseScore = 1000;
    let timeMultiplier;
    const maxTime = gameState.TIME_LIMITS[difficulty];
    
    switch(difficulty) {
        case 'beginner':
            timeMultiplier = timeLeft >= (maxTime * 0.7) ? 1.5 : timeLeft >= (maxTime * 0.4) ? 1.2 : 1;
            break;
        case 'intermediate':
            timeMultiplier = timeLeft >= (maxTime * 0.7) ? 2 : timeLeft >= (maxTime * 0.4) ? 1.5 : 1.2;
            break;
        case 'expert':
            timeMultiplier = timeLeft >= (maxTime * 0.7) ? 3 : timeLeft >= (maxTime * 0.4) ? 2 : 1.5;
            break;
    }
    
    return Math.round(baseScore * timeMultiplier);
}

// Function to setup game based on difficulty
function setupGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
        <div class="game-status">
            <h2 id="productTitle">${gameState.currentProduct} Production</h2>
            <div id="selectionStatus"></div>
        </div>
        <div id="flowBarContainer"></div>
        <div class="categories-container"></div>
    `;

    const productData = gameContent[gameState.currentDifficulty][gameState.currentProduct];
    const categoriesContainer = gameBoard.querySelector('.categories-container');
    if (!categoriesContainer) {
        console.error('Categories container not found');
        return;
    }
    categoriesContainer.innerHTML = '';

    if (gameState.currentDifficulty === 'beginner') {
        createCategorySection('Ingredients', shuffleArray([...productData.availableIngredients]), categoriesContainer);
    } else if (gameState.currentDifficulty === 'intermediate' || gameState.currentDifficulty === 'expert') {
        // Show as 3 rows: Ingredients (top), Processes (middle), Equipment (bottom), each max 10
        createCategorySection('Ingredients', shuffleArray([...productData.availableIngredients]).slice(0, 10), categoriesContainer);
        createCategorySection('Processes', shuffleArray([...(productData.availableProcesses || [])]).slice(0, 10), categoriesContainer);
        createCategorySection('Equipment', shuffleArray([...(productData.availableEquipment || [])]).slice(0, 10), categoriesContainer);
        // Style: stack vertically
        categoriesContainer.style.display = 'flex';
        categoriesContainer.style.flexDirection = 'column';
        categoriesContainer.style.gap = '18px';
    }
    // Do NOT start timer here; timer is started after setupGame in selectProduct
    updateSelectionStatus();
    updateFlowBar();
}

// Function to create category sections
function createCategorySection(category, items, container) {
    if (!container) {
        console.error('Container is undefined');
        return;
    }

    const section = document.createElement('div');
    section.className = `category-section ${category.toLowerCase()}`;
    section.style.marginBottom = '0';
    section.innerHTML = `
        <h3 style="margin-bottom:8px;">${category}</h3>
        <div class="items-grid"></div>
    `;

    const itemsGrid = section.querySelector('.items-grid');
    if (!itemsGrid) {
        console.error('Items grid not found');
        return;
    }
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'game-item';
        itemElement.textContent = item;
        itemElement.onclick = () => selectItem(item, itemElement);
        itemsGrid.appendChild(itemElement);
    });
    // For play, show as grid with up to 5 columns
    itemsGrid.style.display = 'grid';
    itemsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
    itemsGrid.style.gap = '10px';
    container.appendChild(section);
}

// Add missing updateSelectionStatus function
function updateSelectionStatus() {
    const productData = gameContent[gameState.currentDifficulty][gameState.currentProduct];
    const correctOrder = productData.correctOrder;
    const selectedArray = Array.from(gameState.selectedItems);
    
    const statusElement = document.getElementById('selectionStatus');
    statusElement.textContent = `Production Line: ${selectedArray.length}/${correctOrder.length} steps selected`;
}

// Function to select an item
function selectItem(item, element) {
    if (gameState.selectedItems.has(item)) {
        gameState.selectedItems.delete(item);
        element.classList.remove('selected');
    } else {
        gameState.selectedItems.add(item);
        element.classList.add('selected');
    }
    updateFlowBar();
    checkProgress();
}

// Show a flow bar of selected items in order (as a flowchart)
function updateFlowBar() {
    const flowBar = document.getElementById('flowBarContainer');
    if (!flowBar) return;
    const selectedArray = Array.from(gameState.selectedItems);
    if (selectedArray.length === 0) {
        flowBar.innerHTML = '';
        return;
    }
    // For beginner: show only the selected products (ingredients)
    if (gameState.currentDifficulty === 'beginner') {
        flowBar.innerHTML = `<div class="flow-bar">${selectedArray.map((item, idx) =>
            `<span class="flow-item">${item}</span>${idx < selectedArray.length-1 ? '<span class="flow-arrow">→</span>' : ''}`
        ).join('')}</div>`;
    } else {
        // For intermediate/expert: show all selected items as a flowchart
        flowBar.innerHTML = `<div class="flow-bar">${selectedArray.map((item, idx) =>
            `<span class="flow-item">${item}</span>${idx < selectedArray.length-1 ? '<span class="flow-arrow">→</span>' : ''}`
        ).join('')}</div>`;
    }
}

// Function to check progress
function checkProgress() {
    const productData = gameContent[gameState.currentDifficulty][gameState.currentProduct];
    const correctOrder = productData.correctOrder;
    const selectedArray = Array.from(gameState.selectedItems);
    
    let correctCount = 0;
    
    if (gameState.currentDifficulty === 'expert') {
        // Expert level - check order
        for (let i = 0; i < selectedArray.length; i++) {
            if (correctOrder[i] === selectedArray[i]) {
                correctCount++;
            } else {
                break;
            }
        }
    } else {
        // Beginner and Intermediate - only check items, not order
        selectedArray.forEach(item => {
            if (correctOrder.includes(item)) {
                correctCount++;
            }
        });
    }

    // Update status
    const statusElement = document.getElementById('selectionStatus');
    statusElement.textContent = `Steps completed: ${correctCount}/${correctOrder.length}`;

    // Check if all required items are selected
    if (gameState.currentDifficulty === 'expert') {
        if (correctCount === correctOrder.length) {
            endGame(true);
        }
    } else {
        if (correctCount === correctOrder.length && selectedArray.length === correctOrder.length) {
            endGame(true);
        }
    }
}

// Function to handle the timer
function startTimer() {
    // Only reset timeLeft if it's not already running in beginner mode
    if (!gameState.timer || gameState.currentDifficulty !== 'beginner') {
        gameState.timeLeft = gameState.TIME_LIMITS[gameState.currentDifficulty];
    }
    
    document.getElementById('timerBox').style.display = 'block';
    document.getElementById('timeCount').textContent = gameState.timeLeft;
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timeCount').textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Function to save player data
function savePlayerData(name, email, finalScore) {
    const playerData = {
        name,
        email,
        score: finalScore,
        date: new Date().toISOString(),
        difficulty: gameState.currentDifficulty
    };
    
    gameState.players.push(playerData);
    updateLeaderboard(playerData);
    
    localStorage.setItem('players', JSON.stringify(gameState.players));
    localStorage.setItem('leaderboard', JSON.stringify(gameState.leaderboard));
}

// Modify updateLeaderboard function - remove the top 5 limit
function updateLeaderboard(playerData) {
    gameState.leaderboard.push(playerData);
    gameState.leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(gameState.leaderboard));
}

// Modify downloadPlayerData function to include leaderboard download
function downloadPlayerData() {
    // Player scores data
    const scoreData = gameState.players.map(p => 
        `${p.name},${p.email},${p.score},${p.difficulty},${p.date}`
    ).join('\n');
    
    // Detailed attempts data
    const attemptsData = gameState.attempts.map(a => 
        `${a.playerName},${a.playerEmail},${a.difficulty},${a.product},${a.timeSpent},${a.success},${a.score},${a.date}`
    ).join('\n');
    
    // Add leaderboard data
    const leaderboardData = gameState.leaderboard.map(p => 
        `${p.name},${p.email},${p.score},${p.difficulty},${p.date}`
    ).join('\n');
    
    const scoreBlob = new Blob([`Name,Email,Score,Difficulty,Date\n${scoreData}`], 
        { type: 'text/csv' });
    const attemptsBlob = new Blob([`Name,Email,Difficulty,Product,TimeSpent,Success,Score,Date\n${attemptsData}`], 
        { type: 'text/csv' });
    const leaderboardBlob = new Blob([`Name,Email,Score,Difficulty,Date\n${leaderboardData}`], 
        { type: 'text/csv' });
    
    // Download all files
    downloadFile(scoreBlob, 'player_scores.csv');
    downloadFile(attemptsBlob, 'player_attempts.csv');
    downloadFile(leaderboardBlob, 'leaderboard.csv');
}

// Helper function for file download
function downloadFile(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

// Function to save attempt data
function saveAttempt(success) {
    const attemptData = {
        playerName: gameState.playerName,
        playerEmail: gameState.playerEmail,
        difficulty: gameState.currentDifficulty,
        product: gameState.currentProduct,
        timeSpent: gameState.TIME_LIMITS[gameState.currentDifficulty] - gameState.timeLeft,
        itemsSelected: Array.from(gameState.selectedItems),
        success: success,
        score: success ? calculateScore(gameState.timeLeft, gameState.currentDifficulty) : 0,
        date: new Date().toISOString()
    };
    
    if (!gameState.attempts) {
        gameState.attempts = [];
    }
    
    gameState.attempts.push(attemptData);
    localStorage.setItem('attempts', JSON.stringify(gameState.attempts));
}

// Function to end the game
function endGame(completed) {
    clearInterval(gameState.timer);
    
    saveAttempt(completed);
    
    if (completed) {
        const finalScore = calculateScore(gameState.TIME_LIMITS[gameState.currentDifficulty] - gameState.timeLeft, gameState.currentDifficulty);
        gameState.score += finalScore;
        savePlayerData(gameState.playerName, gameState.playerEmail, gameState.score);
        
        gameState.completedProducts.add(gameState.currentProduct);
        
        const remainingProducts = gameContent.products.filter(p => p.name !== gameState.currentProduct);
        if (remainingProducts.length > 0) {
            showGameStatus(finalScore);
        } else {
            showFinalResults();
        }
    } else {
        showTimeout();
    }
    
    document.getElementById('timerBox').style.display = 'none';

    updateBotMessage(completed ? 
        `Fantastic job! You're a food production master! 🎉` : 
        `Time's up! But don't worry, practice makes perfect! 💪`);
}

// Update timeout page to show leaderboard
function showTimeout() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
        <div class="timeout-message">
            <h2>Time's Up!</h2>
            <p>Current Score: ${gameState.score}</p>
            <div class="leaderboard">
                <h3>Leaderboard</h3>
                ${generateLeaderboardHTML()}
            </div>
            <button onclick="restartGame()" class="restart-btn">Try Again</button>
        </div>
    `;
}

// Function to show game status
function showGameStatus(finalScore) {
    const message = `Great job! Moving to next product in 3 seconds...`;
    document.getElementById('instructionBot').textContent = message;
    
    setTimeout(() => {
        document.getElementById('productSelection').style.display = 'block';
        document.getElementById('gameBoard').style.display = 'none';
    }, 3000);
}

// Function to show final results
function showFinalResults() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
        <div class="final-results">
            <h2>Game Complete!</h2>
            <div class="score-section">
                <h3>Your Final Score: ${gameState.score}</h3>
                <p class="time-bonus">Time Bonus: ${calculateTimeBonus()}</p>
                <p class="total-score">Total Score: ${gameState.score + calculateTimeBonus()}</p>
            </div>
            <div class="leaderboard">
                <h3>Leaderboard</h3>
                ${generateLeaderboardHTML()}
            </div>
            <button onclick="restartGame()" class="restart-btn">Play Again</button>
            ${playerIsAdmin() ? '<button onclick="downloadPlayerData()" class="download-btn">Download All Data</button>' : ''}
        </div>
    `;
}

// Add function to calculate time bonus
function calculateTimeBonus() {
    return Math.round(gameState.timeLeft * 10); // 10 points per second remaining
}

// Modify generateLeaderboardHTML to show only top 5
function generateLeaderboardHTML() {
    if (!gameState.leaderboard || gameState.leaderboard.length === 0) {
        return '<p>No scores yet!</p>';
    }

    const top5 = [...gameState.leaderboard]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    return `
        <div class="leaderboard-table">
            <div class="leaderboard-header">
                <span>Rank</span>
                <span>Name</span>
                <span>Score</span>
                <span>Difficulty</span>
            </div>
            ${top5.map((player, index) => `
                <div class="leaderboard-entry">
                    <span>${index + 1}</span>
                    <span>${player.name}</span>
                    <span>${player.score}</span>
                    <span>${player.difficulty}</span>
                </div>
            `).join('')}
        </div>
        <button onclick="downloadLeaderboard()" class="download-btn">Download Full Leaderboard</button>
    `;
}

// Add new function to download just the leaderboard
function downloadLeaderboard() {
    const leaderboardData = gameState.leaderboard.map(p => 
        `${p.name},${p.email},${p.score},${p.difficulty},${p.date}`
    ).join('\n');
    
    const leaderboardBlob = new Blob([`Name,Email,Score,Difficulty,Date\n${leaderboardData}`], 
        { type: 'text/csv' });
    
    downloadFile(leaderboardBlob, 'leaderboard.csv');
}

// Function to check if player is admin (customize as needed)
function playerIsAdmin() {
    const adminEmails = ['skadakash@gmail.com']; // Add admin emails
    return adminEmails.includes(gameState.playerEmail);
}

// Function to restart game
function restartGame() {
    // Reset game state
    gameState = {
        playerName: '',
        playerEmail: '',
        currentDifficulty: '',
        timeLeft: 60,
        timer: null,
        currentProduct: null,
        score: 0,
        selectedItems: new Set(),
        players: gameState.players, // Preserve players data
        leaderboard: gameState.leaderboard, // Preserve leaderboard data
        attempts: gameState.attempts, // Preserve attempts data
        TIME_LIMITS: gameState.TIME_LIMITS, // Preserve time limits
        completedProducts: new Set()
    };

    // Reset UI
    const elements = {
        inputSection: document.getElementById('inputSection'),
        gameContent: document.getElementById('gameContent'),
        gameBoard: document.getElementById('gameBoard'),
        productSelection: document.getElementById('productSelection'),
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        timerBox: document.getElementById('timerBox'),
        instructionBot: document.getElementById('instructionBot')
    };

    // Check if all elements exist
    if (Object.values(elements).some(el => !el)) {
        console.error('Some UI elements not found');
        return;
    }

    // Reset display states
    elements.inputSection.style.display = 'block';
    elements.gameContent.style.display = 'none';
    elements.gameBoard.style.display = 'none';
    elements.productSelection.style.display = 'block';
    elements.timerBox.style.display = 'none';
    
    // Clear inputs
    elements.name.value = '';
    elements.email.value = '';
    
    // Reset instruction
    elements.instructionBot.textContent = 'Welcome to Build-A-Bite!';
    
    // Clear any existing timers
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
}

// Show instruction box for selected difficulty
window.showInstructionBox = function(difficulty) {
    const inputSection = document.getElementById('inputSection');
    const instructionSection = document.getElementById('instructionSection');
    const instructionBox = document.getElementById('instructionBox');
    const nextBtn = document.getElementById('instructionNextBtn');
    window.gameState.currentDifficulty = difficulty;
    inputSection.style.display = 'none';
    instructionSection.style.display = 'block';
    // Clear and set instruction content
    instructionBox.innerHTML = getInstructionHTML(difficulty);
    nextBtn.onclick = function() {
        instructionSection.style.display = 'none';
        // Show product selection and game content
        const gameContent = document.getElementById('gameContent');
        const productSelection = document.getElementById('productSelection');
        const gameBoard = document.getElementById('gameBoard');
        if (gameContent) gameContent.style.display = 'block';
        if (productSelection) productSelection.style.display = 'block';
        if (gameBoard) gameBoard.style.display = 'none';
        // Display products immediately
        if (typeof displayProducts === 'function') displayProducts();
        updateBotMessage('Select a product to begin.');
    };
};

// Generate clear, highlighted instructions for each level
function getInstructionHTML(difficulty) {
    if (difficulty === 'beginner') {
        return `<h2>How to Play: Basic Level</h2>
        <ul>
            <li><b>Goal:</b> Build a food product by selecting the correct <b>ingredients</b>, <b>processes</b>, and <b>equipment</b> in the right order.</li>
            <li><b>Step 1:</b> You will see a list of all possible items for the product. <b>Carefully review</b> them during a <b>10-second preview</b> before the timer starts.</li>
            <li><b>Step 2:</b> After the preview, the timer will start. <b>Click</b> on the correct items in the correct order to build the product. You can select and deselect items as needed.</li>
            <li><b>Hints:</b> Helpful hints may appear to guide you if you get stuck.</li>
            <li><b>Scoring:</b> You earn points for each correct step and bonus points for finishing quickly. Accuracy and speed both matter!</li>
            <li><b>Progress:</b> Your progress is shown at the top. Complete all steps to finish the product and move to the next one.</li>
            <li><b>Leaderboard:</b> Try to get the highest score and see your name on the leaderboard!</li>
        </ul>
        <p style="margin-top:18px;"><b>Tip:</b> Take your time to learn the process. This level is designed for beginners and is the best place to start!</p>`;
    } else if (difficulty === 'intermediate') {
        return `<h2>How to Play: Advanced Level</h2>
        <ul>
            <li><b>Goal:</b> Build the product by selecting the correct items in the right order, but with less time and no hints.</li>
            <li><b>Preview:</b> You have <b>10 seconds</b> to review all items before the round starts.</li>
            <li><b>Challenge:</b> The timer is shorter and you must be quick and accurate. No hints are provided.</li>
            <li><b>Scoring:</b> Points are awarded for correct selections and speed. Mistakes reduce your score.</li>
            <li><b>Progress:</b> Complete all steps to finish the product and move to the next one. Try to beat your previous score!</li>
        </ul>
        <p style="margin-top:18px;"><b>Tip:</b> Focus and plan your moves during the preview. This level is for players who want a real challenge!</p>`;
    } else if (difficulty === 'expert') {
        return `<h2>How to Play: Expert Level</h2>
        <ul>
            <li><b>Goal:</b> Build the product perfectly by selecting all correct items in the exact order, as fast as possible.</li>
            <li><b>Preview:</b> You have <b>10 seconds</b> to analyze all items. Use this time to memorize the correct sequence.</li>
            <li><b>Challenge:</b> The timer is the shortest, there are more items, and <b>no hints</b> are given. Every mistake costs you time and points.</li>
            <li><b>Scoring:</b> Only perfect accuracy and the fastest time will get you to the top of the leaderboard.</li>
            <li><b>Progress:</b> Complete all steps in order to finish the product. Only the best can master this level!</li>
        </ul>
        <p style="margin-top:18px;"><b>Tip:</b> Plan your selections during the preview. This level is for experts who want to test their memory and speed!</p>`;
    }
    return '';
}