import { message } from "antd";

export const SuccessMessage = (messages) => {
    message.success({
        content: messages,
        duration: 1
    });
}
export const ErrorMessage = (messages) => {
    message.error({
        content: messages,
        duration: 1,
        style: { marginTop: '100px' }
    });
}
export const WarningMessage = (messages) => {
    message.warning({
        content: messages,
        duration: 1
    });
}
