import { useContext } from "react"
import NotificationContext from "../NotificationContext";

export const useNotification = () => {
    const [notification] = useContext(NotificationContext)
    return notification
}

export const useNotificationDispatch = () => {
    const [, notificationDispatch] = useContext(NotificationContext)
    return notificationDispatch
}
