import {readFileSync} from 'fs';
import {resolve} from 'path';

export default class VersionController {

    getVersion = (req: Request) => {
        const {version} = JSON.parse(readFileSync(resolve(__dirname, '../../../package.json')).toString());
        return {version};
    }
}
