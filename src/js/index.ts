import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface Car {
    id: number;
    vendor: string;
    model:string;
    price:number;
}

let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars/";
let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("carsContent");

let GetAllCarsButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");
GetAllCarsButton.addEventListener('click',showAllCars);

let GetOneCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneButton");
GetOneCarButton.addEventListener('click',getOneCar);

let AddCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
AddCarButton.addEventListener('click',addCar);

let deleteCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
deleteCarButton.addEventListener('click',deleteCar);

function showAllCars():void{
    axios.get(carWebUrl)
    .then(function(response: AxiosResponse<Car[]>):void{
        console.log(response);
        console.log("Statuscode is :" + response.status);

        while (ContentElement.firstChild) {
            ContentElement.removeChild(ContentElement.lastChild);
        }

        response.data.forEach((car: Car) => {
            console.log(car);

            let newNode:HTMLLIElement = AddLiElement("ID: " + car.id+ ", " + car.model + ", " +car.vendor+ ", "+car.price);
            ContentElement.appendChild(newNode);
        });
    })
    .catch(function(error:AxiosError):void{
        console.log(error);
    })
    //.then()
}

function getOneCar():void{
    let getCarIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("getOne");
    let myCarId : number = +getCarIdElement.value;

    axios.get(carWebUrl + "/" + myCarId)
    .then(function(response: AxiosResponse<Car>):void{
        console.log(response);
        console.log("Statuscode is :" + response.status);

        while (ContentElement.firstChild) {
            ContentElement.removeChild(ContentElement.lastChild);
        }

        let car:Car = response.data;
        console.log(car)
        let newNode:HTMLLIElement = AddLiElement("ID: " + car.id+ ", " + car.model + ", " +car.vendor+ ", "+car.price);
        ContentElement.appendChild(newNode);
    })
    .catch(function(error:AxiosError):void{
        console.log(error);
    })
}

function addCar():void{
    let addModelelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addModel");
    let addVendorelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addVendor");
    let addPriceelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addPrice");

    let myModel : string = addModelelement.value;
    let myVendor: string = addVendorelement.value;
    let myPrice : number = +addPriceelement.value;  

    axios.post<Car>("https://webapicar20190326034339.azurewebsites.net/api/cars",
                    {model:myModel,vendor:myVendor,price:myPrice})
                    .then(
                        function (response :  AxiosResponse): void{
                        console.log("Statuscode is :" + response.status);
                        }
                    )
                    .catch(
                        function (error:AxiosError) : void{                          
                            console.log(error);
                        }
                    )   
}

function deleteCar():void{
    let delCarIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("deleteCarId");
    let myCarId : number = +delCarIdElement.value;

    let deleteContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("deletecontent");

    axios.delete("https://webapicar20190326034339.azurewebsites.net/api/cars/"+myCarId)
        .then((response :  AxiosResponse): void => {
                console.log("Car is deleted ");
                console.log("Statuscode is :" + response.status);
                deleteContentElement.innerHTML = "car is deleted";
        })
        .catch(
            (error:AxiosError) : void => {                          
                console.log(error);
                deleteContentElement.innerHTML = "Error: the car is NOT deleted, look at the console";
            });
}

function AddLiElement(text:string):HTMLLIElement {
    let newLi:HTMLLIElement = document.createElement('li');
    let newTextNode:Text = document.createTextNode(text)
    newLi.appendChild(newTextNode);
    return newLi;
}

