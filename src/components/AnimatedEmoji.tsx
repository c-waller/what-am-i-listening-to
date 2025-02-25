import { ReactNode } from "react";

type AnimatedEmojiProps = {
    children: ReactNode;
};

function AnimatedEmoji({ children }: AnimatedEmojiProps) 
{
    return <span className="animated-emoji">{children}</span>;
}
export default AnimatedEmoji;