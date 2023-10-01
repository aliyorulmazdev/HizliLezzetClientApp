import { Dimmer, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

interface LoadingProps {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent ({inverted = true, content = 'Loading...'}: LoadingProps) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}