import { Navbar } from "./_components/navbar";

type Props = {
    children: React.ReactNode;
};

const DiscoverLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-black pb-10">
            <Navbar />
            {children}
        </div>
    );
};

export default DiscoverLayout;
