import { StripeElements } from "@/components/global/stripe/elements";
import PaymentForm from "./payment-form";

type Props = {
    userId: string;
    affiliate: boolean;
    stripeId?: string;
};

const CreateGroup: React.FC<Props> = ({ userId, affiliate, stripeId }) => {
    return (
        <StripeElements>
            <PaymentForm
                userId={userId}
                affiliate={affiliate}
                stripeId={stripeId}
            />
        </StripeElements>
    );
};

export default CreateGroup;
