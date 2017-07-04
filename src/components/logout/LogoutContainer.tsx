import * as React from 'react';
// import { Redirect } from 'react-router';
import { connect, Dispatch } from 'react-redux';

import { IStoreState, ICurrentUserState } from '../../store/IStoreState';
import * as currentUserActions from '../../actions/currentUserActions';



interface StateProps {
    currentUser: ICurrentUserState;
}
interface DispatchProps {
    logout: () => void;
}
interface OwnProps {
}
type HomeProps = StateProps & DispatchProps;    // & OwnProps;

// interface State {
//     count: number;
//     count2?: number;
// }

class LogoutContainer extends React.Component<HomeProps, {}> {
//     // static propTypes = {
//     //     actions:    PropTypes.object.isRequired,
//     //     currentUser:    PropTypes.object.isRequired
//     // };
//     // static defaultProps = {
//     //     currentUser: null
//     // };

//     constructor(props: PropType) {
//         super(props);
//     }
//     logout = () => {
//         this.props.actions
//             .logout()
//             .then(() => {
//                 //this.setState({shouldRedirect: true});
//                 console.log('loged out'); //eslint-disable-line
//             })
//             .catch((err) => {
//                 console.log(err); //eslint-disable-line
//             });
//     };

    render() {
        return (
            <div>Logout</div>
            // this.props.currentUser
            //     ? <Redirect to={'/login'} />
            //     : <a onClick={this.logout}>Logout</a>
        );
    }
}
const mapStateToProps = (state: IStoreState) => {
    return {
        currentUser: state.currentUserState
    };
};
const mapDispatchToProps = (dispatch: Dispatch<currentUserActions.CurrentUserActionType>) => {
    return {
        logout: () => {}  //dispatch(currentUserActions.logout())
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(LogoutContainer);
