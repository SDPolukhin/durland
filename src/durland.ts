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

class Balesburg extends Location {
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
    disabledSisandras = 0;
    modifyPsyche(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        let workingSisandras = this.numSisandras;
        let previousLocation = durlander.history.slice(-1)[0];
        if (previousLocation instanceof Kuramribs) {
            this.disabledSisandras = previousLocation.disabledSisandras;
            workingSisandras = this.numSisandras - this.disabledSisandras;
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
