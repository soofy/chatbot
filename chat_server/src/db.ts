 
//  import { TraceModel, Notification } from './models/models'


//  //TODO add batch load
//  export const writeToDB = async (data : any)=>{

//     const trace : Notification = await TraceModel.create({...data });
   
//      return trace;
//  }

//   //TODO add batch load
//   export const bulkInsert = async (data : Notification[])=>{

//     try  {
//     const trace : Notification[] = await TraceModel.insertMany(data);
   
//      return trace;
//     }
//     catch(ex){
//         console.log(ex);
//         throw ex;
//     }
//  }