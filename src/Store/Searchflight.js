import {create} from 'zustand';
import { useFlightSearch } from '../AmadeusClient/Client';

const Useflightstore = create((set)=>({
    flights: [],
    loading: false,
    error: null,
    search:async(origin,destination,date)=>{
        set({loading:true,error:null});

        const response = await useFlightSearch(origin,destination,date);
        if(response.length>0){
            set({flights:response,loading:false});
        }else{
            set({error:"No flights found",loading:false});
        }
    }
}));

export default Useflightstore