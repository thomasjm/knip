export const getValuesByKeyDeep = (obj, key) => {
    const objects = [];
    if (obj && typeof obj === 'object') {
        for (const i in obj) {
            if (obj[i] && typeof obj[i] === 'object') {
                const values = getValuesByKeyDeep(obj[i], key);
                objects.push(...values);
            }
            else if (i === key) {
                objects.push(obj[i]);
            }
        }
    }
    return objects;
};
export const getStringValues = (obj) => {
    let values = [];
    for (const prop in obj) {
        if (obj[prop]) {
            if (typeof obj[prop] === 'string') {
                values.push(obj[prop]);
            }
            else if (typeof obj[prop] === 'object') {
                values = values.concat(getStringValues(obj[prop]));
            }
        }
    }
    return values;
};
export const getKeysByValue = (obj, value) => {
    const keys = [];
    for (const key in obj) {
        if (obj[key] === value)
            keys.push(key);
    }
    return keys;
};
