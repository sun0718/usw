import React, { Component } from 'react'

// export default class UserLayout extends Component {
//     render() {
//         return (
//             <div>
//                 <h1>用户Layout</h1>
//                 {this.props.children}
//             </div>
//         )
//     }
// }

interface UserLayoutProps {
    children: React.ReactNode;
}

const UserLayout: React.FC < UserLayoutProps > = (({ ...props }) => {
    return (
        <div>
            <h1>用户Layout</h1>
            {props.children}
        </div>
    )
})

export default UserLayout;