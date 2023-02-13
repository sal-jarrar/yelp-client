import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

interface IMessageProps {
  variant?: string;
  children: ReactNode | string;
}

const Message = ({ variant = "info", children }: IMessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
