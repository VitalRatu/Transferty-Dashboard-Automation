
/* function makeCoffee(drinkName:string): Promise<string> 
{

    return new Promise((resolve,reject) => 
        {
                    if (drinkName.toLocaleLowerCase() === "coffe")
                    {
                        resolve('Ваше латте готово!');
                    }
                    else
                    {
                        reject('Ми робимо тільки Лате! 😡'); 
                    }
        });
}
function makeFood(foodaName:string): Promise<string>
{
    return new Promise((resolve,reject ) =>
        {

                if (foodaName.toLocaleLowerCase() === "croissant")
                {
                    resolve('Ваш сендвіч готовий!');
                }
                else
                {
                    reject('Ми робимо тільки круасани! 😡');
                }
        });
}

function calculatePrice(drinkPrice:number, foodPrice:number): Promise<number>
{
    return new Promise((resolve,reject) =>
        {
            const totalPrice = drinkPrice + foodPrice;
            if (totalPrice <= 20)
            {
                resolve(totalPrice);
            }
            else
            {
                reject('Загальна ціна перевищує 20!');
            }

        });

}

async function order(drinkName:string): Promise<void>
{
    try
    {
        const result: string = await makeCoffee(drinkName);
        console.log(result);
    }
    catch(error)
    {
        console.log(error);
    }
    finally
    {
        console.log('Дякуємо за замовлення!');
    }
}

async function orderFood(foodaName:string)
{
    try
    {
        const result: string = await makeFood(foodaName);   
        console.log(result);
    }
    catch(error)
    {
        console.log(error);
    }
}

async function OrderPrice(drinkPrice:number, foodPrice:number)
{
    try
    {
        const total: number = await calculatePrice(drinkPrice, foodPrice);
        console.log(`Загальна ціна замовлення: ${total} грн.`);
    }
    catch(error)
    {
        console.log(error);
    }
    finally
    {
        console.log('Дякуємо за замовлення!');
    }
}

async function getFullBreakfast() {
  console.log("⏳ Замовляю сніданок...");

  try {
    // Чекаємо, поки виконаються ОБИДВА проміси
    // Час очікування = час найдовшого промісу (паралельне виконання)
    const [drink, food] = await Promise.all([ 
        makeCoffee("coffe"), 
        makeFood("Croissant") 
    ]);

    // Цей код спрацює ТІЛЬКИ якщо обидва успішні
    console.log(`✅ Ура! Отримав: ${drink} та ${food}`);

  } catch (error) {
    // Якщо хоч один (кава АБО їжа) зробить reject — ми миттєво потрапимо сюди
    console.error(`🛑 Сніданок скасовано: ${error}`);
  }
  finally{
    console.log("Дякуємо за замовлення!");
  }
}

order("coыffe"); */

/* const user: {name: string; email: string} = 

{
    name: "Alice",
    email: "alice@example.com"
};


const user2: {name: string; email?: string; age?: number, paramets: {country: string; city: string}} =
{
    name: "Bob",
    age: 30,
    email: "@example.com",
    paramets: 
        {
            country: "Ukraine",
            city: "Lviv"
        }
}

function userProccess(some_var: {name: string; email?: string; age?: number, paramets?: {country: string; city: string}}): void
{
    console.log(`Name: ${some_var.name}`);
    console.log(`Email: ${some_var.email}`);
    console.log(`Age: ${some_var.age}`);
}

const obg: {name: string; email?: string; age?: number, paramets?: {country: string; city: string}} = 
{
    name: "Charlie", 
    email: "charlie@example.com", 
    age: 25, 
    paramets: 
    {
        country: "USA",
        city: "New York"
    }
};

userProccess(obg);

function foo({name, email}: {name: string; email: string}): void
{
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
} */

/* class Button
{
    text: string;
    className: string[];

    create(): HTMLButtonElement
    {
        const button = document.createElement('button');
        button.innerText = this.text;
        this.className.forEach(item => button.classList.add(item));
        return button;
    }
}
 */

/* class User
{
    private _age: number = 0;

    public get age(): number
    {
        return this._age;
    }

    public set age(value: number)
    {
        if(value < 0 || value > 100)
        {
            throw new Error('Вік повинен бути в межах від 0 до 100');
        }
        this._age = value;
    }
}

class SecretFile
{
    private _content: string;
    constructor(content: string)
    {
        this._content = content;
    }

    public set content(newContent: string)
    {
        if (newContent == "")
        {
            throw new Error('Вміст файлу не може бути порожнім');
        }

        this._content = newContent;
    }

    public get content(): string
    {
        return "*** ACCESS DENIED ***";
    }

    public revealContent(password: string): string
    {
        if (password === "password")
        {
            return this._content;
        }
        else
        {
            throw new Error('Неправильний пароль');
        }
    }
}

class Character
{
    private _currentHp: number;

    constructor()
    {
        this._currentHp = this.maxHP;
    }

    public readonly maxHP: number = 100;

    public get currentHP(): number 
    {
        return this._currentHp;
    }

    public set currentHP(HP: number)
    {
        if (HP > this.maxHP)
        {
            this._currentHp = this.maxHP;
        }
        else if (HP === 0)
        {
            this._currentHp = 0;
        }
        else
        {
            this._currentHp = HP;
        }
    }
}

class TimeConverter 
{
    private static _coefficient: number = 60;
    
    public static toSeconds(minutes: number): number
    {
        return minutes * this._coefficient;
;
    }
    public static toMinutes(seconds: number): number
    {
        return seconds / this._coefficient;
    }
} */

/* abstract class User
{
    public abstract username: string;
    public abstract email: string;
    public abstract emailValidate(email: string): boolean;
}

class Person extends User
{
    public username: string = "JohnDoe";
    public email: string = "john.doe@example.com";

    constructor(username: string, email: string) 
    {
        super();
        this.username = username;
        this.email = email;
    }

    public emailValidate(email: string): boolean
    {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

console.log("Person class works fine"); */

/* type TestStatus = "passed" | "failed" | "skipped";

const currentResult: TestStatus = 'skipped'

type TestConfig =
{
    browser: 'chromim' | 'firefox',
    headless: true | false,
    timeout: number,
    baseURL?: string
}

type IsArray<T> = T extends number[] ? 'list': 'single_item'

type Check1 = IsArray<string[]>;
type Check2 = IsArray<number>
const responseType: Check1 = 'single_item'

type MyPages = {
    login: string;    
    dashboard: string;
    settings: string;
    admin: number;
}

const page = 6

let typer = typeof page; // 'number'

console.log(`Type of page variable is: ${typer}`);

typer = 'string';
typer = 6;
 */

/* const SomeVariable: {userName:string, surName: string, age: number} = 

{
    userName: "Valera",
    surName: "Risk",
    age: 20
}

type SomeType = typeof SomeVariable
type SomeTypeSecond = keyof typeof SomeVariable

type SomeTypeExplicit =
{
    name: string,
    surname: string,
    age: number[]
}

const variable: SomeTypeExplicit = 
{
    name: "Valera",
    surname: "Risk",
    age: [20, 21, 22]
}

const Checktype2 = typeof variable
 */

/* const a: (a:number) => number = function somefunction(a:number): number
{
    a+= 5;
    console.log("Hello world" + " " + a);
    return a * 2;

}
a(5);
 */

function valera()
{
    console.log("Hello world");
}

console.log(valera.prototype.toString());


class User
{
    name: string;   
    constructor(name: string)
    {
        this.name = name;
    }
}    

console.log(User.prototype === Function.prototype);
