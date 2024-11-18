export interface CustomResponse<T> {
    timestamp : Date ;
    status : string ;
    data : T ;
    message : string ; 
}

export interface Trainee {
    id?: number; 
    name : string ;
    email : string ;
    password : string ;
    exercises?: Exercise[] ;

}

export interface CustomError {
    timestamp: Date ;
    status: string ;
    message: string ;
}

export interface Exercise {
    id? : number ;
    name  : string; 
    sets : number ;
    reps : number ;
    traineeId: number ; 
    date : string; 
    
    
}






