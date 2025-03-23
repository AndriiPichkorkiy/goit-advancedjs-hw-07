class Key {
    private signature: string;
    constructor() {
        this.signature = (Math.random() * 1000000).toString(16);
    }

    public getSignature(this: Key): string {
        return this.signature;
    }
}

class Person {
    constructor(private key: Key) {}

    public getKey(): Key {
        return this.key;
    }
}

abstract class House {
    protected tenats: Person[] = [];
    protected door: boolean = false;

    constructor(protected key: Key) {}

    public comeIn(person: Person): void {
        if (this.door) this.tenats.push(person);
    }

    public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
    constructor(protected key: Key) {
        super(key);
    }

    public openDoor(key): void {
        if (this.key.getSignature() === key.getSignature()) this.door = true;
    }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

console.log(house);

export {};
