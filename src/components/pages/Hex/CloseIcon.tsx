import {Icon} from '@phuocng/react-pdf-viewer';
import React from 'react';

const CloseIcon: React.FC<{}> = () => {
    return (
        <div style={{marginRight: '10px'}}>
            <Icon size={16} >
                <path d="M23.5 0.5L0.5 23.5" />
                <path d="M23.5 23.5L0.5 0.5" />
            </Icon>
        </div>
    );
};

export default CloseIcon;
