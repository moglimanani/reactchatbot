import { Fragment } from "react/jsx-runtime"
import styles from '../../styles/chatbubble.module.scss'
import classname from 'classnames'

interface ChatBubbleProps {
    rightBubble?: boolean,
    question?: string
}
const ChatBubble = ({rightBubble, question}: ChatBubbleProps) => {
    const cx = classname({[styles.chatBubbleWrapper]: true}, {[styles.chatBubbleWrapperRight]: rightBubble})
    return (
        <Fragment>
            <div className={cx}>
                {question}
            </div>
        </Fragment>
    )
}
export default ChatBubble;