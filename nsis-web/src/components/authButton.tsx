import { Button } from "./ui/button";

interface AuthenticateButtonProps {
    handleCapture: (img: any) => void;
}

function AuthenticateButton(props: AuthenticateButtonProps) {

  return (
    <Button
        className="flex justify-center items-center w-40 py-7 bg-green-500 m-5"
        onClick={props.handleCapture}
    >
        Authenticate
    </Button>
  );
}

export default AuthenticateButton;