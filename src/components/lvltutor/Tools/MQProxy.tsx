import { proxy } from "valtio";
import type {Step} from "./ExcerciseType";

interface value {
    ans:string;att:number;hints:number;lasthint:boolean;fail:boolean;duration:number;
}

interface sharedValues{
    content:string,
    step:Step | null,
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

const initialObj:sharedValues={
    content:"",
    step:null,
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
}

const MQProxy = proxy(initialObj)

export const reset = () => {
    Object.assign(MQProxy, initialObj)
}

export default MQProxy;