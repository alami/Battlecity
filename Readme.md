tanshiki: PixelJS - 2D, Phaser - 4 sound,graphics,etc - медленнее
0-04 опросник
0-05 OpenServer
0-06 git Aleksey-Danchin
0-09 ролик
0-10 1-3 дней теория ООП, 4-5 практика -> полный курс 1-2 месяца
0-13 Battlecity
0-18 обший план приложения 
1)загрузчик - class Loader -1 day - загрузка данных и игровых переменных
 (с большой буквы -Класс или Модель)
----";" c 2х сторон позволяет спрятать данные при объединиении с др.скриптами при внешнем испозованим - интенсив 
;(function () { 
    'use strict'
})();
2) Игра class Applcation -2 day
3) Rendering

0-22 
const person = {name:`alami`, age:27 }
person.sayHello = function () {console.log (`Hi, My name is ${this.name}`)}
person.sayHello()
0-24  но  если несколько персон, то метод надо создать для каждой
0-25 (-)лишние копии 1 и той же ф-ции
сделаем объект и конструкор
    class Person {
        constructor (name, age) {
            this.name = name
            this.age = age
        }
        sayHello () {console.log (`Hi, My name is ${this.name}`)}
    }
    person1 = new Person('alami',27)
    //person1.sayHello();
0-28 теперь видим 
Person {name: "alami", age: 27} --не объект а сам класс
у него есть__proto__:
  Constructor :class Person
  sayHello    : f sayHello()
     __proto__  :
0-29 если ф-ции нет в текущем __proto__, он пойдет далее в следующем __proto__
кроме того в объект создается ф-циями ан не декларативно => работаь с итеративно итп
0-31 => 1)дать тип данных 2) объединить в 1 стр-ру
0-32 constructor () {} - стат метод, те принадлежит не экз класса , а к самому классу
;(function () {
    'use strict'
    class Loader {
    constructor () {}
    static loadImage (src) { ---
        return new Promise((resolve, reject) => {
            try {
                const image = new Image
                image.onload = () => resolve(image) -- реакция на создание
                             --она не возвращается, а ИМЕННО вызывается метод resolve()
                             в нужный момент когда сервер дал нам медиафайл
                             в ээтот момент промис-обещаение считается выполненным
                image.src = src 
            }
            catch (err) { --если какия то ошибка вызвается, а не возвращается reject()
                reject(err)
            }
        })
    }
})();       
0-36 попробуем на очень простом изо 
    GameEngine.Loader.loadImage('static/amirsay.jpg')
0-38 хоть и не видно на мониторе , но в F12/Network видно что загружен
0-39 нельзя просто взять и вывести проис
    const p = GameEngine.Loader.loadImage('static/amirsay.jpg')
    console.log(p)  
---Promise {<pending>}
   __proto__: Promise
   [[PromiseStatus]]: "resolved"
   [[PromiseValue]]: img
=> поэтому надо подписаться на событие resolve()    
каким образом? .then(image => {})
!! передается ф-ция, кот принимает параметр, кот  передается в  resolve(image)
  т.е. то что передается в resolve(), попадат потом в .then(),
  где можно делать с изо все, что угодно, 
    GameEngine.Loader.loadImage('static/amirsay.jpg')
        .then(image => {
            console.log(image)    ---напр, вывести в консоль-ничего не даст
            document.body.append(image) ---напр, добавить в документ
        })
0-40 разобрали с наскоку : 1) классы 2) стат.методы 3) промисы
0-42 можно "." писать в строку , столбик или так
        const { Loader } = GameEngine ---Loader сначал ввытащить из  GameEngine
        Loader.loadImage('static/amirsay.jpg')   ----и использовать потом
            .then(image => {
                console.log(image)
                document.body.append(image)
            })
0-43 Q: engine/Loader.js - начинается и заканчивается  с ";" чтобы при склейке файлов было ОК
    вызов стат метода:  Класс.ф-ция    
0-45 в чем разница     window.GameEngine = window.GameEngine || {}
   погда подключатся к GameEngine еще классы кроме Loader,
   низвестно в какой последовательности, т.е. в след раз ичли объекты совпадают ,
   то равно тому же если нет, то подключаются и другие
0-46 создадим ф-ции задействованный для экз-ра Loader (не статические)
0-47 constructor () {
         this.loadOrder = { ---чередь данных , кот надо загрузить
             images: [],
             jsons: []
         }
         this.resources = { ---у нас будут еще ресурсы где хранить данные
             images: [],   --из images
             jsons: []      --json файлов? звуки позже
         }
     }
     addImage (name, src) {
          this.loadOrder.images.push(name,src)
         }
0-48 создадим экз-р
    const loader = new Loader()
    loader.addImage('Amirsay','static/amirsay.jpg')
Loader
 {loadOrder: {…},
 resources: {…}}
 loadOrder:
  images: (2) ["Amirsay", "static/amirsay.jpg"]
   0: "Amirsay"
   1: "static/amirsay.jpg"length: 2__proto__: Array(0)jsons: []__proto__: Object
  resources: {images: Array(0), jsons: Array(0)}
    images: Array(0)length: 0
    __proto__: Array(0)jsons: []__proto__: Object__proto__: Object
(index):18 <img src=​"static/​amirsay.jpg">​

0-49 load(callback) {  ---- в кот загружают ф-цию, кот вызывают после завершения всего
        for (const imageData of this.loadOrder.images) {
            console.log(imageData)  ---для начала
        }
    }
0-51 ф-ции объекта заботятся как хранить данные, куда возврщать, 
  создавать очередь на загрузку, куда загружать, обрабаывать саму загрузку,
  как реагировать после загрузки всего  и т.п, т.е. куда более сложный
в отличие статических куда более глупеньких и просто универсальной для всех сущностей        
  load (callback) {
    const promices = []     
сразу вытащить св-ва||объекта / цикл по записям||по необх-ти загрузки изо     
    for (const {name, src } of this.loadOrder.images) { //imageData
        const promice = Loader --создаем промис = имя класса
            .loadImage(src)    --стат метод
            .then(image => {   --рез-т этого промиса, когда будет загружено
                this.resources.images [name] = image  --добавлено в ресурс по имени
                   ---удаляю из loadOrder --о необходимости записи изо
                if (this.loadOrder.images.includes(name)) {
                    const index = this.loadOrder.images.indexOf(name)
                    this.loadOrder.images.splice(index,1)
                }
            })
        promices.push(promice) ---добавим в массив промисов кот есть в loader-е
    }
    Promise.all(promices).then(сallback) ---просто ждет когда вып-ся
  }        --- все промисы-заргся изо и json файлы и буде вызван .then и ф-ция callback
           -- сокращение .then(()=>callback)
0-54 комменты
0-57 ОШИБКА:
Loader {loadOrder: {…}, resources: {…}}
    loadOrder:
    images: (2) ["Amirsay", "static/amirsay.jpg"] ---должно быть пусто-нет очереди на загрузку
=>придется передавать сам объект imageData, а не { name, src } 
т.к. indexOf(imageData) нужен  сам объект, а не indexOf(name)

0-59 callback - handler - ф-ия передется как аргумент др-ой ф-ции

1-01 json - файл
1-03 сделаем такой же 
        addJson (name, src) {
          this.loadOrder.jsons.push({name,src})
          } 
и загрузку в loader() ---логика вся та же самая
  for (const addJson of this.loadOrder.images) { 
    const { name, address } = imageData

    const promice = Loader
        .loadJson(address)  //loadImage -- не подойдет --скачиваем с сервака
        .then(image => {
            this.resources.jsons [name] = image --регистрируем в ресурсах

            if (this.loadOrder.jsons.includes(imageData)) { --удаляем из очереди загрузки
                const index = this.loadOrder.jsons.indexOf(imageData)
                this.loadOrder.jsons.splice(index,1)
            }
        })
    promices.push(promice)
  }
1-04 fetch - аналог AJAX запроса спомошью xHttP request, 
просто способ загрузить данные с сервера на клиента
1-05 то же возвращает промис  
1-06
   static loadJson (address) {
     return new Promise((resolve, reject) => {
       fetch(address)
         .then(result => result.json())   --один методов для данных и текст и json их надо правильно интерпретировать
         .then(result => resolve(result)) --2 раза, стиль прогр-ния,
---т.к. всегда возвращает Промис, а значит и на его рез-т я подписываюсь спомощью .then
         .catch (err => reject(err))  -- не оборачиваем в try, т.к.есть пособность поймать ошибку у промиса непосредственно
     })
    }
   }
1-07 ошивка в JSON? он очень привередлив, никааих лишних пробелов, запятых, только "",ит.п  
1-10 нашли в  for (const addJson of this.loadOrder.images) { --.jsons
1-11 далее будум получать доступ ко всем загруженным данным: описывать карты, спрайты на картинках
и это все будут храниться в нашем лодере
1-12 comments
1-13 github
1-25
-----------------------------------------------2day : class Game --------
0-00 добавим ф-ционала в лоадер 
1-12 а именно возможность вытягивать ресурсы из лодера
[обязательно вытягиватьресурсы после загрузки лоадера :) 
    loader.load (()=>{
        document.body.append(loader.resources.images['Amirsay']) })  ]
2-24 --это устаревшая версия
    getName (searchName) {
        for (const { image, name } of this.resources.images) {
            if (searchName === name) {
                return image
            }
        }
    }
    getJson (searchName) {
        for (const { json, name } of this.resources.jsons) {
            if (searchName === name) {
                return json
            }
        }
    }
3-12 ---новая 
    getName (name) {
        return this.resources.images[name]
    }
    getJson (name) {
        return this.resources.jsons[name]
    }
4-06 тогда выведем картинку
 loader.load (()=>{
        // console.log('Images loaded')
        document.body.append(loader.getImage('Amirsay'))
    })
5-15 или все вместе 
loader.load (()=>{
        const image = loader.getImage('Amirsay')
        document.body.append(image)
        const json = loader.getJson('persons')
        console.log(json)
    })
0-06-10 - список участников - 6 дней + защита проекта    
0-07 создадим теперь класс Application , но т.к. это игра, назовом его Render    
    ;()();   --опять оборачиваем в самовызывающуюся ф-ию
;(function () {
    'use strict'Render = Render
    window.GameEngine = window.GameEngine || {}  --- скопируем из лодера
    window.GameEngine.   --- только заменим класс Loader на Render
})();


    
    
1-32