import { Fragment, useEffect, useState } from "react"
import styles from '../styles/chatbot.module.scss'
import data from '../data/index.json'
import ChatBubble from "../components/ChatBubble"
import ChatActivity from "../components/ChatActivity"

interface Options {
    id?: number;
    message?: string;
}

interface Metadata {
    question?: string;
    answer?: string;
    value: string;
    type?: string;
    options: Options[];
}

export const ChatBotPage = () => {
    const [state, setState] = useState<Metadata[]>(data[0].metadata.questions)
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [completedQuestion, setCompletedQuestion] = useState<Metadata[]>([])

    useEffect(() => {

        if (data) {
            setState([...data[0].metadata.questions])
        }
    }, [])

    useEffect(() => {

        if (currentStep === 0) {
            setCompletedQuestion([])
        }
        if (currentStep > 0 && currentStep <= state.length) {
            // const yetToComplete = state.slice(currentStep)
            const completed = state.slice(0, currentStep)
            setCompletedQuestion(completed)
        }
    }, [currentStep])

    const ChatBubbleConstruction = ({ questions, step }: { questions: Metadata[], step: number }) => {
        const Bubbles = () => questions.map((ques) => {
            let quesConstructed
            switch (ques.type) {
                case "radio":
                    quesConstructed = ques.options.find(item => item.id + "" == ques.value)?.message
                    break;
                case "checkbox":
                    if(ques.value.length > 0){
                        const valueArr = ques.value.split("-")
                        const values = valueArr.map(vitem => (
                            ques.options.find(item => item.id + "" == vitem)?.message
                        ))

                        quesConstructed = values.join(', ')
                    } else {
                        quesConstructed = ''
                    }
                    break;
                default:
                    quesConstructed = ques.value
            }
            return (
                <Fragment>
                    <ChatBubble question={ques?.question} />
                    <ChatBubble rightBubble question={quesConstructed} />
                </Fragment>
            )
        })

        return (
            <Fragment>
                <div className={styles.chatMessageInnerWrapper}>
                <label>Hi Sethu, Let's start the chat!</label>
                <Bubbles />
                {step <= state.length - 1 && <ChatBubble question={state![step]?.question} />}
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <div className={styles.chatBotPage}>
                <div className={styles.chatMessageWrapper}>
                    <ChatBubbleConstruction questions={completedQuestion} step={currentStep} />
                </div>
                <div className={styles.chatActionWrapper}>
                    <ChatActivity questionState={state} step={currentStep} updateState={setState} updateStep={setCurrentStep} />
                </div>
            </div>
        </Fragment>
    )
}