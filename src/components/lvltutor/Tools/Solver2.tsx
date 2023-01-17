import { useState,memo, useEffect,useRef} from 'react';

import { Flex, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Heading, Alert,Text,AlertIcon,HStack,VStack} from '@chakra-ui/react'
import { MathComponent } from "../../MathJax";

//la siguiente linea se utiliza para el wraper del componente Mq, el cual usa la libreria JS mathquill
import dynamic from "next/dynamic";

//reporte de acciones
import { useAction } from "../../../utils/action";

import type {ExType,Step} from "./ExcerciseType";

import { useSnapshot } from 'valtio';
import MQProxy from './MQProxy';

const Mq2 = dynamic(
    () => {
        return import("./Mq2");
    },
    { ssr: false }
);

interface value {
    ans:string;att:number;hints:number;lasthint:boolean;fail:boolean;duration:number;
}
interface potato {
    "disabled":boolean;"hidden":boolean;"answer":boolean;"value":value;"open":boolean;
}
class passingPotato {
    private states= {
        "disabled":true,
        "hidden":false,
        "answer":false,
        "value":{ans:"",att:0,hints:0,lasthint:false,fail:false,duration:0},
        "open":false
    }

    public counter=0;

    public getStates()
    {
        return this.states;
    }

    public setStates(a:potato){
        this.states=a;
    }
}
const Steporans = ({step,topicId,content,deefaultIndex,i}:{step:Step,topicId:string,content:string,deefaultIndex:number|undefined,i:number}) => {
    //let a=test[parseInt(step.stepId)!]!.getStates();
    if(false){
        return(
            <VStack alignItems="center" justifyContent="center" margin={"auto"}>
                <MathComponent
                key={"respuesta"+i}
                tex={mqSnap.submitValues.ans}
                display={true}
                />
            </VStack>
            );
    }else{
        if(deefaultIndex!=undefined && deefaultIndex==i){
            return(<Mq2 
                key={"Mq2"+i}
                step={step}
                content={topicId}
                topicId={content}
                disablehint={false}
            />)
        }
    }
    return(<></>);
}


const Solver2 = ({topicId,steps}:{topicId:string,steps:ExType}) => {
    const mqSnap=useSnapshot(MQProxy);

    const action = useAction();
    useEffect(() => {
        MQProxy.startDate=Date.now();
        action({
        verbName: "loadContent",
        contentID: steps?.code,
        topicID: topicId,
        });
    }, []);


    const cantidadDePasos= steps.steps.length;

    let potatoStates = [new passingPotato()];
    potatoStates[0]!.setStates({"disabled":false,"hidden":false,"answer":false,"value":{ans:"",att:0,hints:0,lasthint:false,fail:false,duration:0},"open":true});

    for (let i=0; i< cantidadDePasos;i++) {
        potatoStates.push(new passingPotato());
    }
    
    const [test,setTest] = useState(potatoStates);  
    const [resumen,setResumen]= useState(true);

    useEffect(
       ()=>{ 
        if(mqSnap.submit){
            if(!mqSnap.submitValues.fail){
                let a=test;
                let duration=(MQProxy.endDate-MQProxy.startDate)/1000;
                let sv=MQProxy.submitValues;
                sv.duration=duration;
                MQProxy.startDate=Date.now();
                a[mqSnap.deefaultIndex[0]!-1]!.setStates({"disabled":false,"hidden":false,"answer":true,"value":sv,"open":false});
                if(mqSnap.deefaultIndex[0]!<cantidadDePasos){
                    a[mqSnap.deefaultIndex[0]!]!.setStates({"disabled":false,"hidden":false,"answer":false,"value":{ans:"",att:0,hints:0,lasthint:false,fail:false,duration:0},"open":true});
                } else {
                    let completecontent = [];
                    for(let i=0;i<test.length;i++)completecontent.push(test[i]?.getStates().value);
                    let extra={
                        steps:Object.assign({}, completecontent)
                    }
                    action({
                        verbName: "completeContent",
                        result: 1,
                        contentID: steps?.code,
                        topicID: topicId,
                        extra:extra
                    });
                    setResumen(false)
                }
                setTest(a);
            }
            MQProxy.submit=false;
        }
    },[mqSnap.submit])


    return(
        <Flex alignItems="center" justifyContent="center" margin={"auto"}>
            <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='3xl' alignItems="center" justifyContent="center" margin={"auto"}>
                <Heading as='h1' size='lg' noOfLines={3}>{steps.title}</Heading>
                <Heading as='h5' size='sm' mt={2}>{steps.text}</Heading>
                <MathComponent tex={steps.steps[0]!.expression} display={true} />
                <Accordion
                    onChange={(algo)=>MQProxy.deefaultIndex=(algo as Array<number>)}
                    index={MQProxy.deefaultIndex}
                    allowToggle={true}
                    allowMultiple={true}
                >
                    {steps.steps.map((step,i) => (
                    <AccordionItem
                    key={"AccordionItem"+i} 
                    isDisabled={test[parseInt(step.stepId)]!.getStates().disabled}
                    hidden={test[parseInt(step.stepId)]!.getStates().hidden}
                    >
                        <h2 key={"AIh2"+i}>
                        <Alert key={"AIAlert"+i} status={test[parseInt(step.stepId)]!.getStates().answer ? "success" : "info"}>
                            <AlertIcon key={"AIAlertIcon"+i}  />
                            <AccordionButton 
                                key={"AIAccordionButton"+i}
                                onClick={() => {
                                    let potstates = test;
                                    let potstate = potstates[parseInt(step.stepId)]?.getStates()
                                    if(!potstate?.open){
                                        action({
                                            verbName: "openStep",
                                            stepID: "" + i,
                                            contentID: steps?.code,
                                            topicID: topicId
                                        });
                                        potstate!.open=true;
                                        potstates[parseInt(step.stepId)]?.setStates(potstate!);
                                        setTest(potstates);
                                    }else{
                                        action({
                                            verbName: "closeStep",
                                            stepID: "" + i,
                                            contentID: steps?.code,
                                            topicID: topicId
                                        });
                                        potstate!.open=false;
                                        potstates[parseInt(step.stepId)]?.setStates(potstate!);
                                        setTest(potstates);
                                    };
                                  }}
                            >
                                <Box key={"AIBox"+i}flex='1' textAlign='left'>
                                Paso {step.stepId}: {step.stepTitle}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </Alert>
                        </h2>
                        <AccordionPanel key={"AIAccordionPanel"+i} pb={4}>
                        <Steporans step={step} topicId={topicId} content={steps.code} deefaultIndex={mqSnap.deefaultIndex[0]} i={i}/>
                        <Alert status={mqSnap.alertType} mt={2} hidden={mqSnap.alertHidden}>
                        <AlertIcon />
                                {mqSnap.alertMsg}
                        </Alert>
                        </AccordionPanel>
                    </AccordionItem>
                    ))
                    }
                </Accordion>
                <Box>
                    <Alert status="info" hidden={resumen} alignItems='top'>
                    <AlertIcon />
                        <VStack  w="100%" align="left">
                            <Heading fontSize="xl" align="center">
                                Resumen
                            </Heading>
                            <HStack>
                                <Text >
                                    Expresión:
                                </Text>
                                <MathComponent
                                        tex={steps.steps[0]!.expression}
                                        display={true}
                                />
                            </HStack>
                            {steps.steps.map( (step,i) =>(
                                        <Box key={"ResumenBox"+i}>
                                            <Text key={"ResumenText"+i} w="100%" justifyContent={"space-between"}>{step.summary}</Text>
                                            <MathComponent
                                                key={"ResumenMC"+i}
                                                tex={step.displayResult[0]}
                                                display={true}
                                            />
                                        </Box>
                                    )
                                )
                            }
                        </VStack>
                    </Alert>
                </Box>
            </Flex>
        </Flex>
    )
} 

export default memo(Solver2)