/*
TypeScript mixins let you compose reusable behaviors into classes without using traditional inheritance chains.
They solve two key problems:

1. No multiple inheritance in JS/TS

A class can only extends one base class. Mixins let you combine multiple independent behaviors:

2. Reuse across unrelated class hierarchies

How it works
A mixin is a function that takes a base class and returns a new class extending it with additional properties/methods.
TypeScript infers the intersection type automatically, so you get full type safety on the composed result.

This is exactly what the Constructor type in your mixins.ts file is for — it constrains the mixin parameter 
to any constructable class.
*/

type Constructor<T = {}> = new (...args: any[]) => T

// ***************** Mixin using Object.assign
const petMixin = {
    printInfo() {
        console.log('This is a pet')
    }
}

class Cat {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    printNameAndAge() {
        console.log(`Name: ${this.name}, Age: ${this.age}`)
    }
}

const myCat = Object.assign(new Cat('Whiskers', 3), petMixin)
myCat.printNameAndAge() // Output: Name: Whiskers, Age: 3
myCat.printInfo() // Output: This is a pet

// ************  OR with Mixin Function ************
function WithPet<T extends Constructor>(Base: T) {
    return class extends Base {
        printInfo() {
            console.log('This is a pet')
        }
    }
}

const PetCat = WithPet(Cat)
const myCat2 = new PetCat('Whiskers', 3)
myCat2.printInfo() // ✅ typed
myCat2.printNameAndAge() // ✅ typed

// ***********************  Class Factory Mixin ***********************
const PetMixin = <T extends Constructor>(Base: T) => {
    return class extends Base {
        printInfo() {
            console.log('This is a pet')
        }
    }
}

class Robot {
    recharge() {
        console.log('Recharging...')
    }
}

class RoboCat extends PetMixin(Robot) {
    name: string
    age: number

    constructor(name: string, age: number) {
        super()
        this.name = name
        this.age = age
    }

    printNameAndAge() {
        console.log(`Name: ${this.name}, Age: ${this.age}`)
    }
}
const myRoboCat = new RoboCat('RoboWhiskers', 5)
myRoboCat.printInfo() // Output: This is a pet
myRoboCat.printNameAndAge() // Output: Name: RoboWhiskers, Age: 5
myRoboCat.recharge() // Output: Recharging...
