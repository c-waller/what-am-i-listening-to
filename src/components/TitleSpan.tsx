import { ReactNode } from "react";

type TitleSpanProps = {
    children: ReactNode;
};

export default function TitleSpan({ children }: TitleSpanProps) 
{
    return <span className="title-text">{children}</span>;
}