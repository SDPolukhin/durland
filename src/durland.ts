abstract class Modifier {
    protected abstract readonly __type: string;

    isInstanceOf<T extends Modifier>(type: string): this is T {
        return this.__type === type;
    }
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
    //history: Step[];
    
    constructor() {
        super();
        this.health = 10;
        this.money = 10;
        this.psyche = 10;
        //this.history = [];
    }
}

abstract class Location extends Modifier {
    num_slesandras: number;
    num_sisandras: number;
    num_chuchundras: number;
    
    constructor(slesandras: number, sisandras: number, chuchundras: number) {
        super();
        this.num_slesandras = slesandras;
        this.num_sisandras = sisandras;
        this.num_chuchundras = chuchundras;
    }
}

// Конкретные классы действий
class Zumbalstvo extends Modifier {
    __type = "Zumbalstvo";
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
        return 2 * location.num_slesandras;
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
    __type = "Gulbonstvo";
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
        return 2 * location.num_sisandras;
    }
}

class Shlyamsanie extends Modifier {
    __type = "Shlyamsanie";
    modifyHealth(
        intermediate: number,
        durlander: Durlander,
        action: Action,
        location: Location
    ): number {
        return 2 * location.num_chuchundras;
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
    __type = "Idle"
}

type Action = Zumbalstvo | Gulbonstvo | Shlyamsanie | Idle;

/*class Step {
    durlander: Durlander;
    action: Action;
    location: Location;
}*/
