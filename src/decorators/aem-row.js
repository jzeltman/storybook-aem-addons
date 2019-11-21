import React from 'react';

const AEMRow = story => {
    return (
        <div className="root responsivegrid">
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">{story}</div>
        </div>
    );
}
export default AEMRow;