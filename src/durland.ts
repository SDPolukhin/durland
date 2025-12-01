abstract class Modifier {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return intermediate;
    }
    
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return intermediate;
    }
    
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return intermediate;
    }
}

abstract class Durlander extends Modifier {
    health: number;
    money: number;
    psyche: number;
    history: Step[];
    
    constructor() {
        super();
        this.health = 10;
        this.money = 10;
        this.psyche = 10;
        this.history = [];
    }
}

abstract class Location extends Modifier {
    numSlesandras: number;
    numSisandras: number;
    numChuchundras: number;
    
    constructor(slesandras: number, sisandras: number, chuchundras: number) {
        super();
        this.numSlesandras = slesandras;
        this.numSisandras = sisandras;
        this.numChuchundras = chuchundras;
    }
}

// Конкретные классы действий
type Action = Zumbalstvo | Gulbonstvo | Shlyamsanie | Idle;

class Zumbalstvo extends Modifier {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -1;
    }
    
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return 2 * location.numSlesandras;
    }
    
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -1;
    }
}

class Gulbonstvo extends Modifier {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -1;
    }
    
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -1;
    }
    
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return 2 * location.numSisandras;
    }
}

class Shlyamsanie extends Modifier {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return 2 * location.numChuchundras;
    }
    
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -1;
    }
    
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -1;
    }
}

class Idle extends Modifier {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -0.5;
    }
    
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -0.5;
    }
    
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return -0.5;
    }
}

class Mojor extends Durlander {
    private counter = 0;
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Zumbalstvo) {
            if (this.counter >= 0) {
                if (this.counter == 2) {
                    this.counter = 0;
                    return 0;
                }
                let chance = Math.random() < 0.33;
                if (chance) {
                    this.counter -= 2;
                    return 0;
                }
                this.counter++;
            }
        }
        return intermediate;
    }
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Gulbonstvo) {
            return intermediate * 1.23;
        }
        return intermediate;
    }
}

class Nischebrod extends Durlander {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Gulbonstvo) {
            return intermediate * 1.76;
        }
        return intermediate;
    }
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Gulbonstvo) {
            return intermediate * 0.13;
        }
        return intermediate;
    }
}

class Soyeviy extends Durlander {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Zumbalstvo) {
            return intermediate - 0.12 * location.numChuchundras;
        }
        return intermediate;
    }
}

class Prosvetlenniy extends Durlander {
    private bonusPsyche(): number {
        const lastSteps = this.history.slice(-3);
        return 0.31 * lastSteps.reduce((sum, step) => {
            return sum + step.location.numSisandras;
        }, 0)

    }
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Shlyamsanie) {
            return intermediate + this.bonusPsyche()
        }
        return intermediate;
    }
}

class Drocent extends Durlander {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Gulbonstvo) {
            return intermediate * 0.5;
        }
        return intermediate;
    }
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Gulbonstvo) {
            return intermediate * 0.5;
        }
        return intermediate;
    }
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Gulbonstvo) {
            return intermediate * 0.5;
        }
        return intermediate;
    }
}

class Zheleznouhiy extends Durlander {
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Zumbalstvo) {
            return 0;
        }
        return intermediate;
    }
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Zumbalstvo) {
            return intermediate * successfulRollsMultiplier(location.numSlesandras, 0.33);
        }
        return intermediate;
    }
}

//Местности. Поскольку локации напрямую не влияют на поведение
//местностей, в модели они не учитываются

class Balesburg extends Location {
    constructor() { super(3, 1, 1); }
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return intermediate - 0.1 * successfulRollsMultiplier(this.numSlesandras, 0.85);
    }
}

class Dolbesburg extends Location {
    constructor() { super(3, 1, 1); }
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Zumbalstvo) {
            return intermediate * 1.2;
        }
        return intermediate;
    }
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Zumbalstvo) {
            return intermediate * 1.3
        }
        return intermediate;
    }
}

class Kuramribs extends Location {
    constructor() { super(1, 3, 1); }
    //При заходе в локацию все сисяндры работают
    //Состояния перещагружается после выхода из локации -
    //"каждая сисяндра перестаёт работать... во втором и последующих интервалах нахождения в локации"
    //Здесь реализуется трактование "Новый период нахождения - новый счётчик"
    //Если подразумевается иное трактование, то можно его реализовать через поиск
    //Последнего состояния Курамарибов в истории дурляндца, что не трудно реализовать.
    disabledSisandras = 0;
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        let workingSisandras = this.numSisandras;
        //Получаем предыдущую локацию для дурляндца
        let previousLocation = durlander.history.slice(-1)[0];
        if (previousLocation instanceof Kuramribs) {
            //Поскольку дурляндец уже какое-то время в этой локации,
            //получаем информацию сколько сисяндр уже перестало работать.
            //Данная информация хранится в экземпляре класса с прошлого шага,
            //выступающего в виде "снимка состояния"
            this.disabledSisandras = previousLocation.disabledSisandras;
            workingSisandras = this.numSisandras - this.disabledSisandras;
            //Получаем, сколько из работавших сисяндр отключились на этом шаге
            this.disabledSisandras += successfulRolls(workingSisandras, 0.7);
            workingSisandras = this.numSisandras - this.disabledSisandras;
        }
        if (action instanceof Gulbonstvo) {
            return intermediate * (workingSisandras / this.numSisandras);
        }
        return intermediate;
    }
}

class PuntaPelicana extends Location {
    constructor() { super(1, 3, 1); }
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        let previousLocation = durlander.history.slice(-1)[0];
        if (previousLocation instanceof PuntaPelicana) {
            if (action instanceof Gulbonstvo) {
                return intermediate * 1.23;
            }
        }
        return intermediate;
    }
    modifyMoney(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        let previousLocation = durlander.history.slice(-1)[0];
        if (previousLocation instanceof PuntaPelicana) {
            return intermediate - 0.5 * durlander.money * successfulRolls(1, 0.5);
        }
        return intermediate;
    }
}

class Shrinavas extends Location {
    constructor() { super(1, 1, 3); }
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (action instanceof Shlyamsanie) {
            return intermediate * 1.13;
        }
        return intermediate;
    }
}

class HareKrishi extends Location {
    constructor() { super(1, 1, 3); }
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        if (durlander instanceof Drocent) {
            return intermediate - durlander.health * 0.1;
        }
        return intermediate;
    }
}


class Step {
    durlander: Durlander;
    action: Action;
    location: Location;
    constructor(
        durlander: Durlander,
        action: Action,
        location: Location
    ) {
        this.durlander = durlander;
        this.action = action;
        this.location = location;
    }
}

function successfulRolls(
    n: number,
    probabilityOfZero: number
): number {
    if (n < 0) {
        throw new Error("n must be non-negative");
    }
    if (probabilityOfZero < 0 || probabilityOfZero > 1) {
        throw new Error("probabilityOfZero must be between 0 and 1");
    }

    let sum = 0;

    for (let i = 0; i < n; i++) {
        const randomValue = Math.random() < probabilityOfZero ? 0 : 1;
        sum += randomValue;
    }
    return sum;
}
function successfulRollsMultiplier(
    n: number,
    probabilityOfZero: number
): number {
    return successfulRolls(n, probabilityOfZero) / n;
}

type DurlanderConstructor = new () => Durlander;
type LocationConstructor = new () => Location;
type ActionConstructor = new () => Action;
// Массивы с конструкторами классов. При добавлении нового класса
// для использования его в симуляции добавить в список
const ALL_DURLANDERS: DurlanderConstructor[] = [
    Mojor,
    Nischebrod,
    Soyeviy,
    Prosvetlenniy,
    Drocent,
    Zheleznouhiy
] as const;

const ALL_LOCATIONS: LocationConstructor[] = [
    Balesburg,
    Dolbesburg,
    Kuramribs,
    PuntaPelicana,
    Shrinavas,
    HareKrishi
] as const;

const ALL_ACTIONS: ActionConstructor[] = [
    Zumbalstvo,
    Gulbonstvo,
    Shlyamsanie,
    Idle
] as const;

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]!;
}

function runSimulation(maxSteps: number = 100) {
    // Создаем случайного дурляндца
    const DurlanderClass = getRandomElement(ALL_DURLANDERS);
    const durlander = new DurlanderClass();
    
    console.log(`=== Начало симуляции ===`);
    console.log(`Создан дурляндец: ${durlander.constructor.name}`);
    console.log(`Начальное состояние: Здоровье=${durlander.health}, Деньги=${durlander.money}, Удовлетворенность=${durlander.psyche}`);
    
    let step = 0;
    
    // Основной цикл симуляции
    while (step < maxSteps) {
        step++;
        const LocationClass = getRandomElement(ALL_LOCATIONS);
        const ActionClass = getRandomElement(ALL_ACTIONS);
        
        const location = new LocationClass();
        const action = new ActionClass();    
        
        // Вычисляем изменения показателей (порядок: действие -> локация -> дурляндец)
        let healthChange = 0;
        let moneyChange = 0;
        let psycheChange = 0;
        
        // Применяем модификаторы
        healthChange = action.modifyHealth(healthChange, durlander, action, location);
        moneyChange = action.modifyMoney(moneyChange, durlander, action, location);
        psycheChange = action.modifyPsyche(psycheChange, durlander, action, location);
        
        healthChange = location.modifyHealth(healthChange, durlander, action, location);
        moneyChange = location.modifyMoney(moneyChange, durlander, action, location);
        psycheChange = location.modifyPsyche(psycheChange, durlander, action, location);
        
        healthChange = durlander.modifyHealth(healthChange, durlander, action, location);
        moneyChange = durlander.modifyMoney(moneyChange, durlander, action, location);
        psycheChange = durlander.modifyPsyche(psycheChange, durlander, action, location);
        
        durlander.health += healthChange;
        durlander.money += moneyChange;
        durlander.psyche += psycheChange;
        
        // Создаем запись о шаге и добавляем в историю
        const stepRecord = new Step(durlander, action, location);
        durlander.history.push(stepRecord);
        
        console.log(`\nШаг ${step}:`);
        console.log(`  Локация: ${location.constructor.name} (Слесандры=${location.numSlesandras}, Сисяндры=${location.numSisandras}, Чучундры=${location.numChuchundras})`);
        console.log(`  Действие: ${action.constructor.name}`);
        console.log(`  Изменения: Здоровье=${healthChange.toFixed(2)}, Деньги=${moneyChange.toFixed(2)}, Удовлетворенность=${psycheChange.toFixed(2)}`);
        console.log(`  Текущее состояние: Здоровье=${durlander.health.toFixed(2)}, Деньги=${durlander.money.toFixed(2)}, Удовлетворенность=${durlander.psyche.toFixed(2)}`);
        
        let causeOfDeath: string | null = null;
        if (durlander.health <= 0) {
            causeOfDeath = "болезнь (здоровье ≤ 0)";
        } else if (durlander.money <= 0) {
            causeOfDeath = "голод (деньги ≤ 0)";
        } else if (durlander.psyche <= 0) {
            causeOfDeath = "депрессия (удовлетворенность ≤ 0)";
        }
        
        if (causeOfDeath) {
            console.log(`\n=== Конец симуляции ===`);
            console.log(`Дурляндец погиб на шаге ${step} от ${causeOfDeath}`);
            return;
        }
    }
    
    console.log(`\n=== Конец симуляции ===`);
    console.log(`Достигнуто максимальное количество шагов (${maxSteps})`);
    return;
}

console.log("Запуск одной симуляции:");
runSimulation();
