import dynamic from "next/dynamic";

const Plain = ({steps}) => {

    const Lvltutor = dynamic(
        () => {
            return import("./Tools/Solver2");
        },
        { ssr: false }
    );

    return (
        <>
        {steps?.type == "lvltutor" ? (
            <Lvltutor steps={steps} nextRouter="/" />
        ) : "potato"}
        </>
    )
}

export default Plain

