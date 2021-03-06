const loggerMiddleware = store => next => action => {
    console.log('current state', store.getState());
    console.log('action', action);

    const result = next(action);

    console.log('next state', store.getState());
    console.log('\n');

    return result;
}

export default loggerMiddleware;
