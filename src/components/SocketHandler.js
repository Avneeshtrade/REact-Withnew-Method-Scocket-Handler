import React, {memo, useEffect} from 'react'
import { ChatSocketService } from '../socket';

function SocketEventHandler(props) {
  
    useEffect(() => {

            connectToSocket(props);
    }, []);

    const connectToSocket = (socketParams) => {
        const {endpoint, user, token, callback = undefined, hostToken = undefined, isHost = false} = socketParams;
            const livelyWebSocket = new ChatSocketService(endpoint, user, token, callback, hostToken, isHost)
            livelyWebSocket.connect();
    };

    // //Added a common function to check and return the callback to prevent the error
    // const sendCallback = (callbackName, data, isPauseSound = true) => {
    //     if (props[callbackName]) {
    //         props[callbackName](data, isPauseSound);
    //     }
    // }

    // const onWebSocketEvent = (webSocket, eventName, payload) => {
    //         console.log(">>>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>")
    //         console.log("Event : ", eventName,"\n payload : ",payload);
            
    //         console.log("<<<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<<<")

    //     if (webSocket && webSocket.state === 'disconnected' && webSocket.notMyFault > 0) {
    //         props.setIsTemporaryDisconnect(true);
    //     }
    //     if (eventName === EVENT_CBK_TYPE.DONATION_INVENTORY) {
    //         if (interactionOrTypeOrErrorOrNull.donationInventory && interactionOrTypeOrErrorOrNull.donationInventory.length > 0) {
    //             if(!props.joinFormData?.noDonationsAllowed) {
    //                 interactionOrTypeOrErrorOrNull.donationInventory.splice(0, 0, { type: 'tip', label: 'Send a tip!' });
    //             }

    //             const remainingQuestions = interactionOrTypeOrErrorOrNull.donationInventory.find(count => count.type === 'question');
    //             const remainingRequests = interactionOrTypeOrErrorOrNull.donationInventory.find(count => count.type === 'request');
    //             sendCallback('onDonationInventory', {
    //                 configuration: interactionOrTypeOrErrorOrNull.donationInventory,
    //                 remainingQuestionCount: remainingQuestions,
    //                 remainingRequestCount: remainingRequests
    //             });
    //         }
    //     }
    // };
    return ( <></>)
}
export default memo(SocketEventHandler);
