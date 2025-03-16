import {Fragment, useEffect, memo} from "react"
import ChatBubble from "../ChatBubble"
import MessageLoader from "../MesageLoader"
import { ChatBubbleConstrutionProps } from "../../types"
import styles from '../../styles/chatbot.module.scss';

const ChatBubbleConstruction = ({ questions, step, showLoader, setShowLoader, state }: ChatBubbleConstrutionProps) => {
    const Bubbles = () => questions.map((ques, qid) => {
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
            <Fragment key={`bubbles-${qid}`}>
                <ChatBubble question={ques?.question} />
                <ChatBubble rightBubble question={quesConstructed} />
            </Fragment>
        )
    })
    useEffect(()=>{
        ChatAnimate()
    },[step])
    
    const ChatAnimate = () => {
        setShowLoader(true)
        setTimeout(()=>{
            setShowLoader(false)
        }, 1000)
    }

    return (
        <Fragment>
            <div className={styles.chatMessageInnerWrapper}>
            <label>Hi Richard, Let's start the chat!</label>
            <Bubbles />
            {showLoader && <MessageLoader />}
            {!showLoader && step <= state.length - 1 && <ChatBubble question={state![step]?.question} />}
            </div>
        </Fragment>
    )
}

export default memo(ChatBubbleConstruction)