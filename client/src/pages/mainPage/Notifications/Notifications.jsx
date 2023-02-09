import React, { useEffect } from "react";

let notification;
function Notifications({ callNotification }) {
    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else {
            Notification.requestPermission();
        }
        if(callNotification) showNotification()
    }, [callNotification])

    const showNotification = () => {
        let options = {
            body: "This is the body of the Notification",
            icon: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
            dir: "ltr"
        };
        notification = new Notification("Notification Demo", options);
        // notification.close()
    }
    return(
        <div/>
    )
}

export default Notifications