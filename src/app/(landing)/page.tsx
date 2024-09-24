import CallToAction from "./_components/call-to-action"
import DashboardSnippet from "./_components/dashboard-snippet"

type Props = {}

const Home: React.FC<Props> = ({}) => {
    return (
        <div className="md:px-10 py-20 flex flex-col gap-36">
            <div className="">
                <CallToAction />
                <DashboardSnippet />
            </div>
        </div>
    )
}

export default Home
