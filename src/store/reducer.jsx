import { incrementaUm, decrementaUm } from './actions';

export function incrementa1(state = 0, action) {
    switch (action.type) {
        case incrementaUm().type:
            return state + 1;
        case decrementaUm().type:
            return state - 1;
        default:
            return state;
    }
}

export function incrementaParam(state = 0, action) {
    switch (action.type) {
        case "MAISPARAM":
            return state + action.param;
        case "MENOSPARAM":
            return state - action.param;
        default:
            return state;
    }
}