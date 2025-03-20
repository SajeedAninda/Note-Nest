import React from 'react';
import { Toaster } from 'react-hot-toast';

const AllFoldersLayout = ({children}) => {
    return (
        <div>
            <Toaster></Toaster>
            {children}
        </div>
    );
};

export default AllFoldersLayout;