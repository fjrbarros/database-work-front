export const types = {
    MAIS: 'MAIS',
    MENOS: 'MENOS'
};

export function incrementaUm() {
    return { type: types.MAIS };
}

export function decrementaUm() {
    return { type: types.MENOS };
}