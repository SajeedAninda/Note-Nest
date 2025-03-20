import React from 'react';
import { Toaster } from 'react-hot-toast';

const FolderDetailsLayout = ({children}) => {
    return (
        <div>
            <Toaster></Toaster>
            {children}
        </div>
    );
};

export default FolderDetailsLayout;