import CallToAction from "./_components/call-to-action"

type Props = {}

const Home: React.FC<Props> = ({}) => {
    return <div className="md:px-10 py-20 flex flex-col gap-36">
        <div className="">
            <CallToAction />
        </div>
    </div>
}

export default Home
