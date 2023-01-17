import { proxy } from "valtio";
import type {Step} from "./ExcerciseType";

interface value {
    ans:string;att:number;hints:number;lasthint:boolean;fail:boolean;duration:number;
}

interface sharedValues{
    step:Step | null,
    content:string,
    topicId:string,
    disablehint:boolean,
    deefaultIndex:Array<number>,
    submit:boolean,
    submitValues:value,
    startDate:number,
    endDate:number,
    alertType:"info" | "warning" | "success" | "error" | undefined,
    alertMsg:string,
    alertHidden:boolean,
    hints:number,
    error:boolean
}

const MQProxy = proxy<sharedValues>
({
    step:null,
    content:"",
    topicId:"",
    disablehint:false,
    deefaultIndex:[0],
    submit:false,
    submitValues:{ans:"",att:0,hints:0,lasthint:false,fail:false,duration:0},
    startDate:0,
    endDate:0,
    alertType:"success",
    alertMsg:"",
    alertHidden:true,
    hints:0,
    error:false
});

export default MQProxy;