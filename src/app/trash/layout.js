import React from 'react';
import { Toaster } from 'react-hot-toast';

const TrashLayout = ({ children }) => {
    return (
        <div>
            <Toaster></Toaster>
            {children}
        </div>
    );
};

export default TrashLayout;