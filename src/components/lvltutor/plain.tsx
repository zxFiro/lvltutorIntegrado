import dynamic from "next/dynamic";

import type {ExType} from "./Tools/ExcerciseType";


const Plain = ({topicId,steps}:{topicId:string,steps:ExType}) => {

    const Lvltutor = dynamic(
        () => {
            return import("./Tools/Solver2");
        },
        { ssr: false }
    );

    return (
        <>
        {steps?.type == "lvltutor" ? (
            <Lvltutor topicId={topicId} steps={steps}/>
        ) : "potato"}
        </>
    )
}

export default Plain

