import { Button } from "./ui/button";

interface CancelCaptureProps {
    handleCancel: () => void;
}

function CancelCapture (props: CancelCaptureProps) {
    return (
        <div className="absolute top-3 right-3">
            <Button onClick={props.handleCancel} >Cancel</Button>            
        </div>
    );
}

export default CancelCapture;