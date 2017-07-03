import { connect, Dispatch } from 'react-redux';

import * as actions from '../actions/enthusiasmActions';
import { IStoreState } from '../store/IStoreState';

import {HelloComponent} from './HelloComponent';


export function mapStateToProps(state: IStoreState) {
    return {
        enthusiasmLevel: state.enthusiasmState.enthusiasmLevel,
        name: state.enthusiasmState.languageName,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    };
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HelloComponent);