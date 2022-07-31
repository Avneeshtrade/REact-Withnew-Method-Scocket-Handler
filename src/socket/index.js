export class ChatSocketService {
    /**
     *
     * @param {String} endpoint URL of the endpoint to connect to
     * @param {Object} user Provides contact information for this clientUser client
     * @param {String} user.name Name of the clientUser
     * @param {String} user.email Email address of the clientUser
     * @param {String} token the token to be used for authentication
     * @param {function} callback The callback to be called state changes
     * @param {String} hostToken Token to be used for host login, in addition to join token. This is the access token you will receive during login
     *
     * @param isHost
     */
    constructor(
        endpoint, user, token, callback = undefined, hostToken = undefined, isHost = false) {
        this.ws = null
        this.user = user
        this.endpoint = endpoint
        this.token = token
        this.hostToken = hostToken
       // this.state = SOCKET_STATE.DISCONNECTED
        this.callback = callback
        this.isHost = isHost
        this.notMyFault = 0
        this.userInitiated = false
        this.sessionEnded = false
        this.sessionApproved = false
        //this.verify()
    }

    verify() {
        if (!this.user || !this.user.name || !this.user.email) {
            throw Error('User details not provided.')
        }
        if (!this.endpoint) {
            throw Error('Endpoint not defined')
        }
        if (!this.token) {
            throw Error('Token not defined')
        }
        if (this.hostToken) {
            console.debug('Using Host mode')
        }
    }

    /**
     * helper method to generate the websocket endpoint
     * @param {Boolean} secure specifies whether we need to create a secure or insecure backend
     * @param {uri} host fqdn of the host where the server is running
     * @param {String} eventId Identifies an event on the lively platform
     * @param {String} instanceId Identifies the instance of the event on the lively platform
     * @returns {string}
     */
    static endpointForEvent(secure, host, eventId, instanceId) {
        const protocol = secure ? 'wss://' : 'ws://'
        return `${protocol}${host}/ws/events/${eventId}/${instanceId}/control`
    }


    isConnected() {
        return this.ws !== null;
    }

    /**
     * Connect to the backend
     */
    connect() {

        if (this.ws == null) {
            this.sessionEnded = false
            this.userInitiated = false
            try {
                if (typeof window !== 'object') {
                    this.ws = new WebSocket(this.endpoint, {
                        perMessageDeflate: false,
                    })
                    //Setup appropriate listeners for the code
                    this.ws.on('open', () => this.onConnected())
                    // this.ws.on('message', (data) => this.onDataReceived(data))
                    // this.ws.on('close', () => this.onClosed())
                    // this.ws.on('error', () => this.onError())
                    // this.ws.on('ping', () => this.heartbeat());
                } else {
                    this.ws = new WebSocket(this.endpoint)
                    //Setup appropriate listeners for the code
                    this.ws.addEventListener('open', () => this.onConnected())
                    // this.ws.addEventListener('message', (event) => this.onDataReceived(event.data))
                    // this.ws.addEventListener('close', () => this.onClosed())
                    // this.ws.addEventListener('error', () => this.onError())
                    // this.ws.addEventListener('ping', () => this.heartbeat());
                }
            } catch (e) {
                const self = this
                setTimeout(() => {
                    self.onClosed()
                }, 5000)
            }
        }
    }

    /**
     * disconnect from the remote backend
     */
    close(userInitiated = true) {
        this.userInitiated = userInitiated
        if (typeof window !== 'object') {
            this.ws.terminate();
        } else {
            this.ws.close()
        }
    }

    onConnected() {
        this.notMyFault = 0
        const self = this

        console.log("socket connected !!");
       // setTimeout(() => {

           //  self.sendJoinMessage()
            // if (process.env.NODE_ENV === 'development') {
            //     console.log('trying to connect again')
            // }
           // self.state = SOCKET_STATE.AUTHENTICATING
           //
       // }, 2000)
    }

    // tryReconnect() {
    //     this.connect()
    //     if (this.callback) {
    //         this.callback(this, EVENT_CBK_TYPE.RECONNECTING)
    //     }
    // }

    // onError() {
    //     if (this.callback) {
    //         this.callback(this, EVENT_CBK_TYPE.SESSION_FAILURE, this.token)
    //     }
    // }

    // onClosed() {
    //     console.log("error");
    //     if (process.env.NODE_ENV === 'development') {
    //         console.log('socket disconnected')
    //     }
    //     this.state = SOCKET_STATE.DISCONNECTED
    //     const self = this
    //     if (!this.sessionEnded && !this.userInitiated && this.notMyFault < THRESHOLD_RETRY) {
    //         if (reconnectSocketTimeoutId) {
    //             clearTimeout(reconnectSocketTimeoutId);
    //         }
    //         reconnectSocketTimeoutId = setTimeout(() => {
    //             self.notMyFault++
    //             self.tryReconnect();
    //         }, 5000 );
    //     } else {
    //         if(this.notMyFault >= THRESHOLD_RETRY){
    //             this.onError();
    //         }
    //         else if (this.callback) {
    //             this.callback(this, EVENT_CBK_TYPE.SESSION_ENDED, this.token)
    //             this.notMyFault = 0 // server has dropped this call
    //         }
            
    //     }
    // }

    // onDataReceived(data) {
    //     try {
    //         const parsed = JSON.parse(data)
    //         if (typeof window === 'object') {         
    //                 console.log(`New Message received on websocket `);
    //                 console.table(parsed);
    //         }
    //     } catch (e) {
    //         console.table(e)
    //     }
    // }

    // sendProviderReg(provider, configuration) {
    //     if (process.env.NODE_ENV === 'development') {
    //         console.log(`this.state, ${this.state}`)
    //     }
    //     if (this.state === SOCKET_STATE.CONNECTED) {
    //         const payload = {
    //             request: "provide-registration",
    //             provider: provider,
    //             registration: configuration,
    //             user: this.user,
    //         }
    //         this.ws.send(JSON.stringify(payload))
    //     }
    // }

    // send(type, payload) {
    //     if (this.state === SOCKET_STATE.CONNECTED) {
    //         const interaction = {
    //             request: type,
    //             user: this.user.name,
    //             interaction: payload,
    //         }
    //         this.ws.send(JSON.stringify(interaction))
    //     } else {
    //             console.log('message not sent!')
    //     }
    // }

    // sendJoinMessage() {
    //     const msg = {
    //         request: API_TYPE.JOIN,
    //         sessionKey: this.token,
    //         accessToken: this.hostToken,
    //         user: this.user,
    //     }
    //     if (this.ws.readyState > 0) {
    //         this.ws.send(JSON.stringify(msg))
    //     }
    // }

    // setCallbackFunction(callbackValue) {
    //     this.callback = callbackValue
    // }
}
