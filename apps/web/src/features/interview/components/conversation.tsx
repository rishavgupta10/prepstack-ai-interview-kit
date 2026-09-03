import {
    MessageBubble,
} from "./message-bubble";

export function Conversation({
    messages,
}: {
    messages: any[];
}) {

    return (
        <div
            className=" h-[65vh] overflow-scroll max-h-[65vh]
      md:space-y-4 space-y-16
      "
        >

            {messages.map(
                message => (

                    <MessageBubble
                        key={
                            message._id
                        }
                        sender={
                            message.sender
                        }
                        content={
                            message.content
                        }
                    />

                )
            )}

        </div>
    );
}