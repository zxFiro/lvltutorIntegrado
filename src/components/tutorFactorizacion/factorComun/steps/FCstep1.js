import React, { useRef, useState, useEffect } from "react";
import { MathComponent } from "../../../MathJax";
import { useAction } from "../../../../utils/action";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Wrap,
  WrapItem,
  Center,
  Spacer,
} from "@chakra-ui/react";

import Hint from "../../tools/Hint";

const FCstep1 = ({ step1, setStep1Valid, step1Valid, contentID, topicID }) => {
  const action = useAction(); //send action to central system
  const response = useRef(null); // answer entered by the student
  const [feedbackMsg, setFeedbackMsg] = useState(null); //feedback message
  const [error, setError] = useState(false); //true when the student enters an incorrect answers
  const correctAlternatives = step1.answers.map((element) => element.answer); //list of answers valid
  const [attempts, setAttempts] = useState(0);
  const [hints, setHints] = useState(0); //hint counts

  //function compare when press button "Aceptar"
  const compare = () => {
    //contador de intentos
    setAttempts(attempts + 1);
    //responseStudent equals response with replace "space" and "*" (work string in lower case)
    const responseStudent = response.current.value
      .replace(/[*]| /g, "")
      .toLowerCase();
    //validate is a function that compares each element with response of student
    const validate = (element) => element === responseStudent;

    //if response of student is correct (response == one element of correctAlternatives)
    if (correctAlternatives.some(validate)) {
      setFeedbackMsg(
        <>
          <Alert status="success">
            <AlertIcon />
            {step1.correctMsg}
          </Alert>
        </>
      );
      setStep1Valid((step1Valid = "Terminado"));
      action({
        verbName: "completeContent",
        contentID: contentID,
        topicID: topicID,
      });
    } else {
      /*if response is incorrect*/
      setError(true);
      setFeedbackMsg(
        <Alert status="error">
          <AlertIcon />
          {step1.incorrectMsg}
        </Alert>
      );
    }
  };

  return (
    <>
      <Wrap padding="15px 10px 10px 10px">
        <WrapItem padding="5px 0px 10px 0px">
          <MathComponent
            tex={String.raw`${step1.expression}`}
            display={false}
          />
        </WrapItem>

        <Spacer />

        <WrapItem>
          <Center>
            <label>(</label>
            <Input
              style={{
                textAlign: "center",
                fontStyle: "italic",
                fontWeight: "600",
              }}
              size="sm"
              w={160}
              focusBorderColor="#9DECF9"
              placeholder="Ingrese factor común"
              ref={response}
              isReadOnly={step1Valid != null}
            />
            <label>)</label>

            {step1Valid === null ? (
              <label>&nbsp;(?)</label>
            ) : (
              <>
                <MathComponent
                  tex={String.raw`${step1.displayResult}`}
                  display={false}
                />
              </>
            )}
          </Center>
        </WrapItem>

        <Spacer />

        <WrapItem>
          {step1Valid === null && (
            <>
              <Button
                colorScheme="cyan"
                size="sm"
                variant="outline"
                onClick={() => {
                  compare();
                  action({
                    verbName: "tryStep",
                    stepID: "" + step1.stepId,
                    contentID: contentID,
                    topicID: topicID,
                    result: step1Valid === null ? 0 : 1,
                    kcsIDs: step1.KCs,
                    extra: {
                      response: [response.current.value],
                      attempts: attempts,
                      hints: hints,
                    },
                  });
                }}
              >
                Aceptar
              </Button>
              &nbsp;&nbsp;
              <Hint
                hints={step1.hints}
                contentId={contentID}
                stepId={step1.stepId}
                topicId={topicID}
                matchingError={step1.matchingError}
                response={[response]}
                error={error}
                setError={setError}
                hintCount={hints}
                setHints={setHints}
              ></Hint>
            </>
          )}
        </WrapItem>
      </Wrap>

      {feedbackMsg}
    </>
  );
};
export default FCstep1;
