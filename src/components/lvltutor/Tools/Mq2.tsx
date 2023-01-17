import {Button, Stack, Box, HStack, VStack} from '@chakra-ui/react';
import {useState,memo, useEffect,useRef} from "react";
import { addStyles, EditableMathField,MathField,StaticMathField } from 'react-mathquill';
import { MathComponent } from "../../../components/MathJax";
import katex from 'katex';
import "katex/dist/katex.min.css";
//se importa el componente hint desarrollado por Miguel Nahuelpan
import Hint from "../Tools/Hint";
import MQPostfixSolver from './MQPostfixSolver';
import MQPostfixparser from './MQPostfixparser';
//reporte de acciones
import { useAction } from "../../../utils/action";

import { useSnapshot } from 'valtio';

import MQProxy from './MQProxy';

import type {Step} from "./ExcerciseType";

addStyles();

const KaTeXComponent = (texExpression:string) => {
    const containerRef = useRef();

    useEffect(() => {
        katex.render(texExpression, containerRef.current);
    }, [texExpression]);

    return <div ref={containerRef} />
}

const MQStatic = ({exp,update}:{exp:string,update:boolean})  => {
    const [texExp,setTexExp] = useState("");
    useEffect(
        ()=>{
            setTimeout(()=>{setTexExp(exp)},10)
    },[exp,update]);

    return <StaticMathField>{texExp}</StaticMathField>
}

const Mq2 =  ({step,content,topicId,disablehint}:
    {step:Step,content:string,topicId:string,disablehint:boolean}) => {

    const mqSnap=useSnapshot(MQProxy) as typeof MQProxy;

    const action = useAction();

    let entero= parseInt(step.stepId);

    //Mq1
    const [latex, setLatex] = useState(" ");

    //inline style aprendido para componentes react en... https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
    const EMFStyle ={
        width: "190px",
        maxHeight: "120px",
        marginBottom: "12px",
        border: "3px solid #73AD21"
    }
    const [placeholder,setPlaceholder] = useState(true);

    const [ta,setTa] = useState<MathField | null>(null);
    
    //hooks de miguel definido para los hints
    const [error, setError] = useState(false); //true when the student enters an incorrect answers
    const [fc,setFC] = useState(true);
    const [attempts,setAttempts]=useState(0);
    const [hints,setHints]=useState(0);
    //const [lastHint,setLastHint]=useState(false);

    const result=useRef(false);
    
    //la siguiente funcion maneja la respuesta ingresada, la respuesta se compara con el valor correspondiente almacenado en el ejercicio.json
    //Ademas, se manejan los componentes de alerta utilizado en el componente padre(solver2) y el componente hijo(Mq2)
    //finalmente, se maneja la activacion del siguiente paso o resumen en caso de que la respuesta ingresada es correcta
    const handleAnswer = () => {
        let exp=step.answers[0]!.answer[0];
        let parse1=MQPostfixparser(exp!);
        let parse2=MQPostfixparser(latex);
        let answer1 = "";
        let answer2 = "";
        if (step.values != undefined) {
            answer1= ""+MQPostfixSolver(parse1.substring(0),step.values);
            answer2= ""+MQPostfixSolver(parse2.substring(0),step.values);
        } else {
            answer1= ""+MQPostfixSolver(parse1.substring(0),[{}]);
            answer2= ""+MQPostfixSolver(parse2.substring(0),step.values);
        }
        let relativeError=Math.abs(1-(parseFloat(answer1)/parseFloat(answer2)));
        console.log(relativeError,parseInt(answer1),parseInt(answer2));
        //la validacion considera una precision con un 0.5% de error relativo
        if(relativeError<0.005) {
            result.current=true;
            MQProxy.endDate=Date.now();
            MQProxy.alertType="success";
            MQProxy.alertMsg="Has ingresado la expresion correctamente!."
            MQProxy.alertHidden=false;
            setFC(true);
            MQProxy.deefaultIndex=[parseInt(step.stepId)+1]
            MQProxy.submitValues={ans:latex,att:attempts,hints:hints,lasthint:false,fail:false,duration:0}
            setError(false);
        } else {
            result.current=false;
            MQProxy.alertType="error";
            MQProxy.alertMsg="La expresion ingresada no es correcta."
            MQProxy.alertHidden=false;
            setError(true);
            MQProxy.submitValues={ans:latex,att:attempts,hints:hints,lasthint:false,fail:true,duration:0}
        }
        action({
            verbName: "tryStep",
            stepID: "" + step.stepId,
            contentID: content,
            topicID: topicId,
            result: result.current? 1 : 0,
            kcsIDs: step.KCs,
            extra: {
              response: [
                latex
              ],
              attempts: attempts,
              hints: hints,
            }
          });
        MQProxy.submit=true;
        setAttempts(attempts+1);
    }


    const refMQElement = (mathquill:MathField) => { 
        if (ta==undefined) {
            setTa(mathquill);
        }
    }

    const MQtools = (operation:string) => {
        if(ta!=undefined)ta.cmd(operation);
    }

    const clear = () =>{
        if(ta!=undefined)setLatex("");
    }

    const enabledhint = () => {
        if(disablehint){
            return (
                <></>
            )
        }else{
            return(
                <Hint
                hints={step.hints}
                contentId={content}
                topicId={topicId}
                stepId={step.stepId}
                matchingError={step.matchingError}
                response={[latex]}
                error={error}
                setError={setError}
                hintCount={hints}
                setHints={setHints}
                ></Hint>
            )
        }
    }
    useEffect(()=>{
        if(fc&&latex!=""&&latex!=" "){
            setFC(false);
        }
    },[latex]);

    return (
        <>
            <VStack alignItems="center" justifyContent="center" margin={"auto"}>
                <Box>
                    <MathComponent tex={step.expression} />
                </Box>
                <MQStatic exp={step.expression} update={mqSnap.submit}/>
                <Box>
                    <Stack spacing={4} direction='row' align='center' pb={4}>
                        {/*importante la distincion de onMouseDown vs onClick, con el evento onMouseDown aun no se pierde el foco del input*/}
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("(")}}>{"\("}</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools(")")}}>{"\)"}</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("^")}}>^</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("\\sqrt")}}>√</Button>
                    </Stack>
                    <Stack spacing={4} direction='row' align='center' pb={4}>
                        {/*importante la distincion de onMouseDown vs onClick, con el evento onMouseDown aun no se pierde el foco del input,
                           Ademas con mousedown se puede usar preventDefault*/}
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("+")}}>+</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("-")}}>-</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("*")}}>*</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("\\frac")}}>/</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();clear()}}>C</Button>
                    </Stack>
                    <HStack spacing='4px' alignItems="center" justifyContent="center" margin={"auto"}>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault(); if(ta!=undefined)ta.keystroke('Left');}} size='xs'>L</Button>
                        <EditableMathField
                            key={"EMF"+entero}
                            latex={latex}
                            style={EMFStyle}
                            onMouseDown={
                                ()=>{
                                    if(placeholder){
                                        setPlaceholder(false);
                                        setLatex("");
                                    }
                                }
                            }
                            onChange={(mathField) => {
                                    //if(placeholder){setLatex("\\text{Ingresa la expresion aqui}")}
                                    setLatex(()=>mathField.latex());
                                    refMQElement(mathField);
                                }
                            }
                        >
                        </EditableMathField>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault(); if(ta!=undefined)ta.keystroke('Right');}} size='xs'>R</Button>
                    </HStack>
                    </Box>
            </VStack>
            <HStack spacing='4px' alignItems="center" justifyContent="center" margin={"auto"}>
                    <Box>
                        <Button
                            colorScheme='teal'
                            height={"32px"}
                            width={"88px"}
                            onClick={
                                ()=>{
                                    handleAnswer();
                                }
                            }
                        >Enviar</Button>
                    </Box>
                    {enabledhint()}
            </HStack>
        </>
    )

}

export default memo(Mq2);