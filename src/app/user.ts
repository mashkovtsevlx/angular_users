export class User {
    id: number;
    first_name: string = '';
    last_name: string = '';
    avatar: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
