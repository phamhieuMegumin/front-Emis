/* eslint-disable */
import { ElNotification } from 'element-plus'

export default function () {
    const successNotify = () => {
        ElNotification({
            title: 'Success',
            message: 'Thêm thành công',
            type: 'success',
            duration: 1000
        });
    };
    const ErrorNotify = () => {
        ElNotification({
            title: 'Error',
            message: 'Có lỗi xảy ra vui lòng thử lại sau',
            type: 'error',
            duration: 3000
        });
    };
    return {
        successNotify,
        ErrorNotify
    }
}