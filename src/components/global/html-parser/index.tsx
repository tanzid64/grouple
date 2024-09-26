import { useEffect, useState } from "react";
import parse from "html-react-parser";

type Props = {
    html: string;
};

const HtmlParser: React.FC<Props> = ({ html }) => {
    //* useEffect to avoid hydration error with ssr html data
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true);
        return () => setMounted(true);
    }, []);
    return (
        <div className="[&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_blockqoute]:italic [&_iframe]:aspect-video text-themeTextGray flex flex-col gap-y-3">
            {mounted && parse(html)}
        </div>
    );
};

export default HtmlParser;
