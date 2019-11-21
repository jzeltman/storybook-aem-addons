import React from 'react';

const AEMRow = props => {
    return (
        <div className="root responsivegrid">
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">{props.children}</div>
        </div>
    );
}
export default AEMRow;