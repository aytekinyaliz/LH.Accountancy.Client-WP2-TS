import Utilities from './Utilities';

export enum ConfigKeysEnum {
    apiBaseUrl
}
export enum DeploymentTypesEnum {
    test,
    development,
    production
}

class Config {
    private static _config: any = null;
    //private constructor() { }
    
    public static getConfig(name: ConfigKeysEnum): string {
        if (!Config._config) {
            Config.loadConfig();
        }

        return Config._config[Utilities.getEnumString(ConfigKeysEnum, name)]
    }

    private static loadConfig(): void {
        if (process.env.NODE_ENV === Utilities.getEnumString(DeploymentTypesEnum, DeploymentTypesEnum.development) || 
            process.env.NODE_ENV === Utilities.getEnumString(DeploymentTypesEnum, DeploymentTypesEnum.test)) {
            Config._config = {
                'apiBaseUrl': 'http://localhost:4001'
            };
            return;
        }

        Config._config = JSON.parse((<any>process.env).config);
    }
}

Object.seal(Config);
export default Config;

/*
export default class Config {
    private static _instance: Config;
    private config: any = null;

    private constructor() { }

    public static get instance(): Config {
        return this._instance || (this._instance = new this());
    }

    public getConfig(name: ConfigKeysEnum): string {
        if (!this.config) {
            this.loadConfig();
        }

        return this.config[Utilities.getEnumString(ConfigKeysEnum, name)];
    }

    private loadConfig(): void {
        if (process.env.NODE_ENV === Utilities.getEnumString(DeploymentTypesEnum, DeploymentTypesEnum.local) || 
            process.env.NODE_ENV === Utilities.getEnumString(DeploymentTypesEnum, DeploymentTypesEnum.test)) {
            this.config = {
                'apiBaseUrl': 'http://localhost:4001'
            };
            return;
        }

        this.config = {
            'apiBaseUrl': 'http://localhost:4001'
        };
    }
}*/