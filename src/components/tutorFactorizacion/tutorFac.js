import { Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

export const TutorFac = ({ exercise }) => {
  const DynamicTutorFC = dynamic(() =>
    import("./factorComun/FactorComun").then((mod) => mod.FC)
  );
  const DynamicTutorFCC = dynamic(() =>
    import("./factorComunCompuesto/FactorComunCompuesto").then((mod) => mod.FCC)
  );
  const DynamicTutorDC = dynamic(() =>
    import("./diferenciaCuadrados/DiferenciaCuadrados").then((mod) => mod.DC)
  );
  const DynamicTutorDSC = dynamic(() =>
    import("./diferenciaSumaCubos/DiferenciaSumaCubos").then((mod) => mod.DSC)
  );
  const DynamicTutorTC = dynamic(() =>
    import("./trinomiosCuadraticos/TrinomiosCuadraticos").then((mod) => mod.TC)
  );

  return (
    <>
      {exercise?.contentType == "FC" ? (
        <DynamicTutorFC exercise={exercise} nextRouter="/" />
      ) : exercise?.contentType == "FCC" ? (
        <DynamicTutorFCC exercise={exercise} nextRouter="/" />
      ) : exercise?.contentType == "DC" ? (
        <DynamicTutorDC exercise={exercise} nextRouter="/" />
      ) : exercise?.contentType == "DSC" ? (
        <DynamicTutorDSC exercise={exercise} nextRouter="/" />
      ) : exercise?.contentType == "TC" ? (
        <DynamicTutorTC exercise={exercise} nextRouter="/" />
      ) : (
        <p>
          error en exercise.contentType, exercise.contentType !=
          FC,FCC,DC,DSC,TC{" "}
        </p>
      )}
    </>
  );

  //if TC => <DynamicTutorFacTC exercise={data[0]} nextRouter="/" />
};
