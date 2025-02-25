import { ReactNode } from "react";

type TitleSpanProps = {
    children: ReactNode;
};

function TitleSpan({ children }: TitleSpanProps) 
{
    return <span className="title-text">{children}</span>;
}
export default TitleSpan;