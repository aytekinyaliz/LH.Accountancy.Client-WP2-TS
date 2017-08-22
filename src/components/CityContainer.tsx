import * as React from 'react';
//import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as socketIo from 'socket.io-client';

import { IGlobalState } from '../types/IGlobalState';
import * as cityActions from '../actions/cityActions';
import Config, {ConfigKeysEnum} from '../libs/Config';

import City from '../models/City';

type StateProps = {
    cities: City[];
    name: string;
};
type DispatchProps = {
    logCityName: () => void;
};
type OwnProps = {
    onClick?: (val: String) => void;
};
type Props = StateProps & DispatchProps & OwnProps;

type State = {
    count: number;
    count2?: number;
};


//@connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)
class CityContainer extends React.Component<Props, State> {
    state = {
        count: 33
    };
    private io: SocketIOClient.Socket;

    constructor(props: Props) { 
        super(props);

        //this.io = socketIo(Config.instance.getConfig(ConfigKeysEnum.apiBaseUrl));
        
        setTimeout(() => {
            this.setState({ count: 8888999 });
            setTimeout(() => {
                this.setState({ count: 4400 });
            }, 1000);
        }, 1000);
    }

    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(String(this.state.count));
        } else {
            console.log(`Hello from CityContainer: ${this.state.count}`);   // tslint:disable-line
        }
    }

    connect = () => {
        this.io = socketIo(Config.getConfig(ConfigKeysEnum.apiBaseUrl));

        this.io.on('currency_update_rss', (message: {currency: string, rate: number}) => {
            console.log('currency_update: ', message);  //tslint:disable-line
        });
    }
    send = () => {
        this.io.emit('currency_update_rss', {currency: 'aytekin', content: 'hi'});
    }
    disconnect = () => {
        this.io.disconnect();
    }

    render() {
        console.log('City render');

        return (
            <div className="hello">
                <div className="greeting">
                    {`Total cities for ${this.props.name}: ${this.props.cities.length} [${this.state.count}]`}
                    <button onClick={this.onClick}>Alert</button>
                    <button onClick={this.props.logCityName}>log</button>
                    &nbsp; &nbsp;
                    <button onClick={this.connect}>Connect</button>
                    <button onClick={this.send}>Send</button>
                    <button onClick={this.disconnect}>Disconnect</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IGlobalState) => {
    return {
        cities: state.citiesState,
        name: 'aytek'
    };
};
const mapDispatchToProps = (dispatch: Dispatch<cityActions.CityActionType>) => {
    return {
        logCityName: () => dispatch(cityActions.logCityName())
    };
};

// const mapDispatchToProps = (dispatch: Dispatch<cityActions.CityActionType>) => {
//     return {
//         actions: bindActionCreators(cityActions, dispatch)
//     };
// }



// connect<TStateProps, TDispatchProps, TOwnProps>()
export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(CityContainer);
