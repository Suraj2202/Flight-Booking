import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Airline } from './airline';
import { BookFlight } from './book-flight';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //Gateway Link
  REST_API:String = "https://localhost:44345/v1.0/flight";
  Download_REST_API:String = "https://flightbookingsystem.azure-api.net/download/api/v1.0/flight";
  //set http Header
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient:HttpClient) { }

  //--------------record Pipe
  
  //Airline
  //Add to AirlineDetails database 
  AddAirlineDetails(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/AirlineDetails`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }

  //get from AirlineDetails database
  GetAirlineDetails(){
    let apiUrl = `${this.REST_API}/AirlineDetails`;
    return this.httpClient.get<Airline[]>(apiUrl)
  }

   //get single data
   GetSingleAirlineDetails(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/AirlineDetails/${data}`;
    return this.httpClient.get<Airline[]>(apiUrl)
  }

  //Block Airline
  BlockAirline(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/BlockAirline`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }

  UpdateAirlineDetails(check:any,data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/UpdateAirlineDetails/${check}`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }
  //Discounts
  AddDiscount(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/AddDiscounts`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }

  GetDiscounts(){
    let apiUrl = `${this.REST_API}/AddDiscounts`;
    return this.httpClient.get<Airline[]>(apiUrl)
  }

  GetSingleDiscounts(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/AddDiscounts/${data}`;
    console.log(apiUrl,"passed Url")
    return this.httpClient.get<Airline[]>(apiUrl)
  }

  DeleteDiscount(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/DeleteDiscountDetails`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }

  UpdateDiscount(check:any,data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/UpdateDiscountDetails/${check}`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }
  //Flights

  AddFlight(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/FlightDetails`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }

  GetFlights(){
    let apiUrl = `${this.REST_API}/FlightDetails`;
    return this.httpClient.get<Airline[]>(apiUrl)
  }


  //Schedule

  AddSchedule(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/ScheduleAirline`;
    return this.httpClient.post(apiUrl, data).pipe(catchError(this.ErrorHandler))
  }

  GetSchedule(){
    let apiUrl = `${this.REST_API}/ScheduleAirline`;
    return this.httpClient.get<Airline[]>(apiUrl)
  }

  GetSingleSchedule(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/ScheduleAirline/${data}`;
    return this.httpClient.get<Airline[]>(apiUrl)
  }

  DeleteSchedule(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/DeleteScheduleDetails`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }

  UpdateSchedule(check:any,data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/UpdateScheduleDetails/${check}`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }
    //-----------Producers

  AirlineProducer(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/AirlineProducer`;
    return this.httpClient.post(apiUrl, data).pipe(catchError(this.ErrorHandler))
  }

  DiscountProducer(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/ManageDiscounts`;
    return this.httpClient.post(apiUrl, data).pipe(catchError(this.ErrorHandler))
  }

  OneWayScheduleProducer(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/OneWayScheduleProducer`;
    return this.httpClient.post(apiUrl, data,{responseType:'text'}).pipe(catchError(this.ErrorHandler))
  }

  TwoWayScheduleProducer(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/TwoWayScheduleProducer`;
    return this.httpClient.post(apiUrl, data,{responseType:'text'}).pipe(catchError(this.ErrorHandler))
  }
  

  //Login
  HandleLogin(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/login`;
    return this.httpClient.post(apiUrl, data,{responseType:'text'}).pipe(catchError(this.ErrorHandler))
  }

  HandleSignUp(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/Signup`;
    return this.httpClient.post(apiUrl, data).pipe(catchError(this.ErrorHandler))
  }
  
  HandleLogout(data:Airline):Observable<any>{
    let apiUrl = `${this.REST_API}/Logout`;
    return this.httpClient.post(apiUrl, data).pipe(catchError(this.ErrorHandler))
  }
  
  CheckTokenValidation(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/login/${data}`;
    return this.httpClient.get(apiUrl)
  }

  //USer Side

  GetOneWaySchedule(userName:any, uniqueKey:any):Observable<any>{
    let apiUrl = `${this.REST_API}/onewaysearch/flight?userName=${userName}&uniqueKey=${uniqueKey}`;
    return this.httpClient.get<Airline[]>(apiUrl)
  }

  GetRoundWaySchedule(userName:any, uniqueKey:any):Observable<any>{
    let apiUrl = `${this.REST_API}/twowaysearch/flight?userName=${userName}&uniqueKey=${uniqueKey}`;
    return this.httpClient.get<Airline[]>(apiUrl)
  }

  BookFlight(data:BookFlight):Observable<any>{
    let apiUrl = `${this.REST_API}/onewaybooking`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }

  BookFlights(data:BookFlight):Observable<any>{
    let apiUrl = `${this.REST_API}/twowaybooking`;
    return this.httpClient.post(apiUrl,data).pipe(catchError(this.ErrorHandler))
  }


  GetAllTickets(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/getalltickets/${data}`;
    return this.httpClient.get<BookFlight[]>(apiUrl)
  }

  GetSingleTickets(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/singlesearchpnr/${data}`;
    return this.httpClient.get<BookFlight[]>(apiUrl)
  }


  CancelTicket(data:any):Observable<any>{
    let apiUrl = `${this.REST_API}/updatecancelstatus`;
    return this.httpClient.post(apiUrl,{"UniqueBookingId":data}).pipe(catchError(this.ErrorHandler))    
  }

  DownloadTicket(data:any):Observable<any>{
    let apiUrl = `${this.Download_REST_API}/ticket/${data}`;
    return this.httpClient.get(apiUrl)
  }
//Error handle

ErrorHandler(error: HttpErrorResponse){
  let errorMessage = "";
  

  if(error.error instanceof ErrorEvent){
    //client error
    errorMessage = error.error.message;
  }
  else{
    //Server error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;    
  }
  if(errorMessage.includes("200")){
    return errorMessage
  };
 // window.location.reload();")
  return throwError(errorMessage);
}

}
