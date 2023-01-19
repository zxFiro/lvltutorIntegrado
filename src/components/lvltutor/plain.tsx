import dynamic from "next/dynamic";
import { Suspense } from "react";
import type {ExType} from "./Tools/ExcerciseType";

const Lvltutor = dynamic(
    () => {
        return import("./Tools/Solver2");
    },
    { ssr: false }
);

function LoadingPotatoes(){
    return <h2>🌀 Loading Potatoes...</h2>;
}

const Plain = ({topicId,steps}:{topicId:string,steps:ExType}) => {

    return (
        <>
        {steps?.type == "lvltutor" ? (
            <Suspense fallback={<LoadingPotatoes/>}><Lvltutor key={topicId} topicId={topicId} steps={steps}/></Suspense>   
        ) : "potato"}
        </>
    )
}

export default Plain

