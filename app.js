let lotion = require('lotion');
let lotionPort = 3000;
function run() {
    let opts = {
        devMode: true,
        lotionPort: lotionPort,
        p2pPort: 46656,
        tendermintPort: 46657,
        initialState: {
            messages: []
        }
    };
    opts.devMode = true;
    let app = lotion(opts)
    let msgHandler = (state, tx) => {
        if (
            typeof tx.sender === 'string' &&
            typeof tx.message === 'string' &&
            tx.message.length <= 50
        ) {
            if (tx.message !== '') {
                state.messages.push({
                    sender: tx.sender,
                    message: tx.message
                });
            }
        }
    }
    app.use(msgHandler);
    app.listen(lotionPort).then(genesis => {
        console.log('connected');
        console.log(genesis);
    }, err => {
        console.log(err);
    })
}
run()
